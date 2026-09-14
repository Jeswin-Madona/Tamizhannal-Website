# System Architecture & Code Structure — Thamizhannal.org

## Overview
This document defines the high-level system architecture, application layer separation, directory layout, and component boundaries for the redesigned Next.js application.

---

## 1. High-Level System Architecture Diagram

```mermaid
graph TD
    Client[User Browser / Mobile Device] --> NextJS[Next.js 15+ App Router]
    
    subgraph "Application Shell"
        NextJS --> StaticPages[SSG Pages: /, /about, /books, /gallery, /remembrance, /contact]
        NextJS --> BookPages[Dynamic SSG Book Routes: /books/[slug]]
        NextJS --> SearchModule[Client Search Engine: FlexSearch]
        NextJS --> ReaderModule[PDF Reader & 3D Flipbook Module]
    end
    
    subgraph "Data & Asset Tier"
        StaticPages --> JSONData[Static JSON Datasets: src/data/*.json]
        BookPages --> JSONData
        ReaderModule --> R2Storage[Cloudflare R2 Object Storage]
        R2Storage --> PDFs[87 Book PDF Files]
        R2Storage --> Images[Gallery & Book Cover Images]
        R2Storage --> Audio[10-Hour MP3 Audio File]
    end
```

---

## 2. Directory Layout & Folder Blueprint

```
tamizhannal-website/
├── docs/                             # Architecture & Research Specifications
│   ├── WEBSITE_AUDIT.md
│   ├── CONTENT_INVENTORY.md
│   ├── URL_INVENTORY.md
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── TECH_STACK.md
│   ├── DESIGN_SYSTEM.md
│   ├── MIGRATION_STRATEGY.md
│   ├── PDF_FLIPBOOK_STRATEGY.md
│   ├── SEARCH_STRATEGY.md
│   ├── PERFORMANCE_STRATEGY.md
│   ├── ACCESSIBILITY_STRATEGY.md
│   ├── SEO_STRATEGY.md
│   ├── ARCHITECTURE.md
│   └── OPEN_QUESTIONS.md
│
├── public/                           # Static Public Assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── app/                          # Next.js App Router Routes
    │   ├── layout.tsx                # Root layout with Noto fonts & nav
    │   ├── page.tsx                  # Homepage (முகப்பு)
    │   ├── about/                    # Biography (/about)
    │   │   └── page.tsx
    │   ├── books/                    # Books Archive (/books)
    │   │   ├── page.tsx
    │   │   └── [slug]/               # Book Detail (/books/[slug])
    │   │       ├── page.tsx
    │   │       ├── read/             # PDF Reader (/books/[slug]/read)
    │   │       │   └── page.tsx
    │   │       └── flipbook/         # 3D Flipbook (/books/[slug]/flipbook)
    │   │           └── page.tsx
    │   ├── gallery/                  # Photo Gallery (/gallery)
    │   │   └── page.tsx
    │   ├── remembrance/              # Tribute Page (/remembrance)
    │   │   └── page.tsx
    │   ├── contact/                  # Contact Page (/contact)
    │   │   └── page.tsx
    │   └── search/                   # Universal Search (/search)
    │       └── page.tsx
    │
    ├── components/                   # Reusable UI Components
    │   ├── layout/                   # Header, Footer, Drawer
    │   ├── books/                    # BookCard, CategoryFilter, Reader, Flipbook
    │   ├── gallery/                  # GalleryGrid, LightboxModal
    │   ├── audio/                    # AudioPlayer, ChapterList
    │   ├── search/                   # SearchModal, SearchResults
    │   └── ui/                       # Buttons, Badges, Modals, Spinners
    │
    ├── data/                         # Verified Fixtures & Extracted Models
    │   ├── books.json                # 86 verified book entities
    │   ├── categories.json           # 11 category mappings
    │   ├── gallery.json              # 53 gallery photo items
    │   ├── remembrance.json          # 12 remembrance images
    │   └── audio.json                # Audio lecture metadata
    │
    ├── types/                        # TypeScript Interface Definitions
    │   └── index.ts                  # Book, Category, GalleryImage, etc.
    │
    └── styles/                       # CSS Stylesheet
        └── globals.css               # Design system tokens & Tamil font styles
```

---

## 3. Server vs. Client Component Boundaries
- **Server Components (Default)**: All pages (`page.tsx`), static metadata generation, layout rendering, and static HTML generation.
- **Client Components (`'use client'`)**: Interactive components only:
  - `BookReader` & `FlipbookViewer` (Canvas/PDF.js rendering)
  - `AudioPlayer` (HTML5 Audio playback)
  - `SearchModal` (FlexSearch query evaluation)
  - `CategoryFilter` (Category state switching)
