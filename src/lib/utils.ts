import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge Tailwind classes properly
 * Used throughout the UI components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
