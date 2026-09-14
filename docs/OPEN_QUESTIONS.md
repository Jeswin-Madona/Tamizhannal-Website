# Open Questions & Decisions Required — Thamizhannal.org

## Overview
This document records open technical, architectural, and design questions that require review and decision by project stakeholders before committing to implementation.

---

## 1. Questions Requiring Confirmation

| Ref # | Category | Question | Proposed Options | Recommended Choice |
| :--- | :--- | :--- | :--- | :--- |
| **Q1** | **Backend / CMS** | Should content remain in SSG static JSON fixtures (`src/data/*.json`) or connect to Supabase Postgres? | **Option A**: Static JSON (Faster, $0 cost, SSG pre-rendered).<br>**Option B**: Supabase DB (Dynamic backend). | **Option A (Static JSON)** for initial migration, as content rarely changes. |
| **Q2** | **CDN Domain** | Should Cloudflare R2 media URLs (`pub-0ce93fbfa7e8471cb6002dfda2c42a59.r2.dev`) be proxied behind a custom CNAME (e.g. `media.thamizhannal.org`)? | **Option A**: Custom CNAME proxy (`media.thamizhannal.org`).<br>**Option B**: Direct R2 URL. | **Option A** for branding, SEO, and CDN edge caching control. |
| **Q3** | **Default Reader View** | When a user clicks "Read Book", should it open the Standard Virtualized PDF Reader or the 3D Flipbook by default? | **Option A**: Standard Virtualized PDF Reader.<br>**Option B**: 3D Flipbook Reader. | **Option A** (Standard Reader) as default with a prominent toggle button to switch to 3D Flipbook. |
| **Q4** | **Form Handler** | For the `/contact` form, which backend service should receive contact messages? | **Option A**: Formspree / Web3Forms.<br>**Option B**: Next.js Server Action with Resend/SendGrid. | **Option A (Formspree/Web3Forms)** for zero-server setup. |

---

## 2. Decision Log
*(Will be updated once stakeholders approve or specify preferences)*
