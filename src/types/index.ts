export interface Book {
  id: string;
  order: number;
  slug: string;
  titleTa: string;
  titleEn?: string;
  categoryId: string;
  categoryTa: string;
  descriptionTa?: string;
  coverImageUrl?: string;
  pdfUrl: string;
  publicationYear?: number;
  publisher?: string;
  pageCount?: number;
  isFeatured?: boolean;
  fileSizeMb?: number;
}

export interface Category {
  id: string;
  slug: string;
  nameTa: string;
  nameEn: string;
  descriptionTa?: string;
  bookCount: number;
}

export interface AudioResource {
  id: string;
  titleTa: string;
  titleEn?: string;
  speakersTa: string[];
  descriptionTa: string;
  audioUrl: string;
  durationMinutes: number;
  broadcastHistoryTa?: string;
}

export interface GalleryImage {
  id: string;
  slug: string;
  imageUrl: string;
  captionTa: string;
  categoryTa: string;
  year?: string;
}

export interface RemembranceItem {
  id: string;
  titleTa: string;
  descriptionTa?: string;
  imageUrl: string;
  categoryTa: string;
  year?: string;
}

export interface Article {
  id: string;
  slug: string;
  titleTa: string;
  authorTa: string;
  authorTitleTa?: string;
  contentMarkdown: string;
  publishedDate?: string;
}

export type ReadingMode = 'standard' | 'flipbook';
