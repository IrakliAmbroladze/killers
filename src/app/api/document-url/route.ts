import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, R2_BUCKET } from "@/lib/r2";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderId = new URL(req.url).searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("document")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("document-url: order lookup failed", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
  // only R2 keys are signed; legacy Drive links never reach this route
  if (!order?.document?.startsWith("orders/")) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const url = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: order.document,
      ResponseContentDisposition: "inline", // preview in the tab; "attachment" forces download
    }),
    { expiresIn: 60 },
  );

  return NextResponse.json({ url });
}
