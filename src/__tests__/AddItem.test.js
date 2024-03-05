import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddItem from '../components/AddItem';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests AddItem component', () => {
  it('should render page', () => {
    const AddItemComponent = renderer.create(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>,
    );
    expect(AddItemComponent).toMatchSnapshot();
  });

  it('should display "Add Doctor"', () => {
    render(
      <BrowserRouter>
        <AddItem />
      </BrowserRouter>,
    );

    const text = screen.getAllByText('Add Doctor');
    expect(text[2]).toBeInTheDocument();
  });
});
