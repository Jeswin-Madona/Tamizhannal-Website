# Design System & Tamil Typography — Thamizhannal.org

## Overview
The visual identity of **Thamizhannal.org** balances **Tamil Literary Heritage** with a **Modern Digital Archive Aesthetic**. It avoids generic SaaS appearance while avoiding outdated visual cliches.

---

## 1. Archival Color Palette

| Token Name | Hex Code | HSL Value | UI Usage |
| :--- | :--- | :--- | :--- |
| **`maroon-900`** (Deep Semmozhi Red) | `#4a1014` | `hsl(356, 65%, 18%)` | Primary navigation header, main headings, archival accents |
| **`maroon-700`** (Classic Royal Maroon) | `#701a1e` | `hsl(357, 62%, 27%)` | Sub-headers, buttons, active tab indicators |
| **`cream-50`** (Warm Antique Ivory) | `#fdfbf7` | `hsl(40, 50%, 98%)` | Primary page background (paper texture feeling) |
| **`cream-100`** (Parchment Paper) | `#f7f2e6` | `hsl(41, 45%, 93%)` | Card backgrounds, blockquotes, audio container |
| **`gold-500`** (Archival Muted Gold) | `#c59b27` | `hsl(44, 67%, 46%)` | Borders, subtle highlights, active badges |
| **`gold-300`** (Soft Sunlight Gold) | `#e7cb76` | `hsl(44, 70%, 68%)` | Dark mode / Maroon background text highlights |
| **`charcoal-900`** (Deep Palm Leaf Ink) | `#231d1a` | `hsl(20, 15%, 12%)` | High-contrast primary body text |
| **`charcoal-600`** (Muted Ink) | `#544843` | `hsl(18, 12%, 30%)` | Secondary meta text, publication info |

---

## 2. Tamil Typography Architecture

Tamil text requires specific line heights and letter spacing due to upper/lower glyph modifiers (உயிர்மெய் எழுத்துக்கள் & கொம்புகள்). Standard English font metrics distort Tamil lines.

### 2.1 Recommended Font Pairings

| Role | Font Family | Fallbacks | Rationale |
| :--- | :--- | :--- | :--- |
| **Headings (Tamil)** | **`Noto Serif Tamil`** | `Latha`, `Georgia`, `serif` | Traditional manuscript weight, high legibility for Tamil titles |
| **Body Text (Tamil)** | **`Noto Sans Tamil`** | `Inaimathi`, `Arial`, `sans-serif` | Clean, highly legible on mobile screens down to 14px |
| **English / Meta** | **`Outfit`** / **`Inter`** | `system-ui`, `sans-serif` | Modern, clean geometric sans for metadata and navigation |

### 2.2 Typography Scale & Metrics

```css
/* Typography Design Tokens */
:root {
  --font-tamil-serif: 'Noto Serif Tamil', Georgia, serif;
  --font-tamil-sans: 'Noto Sans Tamil', -apple-system, sans-serif;
  --font-english: 'Outfit', 'Inter', sans-serif;

  /* Line-height for Tamil body text MUST be minimum 1.75 to prevent glyph clipping */
  --leading-tamil-body: 1.8;
  --leading-tamil-heading: 1.35;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

---

## 3. UI Component Tokens

### 3.1 Card Components (Book & Gallery Cards)
- **Background**: `bg-cream-100` (`#f7f2e6`)
- **Border**: `1px solid rgba(197, 155, 39, 0.25)` (Muted Gold hairline)
- **Shadow**: Subtle archival drop-shadow (`0 2px 8px rgba(35, 29, 26, 0.06)`)
- **Hover Transition**: Elevated shadow (`0 8px 20px rgba(74, 16, 20, 0.12)`), subtle lift `-2px`.

### 3.2 Reading Modes (PDF / Reader Interface)
- **Default Paper Mode**: Cream background (`#fdfbf7`), Charcoal text (`#231d1a`)
- **Sepia Mode**: Warm parchment (`#f4ecd8`), Sepia text (`#433422`)
- **Night Reader Mode**: Soft dark charcoal (`#1a1918`), Soft cream text (`#e6e1d8`)
