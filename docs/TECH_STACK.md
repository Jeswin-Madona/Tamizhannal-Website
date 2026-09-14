# Technology Stack & Evaluation — Thamizhannal.org

## Overview
Every major technology decision in this project is selected based on explicit architectural requirements: performance, Tamil typography rendering, archival durability, and mobile readability.

---

## 1. Core Stack Selection

| Technology | Purpose | Chosen Solution | Why Selected? | Alternatives Evaluated |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Application Shell & SSG | **Next.js 15+ (App Router)** | Excellent Static Site Generation (SSG), instant route transitions, zero client JS for static pages, built-in image optimization. | Vite + React (Lacks native SSG/SEO), Remix (Requires active server runtime). |
| **Language** | Type Safety & Models | **TypeScript 5.x** | Strict typing for content models (86 books, gallery items, audio) prevents runtime null pointer crashes. | Vanilla JS (Prone to missing asset properties). |
| **Styling** | UI Design System | **Vanilla CSS + Tailwind CSS v3/v4** | Tailwind provides utility layout structure; Vanilla CSS variables provide fine-grained control over Tamil line heights & archival color tokens. | Styled Components (Adds JS runtime bundle overhead). |
| **PDF Engine** | In-App Book Rendering | **PDF.js (`pdfjs-dist`) + Canvas Virtualization** | Industry-standard open-source PDF rendering engine. Allows page virtualization and custom canvas overlays without native browser PDF plugin dependency. | Browser Embed `<iframe>` (Fails on iOS Safari), PDFObject (Requires native plugin). |
| **Flipbook Library**| 3D Book Page Flip | **`StPageFlip` (`page-flip`)** | Lightweight HTML5 Canvas/WebGL page flip library. Smooth touch-swipe page flipping for mobile and desktop. | Turn.js (Deprecated jQuery dependency), FlipPDF commercial (High license cost). |
| **Search Engine** | Instant Content Search | **FlexSearch / Fuse.js** | Instant, zero-latency client-side fuzzy search across 86 book titles, authors, categories, and gallery captions (bundle size < 10KB). | Algolia (Unnecessary external subscription), Elastic (Over-engineered). |
| **Object Storage** | PDF & Media Hosting | **Cloudflare R2** | Zero egress bandwidth fees, S3 API compatible, ultra-fast global CDN delivery for 87 large PDF files and 10-hour audio. | AWS S3 (High egress data transfer charges), Supabase Storage (1GB free tier limit). |

---

## 2. Technical Justification Details

### 2.1 Why Next.js App Router for a Digital Archive?
1. **Pre-rendered HTML (SSG)**: All 86 book pages are pre-compiled into static HTML at build time. Search engines and scholars receive instant page loads without waiting for JavaScript execution.
2. **Dynamic Route Generation**: `generateStaticParams()` dynamically builds all 86 book detail pages (`/books/[slug]`) during build.

### 2.2 Why Cloudflare R2 for Storage?
1. **Egress Fee Elimination**: Dr. Thamizhannal's PDF archive contains 87 books totaling hundreds of megabytes. AWS S3 charges ~$0.09 per GB downloaded. Cloudflare R2 has **$0 egress fees**, making it financially sustainable for a non-profit cultural foundation.
