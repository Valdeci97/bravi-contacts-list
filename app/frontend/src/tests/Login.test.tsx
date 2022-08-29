import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';


describe('Testing Login page', () => {
  afterEach(() => cleanup());
  it('should have the right elements on screen', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/lista de contatos/i)).toBeInTheDocument();
    expect(screen.getByText(/feito com react/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastre-se/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toBeDefined();
  });
});

describe('Testing login page navigation to sign up page', () => {
  afterEach(() => cleanup());
  it('should got to "/signup" page', () => {
    render(<App />, { wrapper: BrowserRouter });
    const signupButton = screen.getByRole('button', { name: /cadastre-se/i });
    expect(signupButton).toBeInTheDocument();

    userEvent.click(signupButton);

    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });
});

describe('Testing signup page', () => {
  afterEach(() => cleanup());
  it('should have the right elements on screen', () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByText(/lista de contatos/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument();
  });
});