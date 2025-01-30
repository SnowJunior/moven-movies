// These components models allow for the easy reusability of the said component since the component is just UI and holds not state.

// Define part of a custom button property
export interface Button {
  title: string
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  type: "submit" | "reset" | "button"
  image: string
}

// Define a card component elements
export interface CardProps {
  id: number
  title: string
  release_date: string
  overview: string
  vote_average: number
  adult: boolean
  poster_path: string | null
  backdrop_path: string | null
  popularity: number
}

// Define paginator elements 
export interface PageProps {
  onNext: () => void
  onPrevious: () => void
  pages: number
  onPage: number
  onNextDisabled: boolean
  onPreviousDisabled: boolean
  goToPage: (page: number) => void
}

// Create movie modal elements
export interface MovieModalProps {
  movie: CardProps;
  onClose: () => void;
  isLoading:  boolean
}

export interface AuthModalProps {
  onClose: () => void
  logOut: () => void
}