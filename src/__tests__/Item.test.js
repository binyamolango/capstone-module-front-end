import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests Navigation component', () => {
  it('should render page', () => {
    const NavigationComponent = renderer.create(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    expect(NavigationComponent).toMatchSnapshot();
  });

  it('should display navigation buttons "Doctors"', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    const button1 = screen.getByText('Delete Doctor');
    expect(button1).toBeInTheDocument();
  });

  it('should display navigation buttons "Add Doctor"', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    const button1 = screen.getByText('Add Doctor');
    expect(button1).toBeInTheDocument();
  });

  it('should display navigation buttons "Doctors"', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    const button1 = screen.getByText('Doctors');
    expect(button1).toBeInTheDocument();
  });

  it('should display navigation buttons "My Appointments"', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    const button1 = screen.getByText('My Appointments');
    expect(button1).toBeInTheDocument();
  });

  it('should display navigation buttons "Book Appointment"', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    const button1 = screen.getByText('Book Appointment');
    expect(button1).toBeInTheDocument();
  });
});
