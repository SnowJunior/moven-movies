import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import TopNavbar from "./TopNavbar";
import MovieModal from "./CardModal";
import AuthModal from "./AuthModal";

const mockOnClose = jest.fn();

describe("TopNavbar Component", () => {
  it("renders the top navbar component correctly", () => {
    render(<TopNavbar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("@")).toBeInTheDocument();
  });

  it("shows the avatar image", () => {
    render(<TopNavbar />);

    const avatar = screen.findAllByAltText("moven image");
    expect(avatar).toMatchSnapshot();
  });
});

describe("MovieModal", () => {
  const mockMovie = {
    title: "Movie modal test",
    adult: false,
    overview:
      "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
    vote_average: 8.5,
    release_date: "2023-10-27",
    popularity: 95.5,
    poster_path: "/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
    id: 98789,
    backdrop_path: "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
  };

  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
  });

  it("renders the component with movie data and handles image loading", async () => {
    render(
      <MovieModal movie={mockMovie} onClose={mockOnClose} isLoading={false} />
    );

    // Check if movie details are displayed
    expect(
      screen.getByRole("heading", { name: mockMovie.title })
    ).toBeInTheDocument();
    expect(screen.getByText(`Rated:`));
    expect(screen.getByText(`Description:`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(screen.getByText(`Viewer rating:`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.vote_average}`)).toBeInTheDocument();
    expect(screen.getByText(`Release date:`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
    expect(screen.getByText(`Popularity:`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.popularity}`)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <MovieModal movie={mockMovie} onClose={mockOnClose} isLoading={false} />
    );
    const closeButton = screen.getByRole("button"); // Or query by icon if you prefer
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  test("renders movie poster image", () => {
    render(
      <MovieModal movie={mockMovie} onClose={mockOnClose} isLoading={false} />
    );
    const posterImage = screen.getByTestId("movie-poster");

    expect(posterImage).toBeInTheDocument();
    expect(posterImage.getAttribute("src")).toContain(
      encodeURIComponent(mockMovie.poster_path)
    );
  });

  test("renders fallback image when poster_path is null", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };

    render(
      <MovieModal
        movie={movieWithoutPoster}
        onClose={mockOnClose}
        isLoading={false}
      />
    );

    const posterImage = screen.getByTestId("movie-poster");

    expect(posterImage).toBeInTheDocument();
    expect(posterImage.getAttribute("src")).toContain(
      encodeURIComponent("https://heroui.com/images/hero-card-complete.jpeg")
    );
  });

  test("renders movie backdrop image", () => {
    render(
      <MovieModal movie={mockMovie} onClose={mockOnClose} isLoading={false} />
    );
    const posterImage = screen.getByTestId("mobile-poster");

    expect(posterImage).toBeInTheDocument();
    expect(posterImage.getAttribute("src")).toContain(
      encodeURIComponent(mockMovie.backdrop_path)
    );
  });

  test("renders fallback image when poster_path is null", () => {
    const movieWithoutPoster = { ...mockMovie, backdrop_path: null };

    render(
      <MovieModal
        movie={movieWithoutPoster}
        onClose={mockOnClose}
        isLoading={false}
      />
    );

    const posterImage = screen.getByTestId("mobile-poster");

    expect(posterImage).toBeInTheDocument();
    expect(posterImage.getAttribute("src")).toContain(
      encodeURIComponent("https://heroui.com/images/hero-card-complete.jpeg")
    );
  });
});

describe("AuthModal", () => {
  test("renders Logout text", () => {
    render(<AuthModal onClose={mockOnClose} logOut={mockOnClose} />);
    expect(screen.getByText(/Logout User/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you to exit/i)).toBeInTheDocument();
  });

  test("contains at least one button", () => {
    render(<AuthModal onClose={mockOnClose} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
