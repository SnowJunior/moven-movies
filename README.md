# Movie Recommender System

## Getting Started

To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone git@github.com:SnowJunior/moven-movies.git
   ```
2. Navigate to the project directory:
   ```sh
   cd monarch-movies
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Description

- Users can view a list of movies.
- Users can search for movies.
- Users can navigate through different movie pages.
- Users can fetch their own movie lists.
- Users can query movies.
- Users can use authentication actions like login and logout with NextAuth.

## Tech Stack

- **Next.js** - React framework for server-side rendering.
- **NextAuth** - Authentication handling.
- **Tailwind CSS** - Styling framework.
- **TMDB API** - Source for movie data.

## API Configuration

Ensure you have an API key from TMDB and set it up in your environment variables:

```sh
NEXT_PUBLIC_API_URL=your_api_key_here
```

