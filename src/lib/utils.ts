import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const openMail = (mail: string) => {
  if (typeof window !== "undefined") {
    window.location.href = `mailto:${mail}`;
  }
};
