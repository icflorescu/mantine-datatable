/** biome-ignore-all lint/correctness/noUnusedVariables: This is a declaration file */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GITHUB_PAGES: 'TRUE' | 'FALSE';
    PACKAGE_NAME: 'mantine-datatable';
    PACKAGE_VERSION: string;
    INITIAL_NPM_DOWNLOADS: string;
  }
}
