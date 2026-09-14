# Information Architecture — Thamizhannal.org

## Overview
The Information Architecture (IA) for **Thamizhannal.org** is designed to transform the website from a static archive index into a modern, scholarly, digital literary library. The structure honors Tamil cultural heritage while providing intuitive navigation for scholars, students, and general readers.

---

## 1. Global Site Hierarchy

```
[Thamizhannal Digital Archive]
 ├── 1. Home (முகப்பு)
 │    ├── Hero Archive Banner & Life Summary
 │    ├── Quick Navigation to Core Collections
 │    ├── Audio Highlight ("பழகு தமிழ் அறிவோம்" 10-Hr Series)
 │    ├── Video Award Feature (SRM University 2013)
 │    └── Featured Literary Essay
 │
 ├── 2. His Life & Legacy (தமிழ்வாழ்வு - /about)
 │    ├── Life Timeline (1928 - 2015)
 │    ├── Early Life & Birth (பிறப்பு - நெற்குப்பை)
 │    ├── Educational Milestones (கல்வி)
 │    ├── Academic & Professorial Career (ஆசிரியர் பணி)
 │    ├── Family & Heritage (குடும்பம்)
 │    └── Honors, Awards & Titles (பெற்ற சிறப்புகள்)
 │
 ├── 3. Books & Publications (நூல்கள் - /books)
 │    ├── Global Search & Filter Bar
 │    ├── Category Navigation (11 Literary Categories)
 │    ├── Book Grid / List View Toggle
 │    └── Book Detail View (/books/[slug])
 │         ├── Book Cover & Metadata
 │         ├── Synopsis / Summary
 │         ├── Direct PDF Download (பதிவிறக்கம்)
 │         ├── Read PDF In-App (/books/[slug]/read)
 │         └── Interactive Flipbook View (/books/[slug]/flipbook)
 │
 ├── 4. Media & Gallery (ஒளிப்படங்களும் சான்றுகளும் - /gallery)
 │    ├── Categorized Photo Journey (11 Life Phases)
 │    └── Lightbox Viewer with Tamil Captions & Zoom
 │
 ├── 5. Remembrance (நினைவேந்தல் - /remembrance)
 │    ├── Memorial Invitations & Tributes
 │    ├── Dinamani Newspaper Retrospectives
 │    └── Scholar Testimonials
 │
 ├── 6. Contact & Community (தொடர்புகொள்ள - /contact)
 │    ├── Message Inquiry Form
 │    └── Official Facebook Page & Foundation Details
 │
 └── 7. Universal Search (/search)
      ├── Live Query Input (Tamil & English Transliteration)
      └── Instant Results Grouped by Books, Media, and Essays
```

---

## 2. Navigation Architecture

### 2.1 Header Desktop Bar
- **Brand Identity**: Dual-line logo (`தமிழண்ணல்` in Noto Serif Tamil + `Thamizhannal Digital Archive` in uppercase tracking).
- **Primary Nav Items**:
  - `முகப்பு` (Home)
  - `தமிழ்வாழ்வு` (Life)
  - `நூல்கள்` (Books Catalog)
  - `ஒளிப்படங்கள்` (Gallery)
  - `நினைவேந்தல்` (Remembrance)
  - `தொடர்புகொள்ள` (Contact)
- **Utility Actions**:
  - Quick Search Modal Trigger (`Ctrl + K` or Search Icon).

### 2.2 Mobile Navigation Drawer
- Full-screen slide-over drawer with warm ivory background and maroon accents.
- Large touch targets (minimum 48px height) with dual Tamil/English sub-labels.

---

## 3. User Journeys

### Journey A: Tamil Literature Scholar / Researcher
1. Arrives at Homepage via Google search for a Tolkappiyam commentary.
2. Uses top search bar or clicks **நூல்கள்** -> Filters by `தொல்காப்பியம்` category.
3. Selects `தொல்காப்பியம் எழுத்ததிகாரம்`.
4. Clicks **In-App Reader** to read full text PDF with page jump and thumbnail navigation.
5. Copies citation and downloads PDF for offline research.

### Journey B: Student Discovering Thamizhannal's Audio Series
1. Lands on Homepage.
2. Plays embedded **"பழகு தமிழ் அறிவோம்"** 10-hour audio player.
3. Navigates through timestamp chapters (e.g. `திருவளர் செல்வன் vs திருவளர்ச் செல்வன்`).
4. Reads biography page (`/about`) to learn about Dr. Thamizhannal's academic legacy.
