declare module "busboy" {
  import { IncomingHttpHeaders } from "http";

  interface BusboyConfig {
    headers: IncomingHttpHeaders;
  }

  class Busboy {
    constructor(options: BusboyConfig);
    on(event: string, callback: (...args: any[]) => void): this;
    end(): void;
  }

  export = Busboy;
}
