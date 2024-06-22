export class CowErr extends Error {
  constructor(message: string | (string | undefined)[], ext?: string) {
    super(Array.isArray(message) ? message.join('\n') : message);

    this.name = "CowErr"
      + (ext ? ` (${ext})` : "");
  }

  toss = (...params: any[]) => console.error(this, ...params);

  throw() {
    throw this;
  }
}