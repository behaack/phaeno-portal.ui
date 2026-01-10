export function prettifyName(title: string): string {
  const spaced = title
    // Replace underscores and hyphens with spaces first
    .replace(/[_-]+/g, ' ')
    // Insert spaces between camelCase or PascalCase words
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    // Replace "Count" or "Number" with "#"
    // .replace(/\b(Count|Number)\b/gi, '#')
    // Normalize multiple spaces
    .replace(/\s+/g, ' ')
    .trim()

  return spaced
}

export function toRows(results: unknown): any[] {
  return Array.isArray(results) ? results : []
}

export function toMetric(results: unknown): { value: number | string; label?: string } | null {
  if (!results || typeof results !== 'object') return null
  const r = results as any
  if ('value' in r) return { value: r.value, label: r.label }
  return null
}
