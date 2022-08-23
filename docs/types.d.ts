/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    PACKAGE_VERSION: string;
  }
}
