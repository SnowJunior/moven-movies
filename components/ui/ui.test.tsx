import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from "react";
import CardComponent from './card';



describe('CardComponent', () => {
  const mockProps = {
    vote_average: 5.706,
    release_date: '27-09-12',
    popularity: 3900.5,
    id: 8765678,
    poster_path: '/i47IUSsN126K11JUzqQIOi1Mg1M.jpg',
    title: 'Test Movie',
    adult: false,
    overview: 'A great movie. This is a longer overview to test truncation.',
    backdrop_path: 'v9Du2HC3hlknAvGlWhquRbeifwW.jpg',
  };

  const mockOnClick = jest.fn();

  it('renders the component with props and handles image loading', async () => {
    render(<CardComponent props={mockProps} isLoading={false} onClick={mockOnClick} />);

    expect(screen.getByRole('heading', { name: mockProps.title }));
    expect(screen.getByText('Rated:'));
    expect(screen.getByText('PG'));
    expect(screen.getByText('Overview:'));

    const imageElement = screen.getByAltText(mockProps.title);
    expect(imageElement).toHaveAttribute("src", expect.stringContaining(mockProps.backdrop_path));

    fireEvent.load(imageElement);
    await waitFor(() => expect(imageElement.classList.contains('opacity-100')).toBe(true))
  });

  it('handles missing backdrop_path and displays placeholder', () => {
    const propsWithoutBackdrop = { ...mockProps, backdrop_path: null };
    render(<CardComponent props={propsWithoutBackdrop} isLoading={false} onClick={mockOnClick} />);

    const image = screen.getByAltText(propsWithoutBackdrop.title);
    expect(image).toHaveAttribute("src", expect.stringContaining('hero-card-complete.jpeg'));
  });

  it('truncates long overviews', () => {
    const longOverview = 'This is a very long overview that should be truncated.  It exceeds the character limit.';
    const propsWithLongOverview = { ...mockProps, overview: longOverview };
    render(<CardComponent props={propsWithLongOverview} isLoading={false} onClick={mockOnClick} />);

    expect(screen.getByText(`${longOverview.slice(0, 40)}...`));
  });
});