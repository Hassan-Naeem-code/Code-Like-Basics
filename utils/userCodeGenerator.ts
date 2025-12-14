/**
 * Generates a unique 8-character code for user identification
 * Format: XXXX-XXXX (alphanumeric, uppercase)
 */
export function generateUniqueCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''

  for (let i = 0; i < 8; i++) {
    if (i === 4) {
      code += '-'
    }
    const randomIndex = Math.floor(Math.random() * chars.length)
    code += chars[randomIndex]
  }

  return code
}

/**
 * Validates if a code matches the expected format
 */
export function validateCodeFormat(code: string): boolean {
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/
  return pattern.test(code)
}

/**
 * Formats a code to ensure proper casing and format
 */
export function formatCode(code: string): string {
  return code.toUpperCase().trim()
}
