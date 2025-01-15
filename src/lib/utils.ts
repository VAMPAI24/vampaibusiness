import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openMail = (mail: string) => {
  if (typeof window !== "undefined") {
    window.location.href = `mailto:${mail}`;
  }
};

export const openExternalLink = (url: string) => {
  if (typeof window !== "undefined") {
    window.open(url, "vampai", "noopener");
  }
};

export const formatAndTransformString = (input: string): string => {
  // Convert Markdown headings to HTML-like headings
  let formattedString = input.replace(/###\s?(.*)/g, "<h3>$1</h3>");

  // Remove all asterisks (**)
  formattedString = formattedString.replace(/\*\*/g, "");

  formattedString = formattedString.replace(/\\*/g, "");

  // Replace numbered lists with HTML ordered lists
  formattedString = formattedString.replace(/(\d+)\.\s/g, "<li>$1. ");

  // Replace bullets (-) with HTML unordered list items
  formattedString = formattedString.replace(/-\s/g, "<li>");

  // Ensure consistent line breaks and wrap lists in <ul> or <ol>
  formattedString = formattedString.replace(
    /<li>(.*?)\n/g,
    "<ul><li>$1</li></ul>"
  );
  formattedString = formattedString.replace(/\n{2,}/g, "<br>");

  return formattedString.trim();
};

export const getPathName = (url: string): string => {
  const parts = url.split("/").filter(Boolean); // Filter removes empty strings caused by leading/trailing slashes

  // Ensure there are at least two parts to concatenate
  if (parts.length >= 2) {
    const secondLast = parts[parts.length - 2];
    const last = parts[parts.length - 1];

    return last.replace(/-/g, " ")
  }

  // If only one part, return it
  return parts[0]?.replace(/-/g, " ") || "";
};
