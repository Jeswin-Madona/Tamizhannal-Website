# SEO Strategy & Meta Architecture — Thamizhannal.org

## Overview
Search Engine Optimization (SEO) ensures that search queries for Tamil literature, Dr. Thamizhannal, Tolkappiyam commentaries, and Tamil research easily index the new Next.js website.

---

## 1. Meta Strategy & Metadata Matrix

| Page Type | Dynamic Title Pattern | Description Strategy | Open Graph Image |
| :--- | :--- | :--- | :--- |
| **Homepage (`/`)** | `முகப்பு \| தமிழண்ணல் - Thamizhannal Digital Archive` | Comprehensive description of Thamizhannal's books, biography, audio, and research. | Default Archival OG Banner |
| **Biography (`/about`)** | `தமிழ்வாழ்வு - His Life \| தமிழண்ணல்` | Detailed life milestones of Dr. Thamizhannal (1928–2015). | Biography Portrait |
| **Books Catalog (`/books`)** | `நூல்கள் - Books Archive \| தமிழண்ணல்` | Complete collection of 86 Tamil books by Dr. Thamizhannal. | Books Collage OG Image |
| **Book Detail (`/books/[slug]`)**| `{TitleTa} - {TitleEn} \| நூல்கள் \| தமிழண்ணல்` | Detailed summary, publication info, category tag, and PDF download link. | Specific Book Cover Image |
| **Gallery (`/gallery`)** | `வாழ்க்கைப் பயணம் - Life in Pictures \| தமிழண்ணல்` | Historical photo gallery spanning 11 categories. | Representative Photo |

---

## 2. Structured Data (JSON-LD Schemas)

### 2.1 Person Schema (Dr. Thamizhannal)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Thamizhannal",
  "alternateName": ["இராம. பெரியகருப்பன்", "Rama. Periyakaruppan", "தமிழண்ணல்"],
  "birthDate": "1928-08-12",
  "deathDate": "2015-12-29",
  "jobTitle": "Professor & Head of Tamil Department, Madurai Kamaraj University",
  "sameAs": ["https://www.facebook.com/தமிழண்ணல்-1268233926536749/"]
}
```

### 2.2 Book Schema (Per Book Route)
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "தாலாட்டு",
  "author": {
    "@type": "Person",
    "name": "தமிழண்ணல்"
  },
  "inLanguage": "ta",
  "bookFormat": "https://schema.org/EBook",
  "url": "https://www.thamizhannal.org/books/thalaattu"
}
```

---

## 3. Crawlability Infrastructure
- **Dynamic `sitemap.xml`**: Auto-generates index entries for all 6 top-level pages and all 86 book routes.
- **Configured `robots.txt`**: Directs crawlers to the sitemap while excluding search results page `/search`.
- **Canonical URLs**: Every book route declares `canonical: https://www.thamizhannal.org/books/[slug]`.
