import { NextResponse } from "next/server";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET } from "@/lib/r2";
import { createClient } from "@/utils/supabase/server";

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
  if (typeof orderId !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("upload-complete: order lookup failed", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const key = `orders/${order.id}`;

  try {
    await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
  } catch (err) {
    const status = (err as { $metadata?: { httpStatusCode?: number } })
      .$metadata?.httpStatusCode;
    if (status === 404) {
      return NextResponse.json({ error: "File not uploaded" }, { status: 409 });
    }
    console.error("upload-complete: R2 head failed", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({ document: key })
    .eq("id", order.id);

  if (updateError) {
    console.error("upload-complete: update failed", updateError);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ key });
}
