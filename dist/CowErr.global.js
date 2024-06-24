"use strict";(()=>{var t=class extends Error{constructor(r,n){super(Array.isArray(r)?r.join(`
`):r),this.name="CowErr"+(n?` (${n})`:"")}toss=(...r)=>console.error(this,...r);throw(){throw this}};})();
//# sourceMappingURL=CowErr.global.js.map