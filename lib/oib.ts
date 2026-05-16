/**
 * Validate a Croatian OIB using ISO 7064 MOD 11,10.
 * The 11th digit is the check digit computed from the first 10.
 * Returns true only for an 11-digit string whose check digit matches.
 */
export function validateOib(oib: string): boolean {
  const cleaned = oib.replace(/\s+/g, "");
  if (!/^\d{11}$/.test(cleaned)) return false;
  let a = 10;
  for (let i = 0; i < 10; i++) {
    a = a + Number(cleaned[i]);
    a = a % 10;
    if (a === 0) a = 10;
    a = (a * 2) % 11;
  }
  const check = (11 - a) % 10;
  return check === Number(cleaned[10]);
}

/** Type guard variant for use in form schemas. */
export function isValidOib(value: unknown): value is string {
  return typeof value === "string" && validateOib(value);
}
