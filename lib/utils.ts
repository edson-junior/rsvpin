import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(process.env.LOCALE, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString(process.env.LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
