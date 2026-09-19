import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, R2_BUCKET } from "@/lib/r2";
import { createClient } from "@/utils/supabase/server";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const orderId = body?.orderId;
  const contentType = body?.contentType;

  if (typeof orderId !== "string" || !ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("upload-url: order lookup failed", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const key = `orders/${order.id}`;

  const url = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 },
  );

  return NextResponse.json({ url, key });
}
