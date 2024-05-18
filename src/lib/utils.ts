export function truncateString(str: string, maxLength: number): string {
    // Check if the string length is greater than maxLength
    if (str.length > maxLength) {
        // If yes, truncate the string to the first maxLength characters and append "..."
        return str.substring(0, maxLength) + "...";
    } else {
        // If no, return the original string
        return str;
    }
}