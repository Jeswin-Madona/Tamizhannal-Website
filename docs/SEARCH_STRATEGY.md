# Search Strategy — Thamizhannal.org

## Overview
A digital literary archive requiring discovery across 86 books, gallery photos, and audio files requires a fast, accurate search engine.

---

## 1. Search Scope & Indexable Content

| Search Category | Indexable Fields | Example Queries |
| :--- | :--- | :--- |
| **Books Archive** | Book Title (Tamil & Transliterated), Category Name, Description, Publication Year, Publisher | `தொல்காப்பியம்`, `Tolkappiyam`, `தாலாட்டு`, `அகநானூறு` |
| **Photo Gallery** | Photo Caption (Tamil), Event Category, Dignitary Names featured | `அப்துல் கலாம்`, `மணி விழா`, `சப்பான்`, `விருது` |
| **Audio Resources** | Audio Title, Speakers, Topic List | `பழகு தமிழ்`, `சுந்தர ஆவுடையப்பன்`, `தினமணி` |
| **Essays & Life** | Essay Title, Biography Section Titles, Keywords | `பழனியப்பன்`, `நெற்குப்பை`, `தியாகராசர் கல்லூரி` |

---

## 2. Technical Search Engine Evaluation

| Strategy | Performance | Complexity | Cost | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Client-Side Index (FlexSearch / Fuse.js)** | **< 5ms response** | Low | $0 | **RECOMMENDED (Primary)** |
| **PostgreSQL Full-Text Search (Supabase)** | 20-50ms response | Medium | $0 (Free Tier) | Recommended if backend DB is added later |
| **Algolia / Meilisearch** | 10ms response | High | $$ Subscription | Not recommended (Unnecessary overhead) |

### Why FlexSearch / Fuse.js for Client-Side Search?
1. **Pre-built Compact Index**: The combined JSON dataset of 86 books, 53 gallery photos, and audio metadata is less than **150KB** uncompressed.
2. **Zero Egress / Server Latency**: Search runs instantly inside the user's browser without network roundtrips.
3. **Tamil Character Normalization**: Supports fuzzy matching and diacritic/dot normalization for Tamil characters (e.g. matching `தமிழண்ணல்` with or without dot modifiers).

---

## 3. User Interface Search Experience
- **Global Search Modal (`Ctrl + K` / `Cmd + K`)**: Accessible from any page on the header bar.
- **Categorized Results**: Grouped into **Books**, **Gallery**, **Audio**, and **Articles**.
- **Keyword Highlighting**: Matches highlighted in gold text color (`#c59b27`).
