export const highlightText = (text: string | undefined, highlight: string): string => {
  if (!text) return ""
  if (!highlight.trim()) {
    return text
  }

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escapedHighlight})`, "gi")

  return text.replace(regex, "<mark>$1</mark>")
}
