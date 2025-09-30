export const htmlExternalLinksInNewTab = (document: string) =>
  document.replaceAll(
    /<a href="http/g, // external links open in new tab
    '<a target="_blank" rel="noopener noreferrer" href="http'
  );
