import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { DefaultLayout } from 'layouts/DefaultLayout';

describe('DefaultLayout', () => {
  test('should have header title', () => {
    // Arrange
    render(<DefaultLayout />, { wrapper: MemoryRouter });
    const titleElement = screen.getByText(/react/i);
    // Act
    // Assert
    expect(titleElement).toBeInTheDocument();
  })

  test('should render the child component', () => {
    // Arrange
    render(<DefaultLayout>
      <h3>Demo Content</h3>
    </DefaultLayout>, { wrapper: MemoryRouter });
    const childElement = screen.getByText(/demo content/i);
    // Act
    expect(childElement).toBeInTheDocument();
  })
})