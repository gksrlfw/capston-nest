import axios from "axios";

export default {
  install: (app: any, options: any) => {
    app.provide("$_axios", axios);
  },
};
