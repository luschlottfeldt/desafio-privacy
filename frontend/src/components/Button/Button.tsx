import type { ButtonHTMLAttributes } from 'react';
import { type ButtonVariant, StyledButton } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $fullWidth={fullWidth}
      {...props}
    />
  );
}
