export function flattenBookmarks(bookmarks) {
  let flattened = {};
  for (let label in bookmarks) {
    flattened = {
      ...flattened,
      ...bookmarks[label]
    };
  }
  return flattened;
}
