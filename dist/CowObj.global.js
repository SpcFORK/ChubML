"use strict";
(() => {
  // src/CowObj.ts
  var CowObj = class {
    SJSON() {
      return JSON.stringify(this);
    }
    toJSON() {
      return {
        ...this,
        __methods: this.extractMethods()
      };
    }
    extractMethods() {
      const methods = {};
      for (const key in this)
        if (typeof this[key] === "function")
          methods[key] = String(this[key]);
      return methods;
    }
  };
})();
//# sourceMappingURL=CowObj.global.js.map