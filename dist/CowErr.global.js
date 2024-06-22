"use strict";
(() => {
  // src/CowErr.ts
  var CowErr = class extends Error {
    constructor(message, ext) {
      super(Array.isArray(message) ? message.join("\n") : message);
      this.name = "CowErr" + (ext ? ` (${ext})` : "");
    }
    toss = (...params) => console.error(this, ...params);
    throw() {
      throw this;
    }
  };
})();
//# sourceMappingURL=CowErr.global.js.map