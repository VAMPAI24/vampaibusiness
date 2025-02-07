import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

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

// checks if local or staging
export const isLocalOrStaging = () => {
  if (typeof window !== "undefined") {
    const { origin } = window?.location;
    const regex = /(localhost|staging)/;
    return regex.test(origin);
  }
};

export const isLocalStagingOrProd = () => {
  if (typeof window !== "undefined") {
    const { origin } = window.location;

    const localRegex = /localhost(:\d+)?/; // Matches localhost with optional port
    const stagingRegex = /\.staging(-frontend)?\./i; // Matches 'staging' or 'staging-frontend' in a subdomain, case-insensitive

    if (localRegex.test(origin)) {
      return "local";
    } else if (stagingRegex.test(origin)) {
      return "staging";
    }

    return "prod";
  }
};

export const setStorage = <T>(name: string, value: string | number | T) => {
  if (typeof window !== "undefined") {
    const localStorage = window.localStorage;
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const getStorage = <T>(name: string): null | T => {
  if (typeof window !== "undefined") {
    const localStorageItem = window.localStorage.getItem(name);

    if (localStorageItem !== null) {
      try {
        return JSON.parse(localStorageItem);
      } catch (error) {
        console.error(`Error parsing localStorage item '${name}':`, error);
        return null;
      }
    }
  }

  return null;
};

export const hashWord = (str: string) => {
  const formattedWord = str.trim().toLowerCase();
  const hashedWord = CryptoJS.SHA256(formattedWord).toString(CryptoJS.enc.Hex);
  return hashedWord;
};

interface BasicUserInfo {
  device: string | null;
  os: string | null;
  language: string | null;
  location: string | null;
  ipAddress: string | null;
}
export const getBizBasicInfo = (): BasicUserInfo => {
  const userInfo: BasicUserInfo = {
    device: null,
    os: null,
    language: null,
    location: null,
    ipAddress: null,
  };

  userInfo.device = navigator.userAgent;
  userInfo.os = navigator.platform;
  userInfo.language = navigator.language;

  const userAgent = getStorage<{
    ipAddress: string;
    location: string;
  }>("businessAgent");

  userInfo.ipAddress = userAgent?.ipAddress ?? "";
  userInfo.location = userAgent?.location ?? "";

  return userInfo;
};

export const handleShare = (
  referralLink: string,
  platform: string,
  message?: string
) => {
  const url = encodeURIComponent(referralLink);
  const text = encodeURIComponent(message ?? "");

  switch (platform.toLowerCase()) {
    case "facebook":
    case "instagram":
    case "fb":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
      break;
    case "x":
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank"
      );
      break;
    case "linkedin":
      window.open(`https://www.linkedin.com/shareArticle?url=${url}`, "_blank");
      break;

    default:
      console.warn("Unsupported platform");
      break;
  }
};
