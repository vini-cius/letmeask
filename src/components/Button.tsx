import { ButtonHTMLAttributes } from 'react';

import { Button } from '../styles/button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function DefaultButton({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <Button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  );
}