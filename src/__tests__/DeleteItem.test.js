import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import DeleteItem from '../components/DeleteItem';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests DeleteItem component', () => {
  it('should render page', () => {
    const DeleteItemComponent = renderer.create(
      <BrowserRouter>
        <DeleteItem />
      </BrowserRouter>,
    );
    expect(DeleteItemComponent).toMatchSnapshot();
  });
});
