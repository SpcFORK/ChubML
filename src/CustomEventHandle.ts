import cst from './cst';
const { chaosGl } = cst;

import eobj from './eobj';

class CustomEventHandle {
  #globalBus = [] as Function[];

  #setHandle = (e: Function) => {
    this.#globalBus.push(e);
  };

  #removeHandler = (e: Function) => this.#globalBus.splice(this.#globalBus.indexOf(e), 1);

  #clearHandler = () => this.#globalBus = [];

  #addHandler = (e: Function) => this.#globalBus.push(e);

  private = false
  #getHandle = () => ({
    event: this.event,

    globals: this.#globalBus,
    remove: this.#removeHandler,
    clear: this.#clearHandler,
    add: this.#addHandler,
    _: () => !this.private ? this : null,

    [Symbol.toStringTag]: 'CustomEventHandle'
  });

  #makeHandle = (name: string): PropertyDescriptor => ({
    set: this.#setHandle,
    get: this.#getHandle
  });

  #activateGlobalSets = () =>
    Object.defineProperty(chaosGl, this.event, this.#makeHandle(this.event));

  #init() {
    this.#activateGlobalSets();
  }

  get detail() {
    return Reflect.has(this.#e, 'detail') ? (this.#e as CustomEvent).detail : null;
  }
  set detail(value) {
    this.makeEvent(this.event, value)
  }

  #e: CustomEvent | Event;
  #_E = globalThis.CustomEvent ?  CustomEvent : Event;

  makeEvent(name: string, detail: { detail?: unknown } & Record<string, unknown> = {}) {
    return this.#e = new this.#_E(name, { detail })
  }

  activate() {
    for (const cb of this.#globalBus) cb(this.#e);
    dispatchEvent(this.#e)
  }
  
  constructor(
    public event: string,
  ) {
    this.#e = new this.#_E(event);
    this.#init();
  }
}

export default eobj(CustomEventHandle).default;