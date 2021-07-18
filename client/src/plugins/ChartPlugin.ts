import chart from "chart.js";

export default {
  install: (app: any, options: any) => {
    app.provide("$_chart", chart);
  },
};
