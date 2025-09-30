import prettier from 'prettier';

export const formatHtmlWithPrettier = (html: string): Promise<string> =>
  prettier.format(html, {
    parser: 'html',
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    printWidth: 80,
  });
