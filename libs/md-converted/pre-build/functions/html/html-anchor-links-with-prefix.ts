export const htmlAnchorLinksWithPrefix = (document: string, prefix = '') =>
  document.replaceAll(/<a href="#/g, `<a href="${prefix}#`);
