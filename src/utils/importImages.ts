// src/utils/importImages.ts
const images = import.meta.glob('../assets/images/*.{jpg,png}', { eager: true });

const getImagePath = (relativePath: string): string | undefined => {
  const path = `../assets/${relativePath}`;
  console.log(`Resolving path: ${path}`);  // Debugging log
  const resolvedPath = images[path] as string | undefined;
  if (!resolvedPath) {
    console.error(`Image not found for path: ${path}`);  // Error log
  }
  return resolvedPath;
};

export default getImagePath;
