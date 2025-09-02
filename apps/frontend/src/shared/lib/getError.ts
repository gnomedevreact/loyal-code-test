import { AxiosError } from 'axios';

type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: Record<string, string[] | string>;
};

export function getError(error: unknown): string {
  const ax = error as AxiosError<ApiErrorPayload>;
  if (ax?.isAxiosError) {
    const data = ax.response?.data;

    const msg = data?.message || data?.error;
    if (msg) return msg;

    if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const val = firstKey ? data.errors[firstKey] : undefined;
      if (Array.isArray(val)) return val[0];
      if (typeof val === 'string') return val;
    }

    if (ax.response) {
      return `Request failed (${ax.response.status})`;
    }

    if (ax.request) {
      return 'Network error. Please check your connection.';
    }
  }

  return (error as any)?.message || 'Unexpected error';
}
