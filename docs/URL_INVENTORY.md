# URL Inventory & Preservation Plan — Thamizhannal.org

## Overview
Preserving existing URLs is critical to ensure zero loss of search engine indexation, backlinks, and user bookmarks during the migration to the redesigned Next.js application.

---

## 1. Top-Level Core Routes

| Existing Old URL | Redesigned New URL | Action / Strategy | Rationale |
| :--- | :--- | :--- | :--- |
| `https://www.thamizhannal.org/` | `/` | **Preserve 1:1** | Core homepage entry |
| `https://www.thamizhannal.org/about` | `/about` | **Preserve 1:1** | Biography & life trajectory |
| `https://www.thamizhannal.org/books` | `/books` | **Preserve 1:1** | Books catalog & archive |
| `https://www.thamizhannal.org/gallery` | `/gallery` | **Preserve 1:1** | Photo journey gallery |
| `https://www.thamizhannal.org/remembrance` | `/remembrance` | **Preserve 1:1** | Tribute & memorial page |
| `https://www.thamizhannal.org/contact` | `/contact` | **Preserve 1:1** | Contact form & details |

---

## 2. Book Detail Routes (86 Verified Slugs)

All 86 existing book slugs will be preserved exactly 1-to-1 under `/books/[slug]`.

### Representative Sample Mapping:

| Old URL Pattern | Preserved New URL Pattern | Status |
| :--- | :--- | :--- |
| `/books/thalaattu` | `/books/thalaattu` | Preserved |
| `/books/nannool-ezhutthadhigaram` | `/books/nannool-ezhutthadhigaram` | Preserved |
| `/books/tholkappiyam-porulathigaram-1` | `/books/tholkappiyam-porulathigaram-1` | Preserved |
| `/books/sangam-ilakkiya-oppeedu` | `/books/sangam-ilakkiya-oppeedu` | Preserved |
| `/books/thirukkural-nunnurai` | `/books/thirukkural-nunnurai` | Preserved |
| `/books/ungal-thamizhai-therinthukolungal` | `/books/ungal-thamizhai-therinthukolungal` | Preserved |
| `/books/nagasamy-pazhuthadaindha-kannaadi` | `/books/nagasamy-pazhuthadaindha-kannaadi` | Preserved |
| `/books/parisil-vaazhkkai` | `/books/parisil-vaazhkkai` | Preserved |

---

## 3. New Enhanced Feature Routes

To support full-featured PDF reading, flipbook rendering, and universal search, the following new canonical sub-routes will be introduced:

| New Route | Feature / Purpose | SEO Meta Strategy |
| :--- | :--- | :--- |
| `/books/[slug]/read` | Dedicated, full-screen PDF Reader | `noindex, follow` (canonical points to `/books/[slug]`) |
| `/books/[slug]/flipbook` | Interactive 3D Flipbook Reader | `noindex, follow` (canonical points to `/books/[slug]`) |
| `/search` | Global instant search page | Search results page (`noindex`) |
| `/sitemap.xml` | Dynamic XML sitemap generator | Indexable |
| `/robots.txt` | Crawler policy configuration | Indexable |

---

## 4. Redirect & Asset Handling Rules
- **Category Anchors**: Old category links like `/books#cat-%E0%AE%87%E0%AE%B2%E0%AE%95%E0%AF%8D%E0%AE%95%E0%AE%BF%E0%AE%AF%E0%AE%AE%E0%AF%8D` will be parsed client-side and mapped to state filters or URL search parameters `/books?category=literature`.
- **Media Asset Proxy**: Cloudflare R2 direct file URLs (`https://pub-0ce93fbfa7e8471cb6002dfda2c42a59.r2.dev/...`) will be proxied through `/api/media/...` or custom domain CNAME for seamless CDN caching and security.
