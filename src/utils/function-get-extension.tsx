export const getExtension = (filename: string = '') => {
  const parts = filename.split('.');
  return parts.length > 1 ? '.' + parts.pop() : '';
}