# Accessibility Strategy (WCAG 2.1 AA) — Thamizhannal.org

## Overview
Accessibility ensures that students, visually impaired users, elders, and screen reader users can access Dr. Thamizhannal's digital archive.

---

## 1. Core Accessibility Standards & Implementation

| Area | Requirement | Technical Implementation |
| :--- | :--- | :--- |
| **Language Attributes** | Tamil language declaring for screen readers | Explicit `lang="ta"` on all Tamil text nodes to ensure correct TTS pronunciation. |
| **Color Contrast** | Minimum 4.5:1 for body text, 3:1 for headers | Deep Charcoal (`#231d1a`) on Warm Cream (`#fdfbf7`) yields a **13.5:1 contrast ratio**. |
| **Keyboard Navigation** | Full keyboard accessibility without mouse | Focus rings (`outline-gold-500`), skip-to-main-content link, `Tab` order on flipbook controls. |
| **Screen Reader ARIA** | Accessible controls for custom UI | ARIA labels for audio player, flipbook page controls, search modal (`aria-label="அடுத்த பக்கம் / Next Page"`). |
| **Image Alt Text** | Meaningful alt tags for gallery & book covers | Descriptive Tamil alt tags for all 53 gallery photos and 86 book covers. |
| **Reduced Motion** | Support for users sensitive to motion | `prefers-reduced-motion` media query disables 3D flipbook animation and uses slide transitions instead. |

---

## 2. Accessible PDF & Flipbook Controls
- **Accessible Zoom**: `+` and `-` buttons with explicit keyboard shortcuts (`+`, `-`, `0` to reset).
- **Page Jump Input**: Keyboard numeric input for jumping directly to any page number.
- **Audio Transcript**: Captions and text alternative for the 10-hour audio file.
