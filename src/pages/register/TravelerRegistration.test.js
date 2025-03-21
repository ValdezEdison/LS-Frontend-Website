import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TravelerRegistration from './TravelerRegistration';

describe('TravelerRegistration', () => {
  test('renders registration form', () => {
    render(<TravelerRegistration />);
    expect(screen.getByText('Regístrate como viajero')).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(<TravelerRegistration />);
    const passwordInput = screen.getByPlaceholderText('Introduce una contraseña');
    const toggleButton = screen.getByLabelText('Show password');
    Continuing from where we left off:

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('submits form with user input', () => {
    render(<TravelerRegistration />);

    fireEvent.change(screen.getByPlaceholderText('Nombre y apellidos'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('nombre@ejemplo.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('123 456 789'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByPlaceholderText('Introduce una contraseña'), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByLabelText(/Acepta los/));

    const submitButton = screen.getByText('Crear cuenta');
    fireEvent.click(submitButton);

    // Add assertions here to check form submission behavior
  });
});