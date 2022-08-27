/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    PACKAGE_VERSION: string;
    BASE_PATH: string;
    CANONICAL_URL: string;
  }
}
