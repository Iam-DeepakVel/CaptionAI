import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeSerialNumbersAndQuotes(inputString: string): string {
  // Split the input string by newline character "\n"
  const captionsArray = inputString.split('\n');

  // Initialize an empty array to store the cleaned captions
  const cleanedCaptions = [];

  // Iterate through each caption
  for (const caption of captionsArray) {
    // Use regular expressions to remove serial numbers and double quotes
    const cleanedCaption = caption.replace(/^\d+\.\s+|"/g, '');

    // Add the cleaned caption to the array
    cleanedCaptions.push(cleanedCaption);
  }

  // Join the cleaned captions using "\n" as the separator
  return cleanedCaptions.join('\n');
}
