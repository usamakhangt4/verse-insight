# 📖 VerseInsight

> A modern Quran and Hadith exploration platform blending timeless wisdom with a high-performance developer experience.

[Live Demo](https://verse-insight.vercel.app/)

## 🚀 The Tech Stack
Built to be fast, type-safe, and scalable.
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Shadcn UI
- **Data:** JSON-based local storage (Migrating to Supabase soon)

## ✨ Features
- **Smart Search:** Topic-based search across Quranic verses and Hadith.
- **Bookmarking:** Save meaningful verses for later reflection.
- **Deep Commentary:** Access insightful explanations alongside translations.
- **Responsive Design:** Optimized for everything from mobile browsers to 4K monitors.

## 🛠️ Architecture Decisions
As a frontend-focused engineer, I prioritized:
1. **Type Safety:** Full TypeScript implementation ensures reliable data handling from the API/JSON layers to the UI components.
2. **Performance:** Leveraging Next.js Server Components (RSC) to minimize client-side JavaScript.
3. **Component Modularity:** Reusable UI patterns built with Shadcn UI for a consistent look and feel.

## 🗺️ Roadmap (The "Fearless" Future)
I am currently evolving this project to incorporate advanced state management and backend services:
- [ ] **Data Fetching:** Integrating **TanStack Query** for better caching and loading states.
- [ ] **Persistence:** Moving bookmarks from local state to a **Supabase** PostgreSQL database.
- [ ] **Backend:** Implementing **Drizzle ORM** for type-safe database queries.
- [ ] **Social:** Adding user authentication via NextAuth/Auth.js.

## 💻 Installation
1. Clone the repo: `git clone https://github.com/usamakhangt4/verse-insight.git`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
