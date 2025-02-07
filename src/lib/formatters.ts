/* eslint-disable @typescript-eslint/no-explicit-any */

export const convertListToText = (htmlString: string | any) => {
  // Match the entire <ul> element along with its contents
  const regex = /<ul[^>]*>(.*?)<\/ul>/g;
  // Replace each <ul> element with the text content of its list items
  const plainText = htmlString
    .replace(regex, (match: string, group: string) => {
      // Match all list item content within <li> tags
      const listItemRegex = /<li>(.*?)<\/li>/g;
      // Extract text content from list items and join with newline characters
      const listItemText = group.replace(
        listItemRegex,
        (liMatch: string, liGroup: string) => liGroup.trim()
      );
      // Trim any leading or trailing whitespace and return
      return listItemText.trim();
    })
    .trim();
  // console.log(plainText)
  return plainText;
};

export const arrayToUlString = (arr: string[]) => {
  const strippedStrings = arr
    .map((item) => item.replace(/<p>|<\/p>/g, ""))
    ?.filter((item) => item.trim() !== "");

  // Map each string in the array to a list item element
  const listItems = strippedStrings.map((item) => `<li>${item}</li>`);

  // Join the list items into a single string, wrapped with <ul> tags
  const ulString = `<ul>${listItems.join("")}</ul>`;

  // Return the string representing the unordered list
  return ulString;
};

export const formatStringToList = (string: string | any) => {
  // Split the string into an array of items using a regular expression to match newline characters or periods
  if (string === " ") {
    return " ";
  }
  if (string.includes("<ul>") && string.includes("<li>")) {
    return string;
  } else {
    const items = string.split(/[\n.]+/);

    // Remove any empty items from the array
    const filteredItems = items.filter(
      (item: string) => item.trim() !== "" || !item.trim().includes("&nbsp;")
    );

    // Map each item to a list item element
    const listItems = filteredItems.map(
      (item: string) =>
        `<li>${item
          .trim()
          .replace(/&nbsp;/g, "")
          ?.replace(/•/g, "")}</li>`
    );

    // Concatenate the list items into a single string
    const listItemString = listItems.join("");

    return `<ul>${listItemString}</ul>`;
  }
};

export const splitStringDynamically = (str: string) => {
  // Expanded list of potential delimiters
  const delimiters = [
    "●",
    "•",
    "▪",
    "■",
    "○",
    "◦",
    "➢",
    "→",
    "⇒",
    // "-",
    // "–",
    "—",
    ".",
  ];
  let bestDelimiter = "";
  let maxCount = 0;

  // Find the delimiter that occurs most frequently
  delimiters.forEach((delimiter) => {
    const count = (str.match(new RegExp(`\\${delimiter}`, "g")) || []).length;
    if (count > maxCount) {
      maxCount = count;
      bestDelimiter = delimiter;
    }
  });

  // If no good delimiter found (less than 3 occurrences), fall back to sentence splitting
  if (maxCount < 3) {
    return splitIntoSentences(str);
  }

  // Split by the best delimiter
  return splitAndFormat(str, bestDelimiter);
};

export const splitIntoSentences = (str: string) => {
  // Use a more comprehensive regex for sentence splitting
  const sentenceRegex = /[.!?]+\s+|\n+|(?<=[a-z])\. (?=[A-Z])/g;
  return splitAndFormat(str, sentenceRegex);
};

export const splitAndFormat = (str: string, delimiter: RegExp | string) => {
  const sentences = str.split(delimiter).map((sentence) => sentence.trim());

  // Remove empty strings, format each sentence, and handle edge cases
  return sentences
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => {
      // Remove leading non-letter characters
      sentence = sentence.replace(/^[^a-zA-Z]+/, "");
      // Capitalize first letter
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });
};

export const modifyText = (value: string) => {
  // Check if the input text contains HTML list or paragraph tags

  if (value) {
    const tagPattern = /<(li|p)>(.*?)<\/(li|p)>/g;
    const hasTags = tagPattern.test(value);

    if (hasTags) {
      // If the input text contains HTML tags, parse and modify the text
      const symbolsToRemove = /[●•▪■○◦➢→⇒]/g;

      const cleanItem = (item: string): string => {
        return item
          .replace(/<\/?(li|p)>/g, "") // Remove HTML tags
          .replace(/\s+/g, " ") // Replace multiple spaces with a single space
          .replace(/&nbsp;/g, " ") // Replace non-breaking space with regular space
          .replace(symbolsToRemove, ""); // Remove various bullet points and symbols
        // .trim(); // Remove leading and trailing whitespace
      };

      const itemsArray = value.match(tagPattern)?.map(cleanItem) ?? [];

      return itemsArray.filter((item) => item !== "");
    } else {
      // If the input text doesn't contain HTML tags, split it into sentences after each full stop
      const sentencesArray: string[] = splitStringDynamically(value);

      return sentencesArray;
    }
  } else {
    return [""];
  }
};

export const cleanSkillsHTML = (html: string) => {
  if (!html) return [];

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  return Array.from(tempDiv.querySelectorAll("ul > li"))
    .map((li) => li.textContent?.trim())
    .filter((text) => text && text !== " ");
};

// Convert HTML <ul><li>...</li></ul> to an array of strings
export const htmlToArray = (html: string): string[] => {
  if (!html) return [];

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  return Array.from(tempDiv.querySelectorAll("ul > li"))
    .map((li) => li.textContent?.trim() ?? "")
    .filter((text) => text.length > 0 && text !== " ");
};

// Convert an array of strings back to an HTML list
export const arrayToHtml = (skills: string[]): string => {
  if (Array.isArray(skills)) {
    const flatSkills = skills.flatMap((skill) =>
      skill.split(",").map((s) => s.trim())
    );

    return `<ul>${flatSkills
      .map((skill) => `<li>${skill}</li>`)
      .join("")}</ul>`;
  }

  return skills;
};

export const formatTextToHtml = (text: string): string => {
  const lines = text.split("\n").map((line) => line.trim()); // Split by new lines and trim spaces

  let html = "";
  let inList = false;

  for (const line of lines) {
    if (!line) continue; // Skip empty lines

    if (line.endsWith(":")) {
      // Convert headings like "Key Responsibilities:"
      html += `<p><strong>${line}</strong></p>`;
    } else if (line.startsWith("- ")) {
      // Convert bullet points into <ul><li>...</li></ul>
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${line.substring(2)}</li>`; // Remove "- " and wrap in <li>
    } else {
      // Convert normal text to <p>
      if (inList) {
        html += "</ul>"; // Close the list if transitioning to a new section
        inList = false;
      }
      html += `<p>${line}</p>`;
    }
  }

  if (inList) html += "</ul>"; // Ensure the list is closed at the end

  return html;
};
