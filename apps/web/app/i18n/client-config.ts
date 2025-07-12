import { languages } from "./settings";

export function getLanguageFromPath(pathname: string): string {
  const pathLang = pathname.split("/")[1];
  return languages.includes(pathLang as string) ? pathLang : "en";
}

export function createPathWithLang(
  currentPath: string,
  newLang: string
): string {
  if (!currentPath) return `/${newLang}`;

  // Remove any existing language prefix and clean the path
  const pathParts = currentPath.split("/").filter(Boolean);
  const existingLang = languages.includes(pathParts[0] as string)
    ? pathParts[0]
    : null;
  const cleanPath = existingLang
    ? pathParts.slice(1).join("/")
    : pathParts.join("/");

  // Construct new path with new language
  return `/${newLang}${cleanPath ? `/${cleanPath}` : ""}`;
}
