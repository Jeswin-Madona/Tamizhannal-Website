import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path || [];
    
    // Join path relative to books directory
    let relativePath = pathSegments.map(segment => decodeURIComponent(segment)).join('/');
    
    // Alias slug filenames to actual Tamil filenames if present locally
    const filenameAliases: Record<string, string> = {
      'parisil-vaazkai.pdf': 'பரிசில் வாழ்க்கை.pdf',
      'inikkum-ilakkiyam.pdf': 'இனிக்கும் இலக்கியம்.pdf',
      'aganaanoottuk-kaatchigal.pdf': 'அகநானூற்றுக் காட்சிகள்.pdf',
      'ilakkiyathil-inba-suvai.pdf': 'இலக்கியத்தில் இன்பச் சுவை.pdf',
      'ulaga-tamililakkiya-varalaru.pdf': 'உலகத் தமிழிலக்கிய வரலாறு.pdf',
      'puthiya-nookkil-thiruvasagam.pdf': 'புதிய நோக்கில் திருவாசகம்.pdf',
      'puranaanoottuk-kurumpadangal.pdf': 'புறநாநூற்றுக் குறும்படங்கள்.pdf',
      'perungkadhai-arimugam.pdf': 'பெருங்கதை அறிமுகம்.pdf',
      'mudiyarasan-kavithaigal.pdf': 'முடியரசன் கவிதைகள்.pdf',
    };

    const baseName = pathSegments[pathSegments.length - 1] ? decodeURIComponent(pathSegments[pathSegments.length - 1]) : '';
    let targetFileName = baseName;
    if (filenameAliases[baseName]) {
      targetFileName = filenameAliases[baseName];
    }

    const rootDir = process.cwd();
    let filePath = path.join(rootDir, 'books', relativePath);

    // Fallbacks if not found directly
    if (!fs.existsSync(filePath)) {
      const category1Path = path.join(rootDir, 'books', 'category1', targetFileName);
      const directPath = path.join(rootDir, 'books', targetFileName);
      if (fs.existsSync(directPath)) {
        filePath = directPath;
      } else if (fs.existsSync(category1Path)) {
        filePath = category1Path;
      }
    }

    // Prevent path traversal
    if (!filePath.startsWith(path.join(rootDir, 'books'))) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse(`File not found: ${relativePath}`, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    // Basic content-type detection
    let contentType = 'application/octet-stream';
    if (filePath.endsWith('.pdf')) {
      contentType = 'application/pdf';
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (filePath.endsWith('.png')) {
      contentType = 'image/png';
    }

    // Convert node stream to web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(readable, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal error';
    return new NextResponse(`Error serving media: ${errorMessage}`, { status: 500 });
  }
}
