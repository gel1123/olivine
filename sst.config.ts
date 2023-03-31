import { SSTConfig } from "sst";
import { API, Site } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "olivine",
      region: "ap-northeast-1",
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(Site);
  }
} satisfies SSTConfig;
