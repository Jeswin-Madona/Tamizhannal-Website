# Performance Optimization Strategy — Thamizhannal.org

## Overview
Performance is a core usability requirement for a literary archive. Mobile readers in Tamil Nadu and across the global Tamil diaspora may access the archive on mobile networks.

---

## 1. Key Performance Metrics & Targets

| Metric | Target | Optimization Technique |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | `< 1.2 seconds` | SSG static HTML pre-rendering, inline critical CSS |
| **Largest Contentful Paint (LCP)** | `< 2.0 seconds` | Next.js Image optimization (`WebP`/`AVIF`), font preloading |
| **Cumulative Layout Shift (CLS)** | `0.00` | Fixed aspect ratios on book covers & photo gallery grids |
| **Time to Interactive (TTI)** | `< 1.5 seconds` | Dynamic imports for heavy libraries (`pdfjs-dist`, `StPageFlip`) |

---

## 2. Resource-Specific Optimization Strategies

### 2.1 PDF Performance
- **Lazy Load PDF Engine**: Load `pdfjs-dist` JS scripts only when the user opens the reader/flipbook modal.
- **Range Requests**: Configure Cloudflare R2 byte-range requests (`Range: bytes=0-1024`) to fetch PDF page tables without downloading the entire 50MB PDF file.

### 2.2 Image Optimization
- **Next.js `<Image />` Component**: Automatically convert Cloudflare R2 JPG images to modern `WebP`/`AVIF` formats.
- **Blur-up Placeholders**: Display low-resolution inline SVG placeholder while book cover images load.

### 2.3 Audio Streaming Performance
- **HTTP Range Requests**: Enable range requests on Cloudflare R2 for `pazhagu-thamizh-arivom.mp3` so users can seek anywhere in the 10-hour audio without downloading the entire file upfront.

### 2.4 Font Loading & Subsetting
- **`next/font` Optimization**: Preload Noto Serif Tamil and Noto Sans Tamil fonts with `display: swap` to eliminate FOUT (Flash of Unstyled Text).
