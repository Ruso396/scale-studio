export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function maskText(text: string): string {
  if (text.length <= 2) return "••";
  return text[0] + "•".repeat(Math.min(text.length - 2, 8)) + text[text.length - 1];
}

export function blurPhone(phone: string): string {
  if (phone.length < 4) return "••••••••••";
  return phone.slice(0, 2) + "•••••" + phone.slice(-3);
}
