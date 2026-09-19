import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";
import { createClient } from "@/utils/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId, contentType } = await req.json();
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // TODO: is this check enough?

  const key = `orders/${orderId}/${crypto.randomUUID()}`;
  const url = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 } // seconds
  );

  return NextResponse.json({ url, key });
}
