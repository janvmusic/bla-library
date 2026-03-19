import { useEffect } from 'react';
import { ToastWrapper } from './styles';

type Props = {
  message: string;
  variant?: 'error' | 'success';
  onDismiss: () => void;
  durationMs?: number;
};

export const Toast = ({ message, variant = 'error', onDismiss, durationMs = 4000 }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [onDismiss, durationMs]);

  return (
    <ToastWrapper $variant={variant} role="alert" aria-live="assertive">
      {message}
    </ToastWrapper>
  );
};
