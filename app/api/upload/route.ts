import { v2 as cloudinary } from 'cloudinary';
import { getSessionToken } from '@/lib/auth';
import { getUserBySessionToken } from '@/database/users';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadResponseBody = { url: string } | { error: string; details?: string };

export async function POST(
  request: Request,
): Promise<NextResponse<UploadResponseBody>> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await getUserBySessionToken(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json(
      { error: 'File must be an image' },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File must be less than 5MB' },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'rsvpin/events',
              transformation: [
                { width: 1200, height: 600, crop: 'fill', gravity: 'auto' },
              ],
            },
            (error, uploadResult) => {
              if (error || !uploadResult) {
                reject(error ?? new Error('Upload failed'));
              } else {
                resolve(uploadResult);
              }
            },
          )
          .end(buffer);
      },
    );

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
