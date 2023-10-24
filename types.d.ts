/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GITHUB_PAGES: 'TRUE' | 'FALSE';
    PACKAGE_NAME: 'mantine-datatable';
    PACKAGE_VERSION: string;
    INITIAL_NPM_DOWNLOADS: string;
  }
}
