import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogIn from '../components/LogIn';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

let num = 0;
const handleClick = (n) => {
  num = n;
};
describe('Tests LogIn component', () => {
  it('should render page', () => {
    const LogInComponent = renderer.create(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );
    expect(LogInComponent).toMatchSnapshot();
  });

  it('should display "Welcome to Edenic Health"', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );

    const h1 = screen.getByText('Welcome to');
    const h2 = screen.getByText('Edenic Health');
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  it('should allow click on LogIn button', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );

    const LogInButton = screen.getByRole('button', { name: 'Log in' });
    LogInButton.onclick = handleClick(2);
    fireEvent.click(LogInButton);
    expect(num).toBe(2);
  });

  it('should allow click on signup button', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );

    const signUpButton = screen.getByText('Sign up');
    signUpButton.onclick = handleClick(1);
    fireEvent.click(signUpButton);
    expect(num).toBe(1);
  });

  it('should get value from username field', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );

    const usernameInput = screen.getByRole('textbox');
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });
});
