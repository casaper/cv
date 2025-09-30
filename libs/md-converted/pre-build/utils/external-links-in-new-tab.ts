export const anchorLinksWithPrefix = (document: string, prefix = '') =>
  document.replaceAll(/<a href="#/g, `<a href="${prefix}#`);

export const externalLinksInNewTab = (document: string) =>
  document.replaceAll(
    /<a href="http/g, // external links open in new tab
    '<a target="_blank" rel="noopener noreferrer" href="http'
  );
