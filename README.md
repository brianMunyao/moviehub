# 🎬 MovieHub

MovieHub is a modern, responsive, and full-featured movie and TV discovery web application built with **Next.js**. It integrates **TMDB API** for fetching movie and TV data, **Clerk** for authentication, and **Supabase/Postgres** for storing user info and favorites history. The app supports personalized recommendations, favorites management, and responsive design for all devices.

Figma design: [MovieHub Wireframes (In Progress)](https://www.figma.com/design/YEzpGoLsgUZRGRh0oen8b7/Savannah---moviehub?t=YULwfDOnGCr08XsL-1)  

## 🚀 Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **UI Library**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Authentication**: Clerk (Email/Password + Google SSO)
- **Database**: Supabase (Postgres) + Drizzle ORM
- **Code Quality**: Prettier, ESLint, Husky
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions, Vercel

## 🏗️ Features

### Movies & TV

- Home page with **Trending**, **Top Rated**, and **For You** sections.
- Detailed movie/TV pages with poster, overview, genres, ratings, cast, crew.
- Skeleton loaders for asynchronous content.
- Responsive design (mobile, tablet, desktop).
- Full-width featured sections with animated hover effects (GSAP).

### Recommendations

- Personalized recommendations based on **favorites** history.
- Integration with TMDB endpoints for trending, popular, and top-rated content.
- Local server side caching in memory for quick responses.

### Authentication & Favorites

- Sign in/up via **Clerk** (email/password or Google SSO).
- Favorites management stored in **Supabase**.
- Zustand store for quick favorite checks and UI updates.

### Search

- Search movies and TV shows by keyword.
- Dynamic results with loading skeletons.

---

## 🛠️ Services & API

The application uses a **service layer** to abstract data fetching:

- **MoviesService**: fetch movies, trending, top-rated, and search.
- **TVService**: fetch TV shows, trending, popular, top-rated.
- **RecommendationService**: personalized recommendations based on user favorites.
- **FavoritesService**: manage user favorites in the Postgres database.
- **ProfilesService**: user profile management.

Major services support **basic in-memory caching** for performance. API routes provide endpoints for client consumption.

---

## 🧰 State Management

- **Zustand** store to manage the favorites list and allow quick favorite checks in UI.
- Centralized session state is managed by **Clerk**.
- SWR hooks used for client-side data fetching and caching.

---

## ⚙️ CI/CD

### GitHub Actions Workflows

1. **Lint & Test + Deploy**
   - Job 1: Lint code with ESLint and Prettier, Run Jest tests.
   - Job 2: Deploy to **dev** or **prod** depending on branch.

2. **Database Migrations**
   - Checks for schema changes.
   - Runs migrations automatically for dev/prod environment.

---

## 🧪 Testing

- **Unit Tests**: Services (`movies.service`, `recommendation.service`, etc.)
- **Component Tests**: MovieListSection, MovieCard, FavoriteButton, SearchBar.
- **Integration Tests**: Search → Movie/TV Details navigation.
- **Tools**: Jest + React Testing Library

---

## 📐 UI & Design

- Components grouped modularly for scalability and maintainability: `/components/global`, `/components/movies`.
- Loading skeletons for async content.
- Glassy tags, hover animations, and GSAP-powered effects.
- Consistent design system via Tailwind + shadcn/ui.

---

## 📦 Code Quality

- Consistent **kebab-case** and naming conventions.
- Prettier and ESLint for formatting and linting.
- Husky hooks for pre-commit checks.
- Conventional commits.

---

## ⚡ Deployment

- Hosted on **Vercel** (dev and prod environments).
- Environment variables: `.env.example`

---

## 📖 Setup Instructions

1. **Clone Repository**

```bash
git clone https://github.com/brianMunyao/moviehub.git
cd moviehub
````

2. **Install Dependencies**

```bash
yarn install
```

3. **Configure Environment Variables**

- Copy `.env.example` to `.env.local` and fill TMDB, Clerk, and Supabase credentials.

4. **Run Development Server**

```bash
yarn dev
```

5. **Run Tests**

```bash
yarn test
```

6. **Lint & Format**

```bash
yarn lint
yarn format
```

7. **Deploy**

- Push to `dev` or `prod` branch to trigger Vercel deployment job.

---

## 🔮 Future Improvements

- Complete **Figma design** and implement fully polished UI design.
- Add **custom recommendation algorithms** based on genres, ratings, and watch history.

---

## 📝 Notes

- TMDB API is used for movie/TV metadata.
- Supabase/Postgres used for user data and favorites.
- Endpoints currently implement basic in-memory caching.
- Commit messages follow **Conventional Commits** style.

---

## 🎁 Links

- Figma: [MovieHub Wireframes](https://www.figma.com/design/YEzpGoLsgUZRGRh0oen8b7/Savannah---moviehub?t=YULwfDOnGCr08XsL-1)
- Link: [https://moviehub-savannah.vercel.app/](https://moviehub-savannah.vercel.app/)
