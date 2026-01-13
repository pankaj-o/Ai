export interface AnswerCheckOptions {
  trimWhitespace?: boolean;
  caseSensitive?: boolean;
  ignoreExtraSpaces?: boolean;
  ignorePunctuation?: boolean;
}

export interface AnswerCheckResult {
  isCorrect: boolean;
  normalizedUser: string;
  normalizedCorrect: string;
}

/**
 * Normalizes a string based on the provided options
 */
function normalizeString(
  str: string,
  options: AnswerCheckOptions
): string {
  let normalized = str;

  // Trim whitespace
  if (options.trimWhitespace !== false) {
    normalized = normalized.trim();
  }

  // Case sensitivity
  if (!options.caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  // Ignore extra spaces (collapse multiple spaces to single space)
  if (options.ignoreExtraSpaces) {
    normalized = normalized.replace(/\s+/g, ' ');
  }

  // Ignore punctuation
  if (options.ignorePunctuation) {
    // Remove common punctuation marks
    normalized = normalized.replace(/[.,!?;:'"()\[\]{}\-_]/g, '');
  }

  return normalized;
}

/**
 * Checks if a user's answer matches the correct answer
 * @param userInput - The user's typed answer
 * @param correctAnswer - The correct answer
 * @param options - Checking options
 * @returns Result with correctness and normalized strings
 */
export function checkAnswer(
  userInput: string,
  correctAnswer: string,
  options: AnswerCheckOptions = {}
): AnswerCheckResult {
  // Default options
  const opts: Required<AnswerCheckOptions> = {
    trimWhitespace: options.trimWhitespace !== false,
    caseSensitive: options.caseSensitive || false,
    ignoreExtraSpaces: options.ignoreExtraSpaces || false,
    ignorePunctuation: options.ignorePunctuation || false,
  };

  const normalizedUser = normalizeString(userInput, opts);
  const normalizedCorrect = normalizeString(correctAnswer, opts);

  const isCorrect = normalizedUser === normalizedCorrect;

  return {
    isCorrect,
    normalizedUser,
    normalizedCorrect,
  };
}
