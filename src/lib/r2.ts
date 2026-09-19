import { S3Client } from "@aws-sdk/client-s3";
import { requireEnv } from "./env";

const accountId = requireEnv("R2_ACCOUNT_ID");

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
  },
});

export const R2_BUCKET = requireEnv("R2_BUCKET_NAME");
