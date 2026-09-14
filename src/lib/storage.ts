export const SUPABASE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mprurexzonwfqlsarned.supabase.co';

export const BUCKETS = {
  BOOKS: 'Books',
  GALLERY: 'Gallery',
  AUDIO: 'Audio',
  REMEMBRANCE: 'Remembrance',
} as const;

/**
 * Constructs a browser-accessible public URL for an asset stored in Supabase Storage.
 * @param bucket Storage bucket name (e.g., 'Books', 'Gallery', 'Audio', 'Remembrance')
 * @param path File path inside the bucket (e.g., 'pdf/parisil-vaazkai.pdf' or 'Images/Coverpage/parisil.jpg')
 */
export function getStoragePublicUrl(bucket: string, path: string): string {
  if (!path) return '';
  // If path is already a full http(s) URL or local API path, sanitize or return appropriately
  if (path.startsWith('http://') || path.startsWith('https://')) {
    // If it's a Cloudflare R2 dummy URL, convert it to Supabase Storage structure
    if (path.includes('r2.dev')) {
      const pathPart = path.split('.r2.dev/')[1] || '';
      return `${SUPABASE_BASE_URL}/storage/v1/object/public/${bucket}/${pathPart}`;
    }
    return path;
  }

  // If path starts with local API route e.g. /api/media/...
  if (path.startsWith('/api/media/')) {
    return path;
  }

  // Trim leading slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Encode URI component safely while retaining slashes
  const encodedSegments = cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  
  return `${SUPABASE_BASE_URL}/storage/v1/object/public/${bucket}/${encodedSegments}`;
}

/**
 * Checks if a given media URL is valid and non-empty
 */
export function isMediaAvailable(url?: string): boolean {
  if (!url) return false;
  if (url.trim() === '') return false;
  return true;
}
