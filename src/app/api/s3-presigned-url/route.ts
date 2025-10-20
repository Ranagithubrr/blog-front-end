import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function GET(req: NextRequest) {
    const fileName = req.nextUrl.searchParams.get("fileName");
    const fileType = req.nextUrl.searchParams.get("fileType") || "image/jpeg";

    if (!fileName) {
        return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }

    try {
        const key = `posts/${Date.now()}-${fileName}`; // unique file path
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 minutes

        return NextResponse.json({ url, key });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to generate presigned URL" }, { status: 500 });
    }
}
