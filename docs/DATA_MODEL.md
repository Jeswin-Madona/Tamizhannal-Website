# Data Model & Content Schemas — Thamizhannal.org

## Overview
To separate content from UI code, the application uses a structured TypeScript data model. All content entities (books, categories, audio, gallery, articles) are typed, validateable, and decoupled from Next.js presentation components.

---

## 1. Core Data Entities

### 1.1 Book Entity (`Book`)
Represents an individual publication by Dr. Thamizhannal.

```typescript
export interface Book {
  id: string;                      // Unique ID (e.g. "book-001")
  slug: string;                    // URL slug (e.g. "thalaattu")
  titleTa: string;                 // Title in Tamil (e.g. "தாலாட்டு")
  titleEn?: string;                // Title in English/Transliteration
  categoryId: string;              // Foreign key to Category.id (e.g. "cat-literature")
  categoryTa: string;              // Human readable Tamil category name
  descriptionTa?: string;          // Brief summary/blurb in Tamil
  coverImageUrl: string;           // R2 URL for book cover image
  pdfUrl: string;                  // R2 URL for full PDF file
  publicationYear?: number;        // Year of publication
  publisher?: string;              // Publisher name (e.g. "செல்வி பதிப்பகம்")
  pageCount?: number;              // Total page count
  isFeatured?: boolean;            // Homepage highlight flag
  fileSizeMb?: number;             // PDF file size in MB
}
```

---

### 1.2 Category Entity (`Category`)
Represents a literary subject category.

```typescript
export interface Category {
  id: string;                      // Category ID (e.g. "cat-tolkappiyam")
  slug: string;                    // Category slug (e.g. "tolkappiyam")
  nameTa: string;                  // Category name in Tamil (e.g. "தொல்காப்பியம்")
  nameEn: string;                  // Category name in English (e.g. "Tolkappiyam")
  descriptionTa?: string;          // Description of category focus
  bookCount: number;               // Total books in this category
}
```

---

### 1.3 Gallery Image Entity (`GalleryImage`)
Represents a historical photograph in the life journey gallery.

```typescript
export interface GalleryImage {
  id: string;                      // Image ID (e.g. "gal-01")
  slug: string;                    // Image slug or filename
  imageUrl: string;                // R2 URL for high-res photo
  thumbnailUrl?: string;           // R2 URL for compressed thumbnail
  captionTa: string;               // Historical caption in Tamil
  categoryTa: string;              // Category (e.g. "மணி விழா", "விருதுகள்")
  year?: string;                   // Year photo was taken
  peopleFeatured?: string[];       // Names of dignitaries in photo
}
```

---

### 1.4 Audio Resource Entity (`AudioResource`)
Represents audio lecture files.

```typescript
export interface AudioResource {
  id: string;                      // Audio ID
  titleTa: string;                 // "பழகு தமிழ் அறிவோம்"
  speakersTa: string[];            // ["முனைவர் தமிழண்ணல்", "முனைவர் சுந்தர ஆவுடையப்பன்"]
  descriptionTa: string;           // Description of AIR Madurai radio series
  audioUrl: string;                // R2 URL for MP3 file
  durationMinutes: number;         // 600 minutes (10 hours)
  sampleTopicsTa: string[];        // Examples ("திருவளர் செல்வன்", "தொலைபேசி")
}
```

---

### 1.5 Essay / Article Entity (`Article`)
Represents long-form articles and tributes.

```typescript
export interface Article {
  id: string;                      // Article ID
  slug: string;                    // Article URL slug
  titleTa: string;                 // Article title in Tamil
  authorTa: string;                // Author name (e.g. "முனைவர் மு.பழனியப்பன்")
  authorTitleTa: string;           // Author position
  contentMarkdown: string;         // Full markdown text content
  publishedDate: string;           // Date string
}
```

---

## 2. Storage & Distribution Strategy
- **Static Fixtures (Phase 1 / SSG)**: Pre-compiled TypeScript JSON datasets located in `src/data/` (`books.json`, `categories.json`, `gallery.json`, `audio.json`).
- **Object Storage (Cloudflare R2)**: Large binary media assets (PDFs, images, MP3s) served directly via Cloudflare R2 bucket (`https://pub-0ce93fbfa7e8471cb6002dfda2c42a59.r2.dev/`).
- **Database Readiness (Supabase / Postgres)**: The data model schema matches 1-to-1 with PostgreSQL relational tables, allowing seamless future migration to Supabase without code refactoring.
