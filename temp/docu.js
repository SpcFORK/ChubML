class ScriptDocumenter {
  constructor() {
    this.functions = new Map();
  }

  addFunction(name, func, description = null) {
    this.functions.set(name, { func, description });
  }

  async generateDocumentation() {
    const scriptUrl = window.location.href;
    const scriptSource = await this.fetchScriptSource(scriptUrl);
    this.extractFunctionsFromSource(scriptSource);
    this.generateFunctionDocumentation();
  }

  async fetchScriptSource(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  }

  extractFunctionsFromSource(source) {
    const functionRegex = /function\s+(\w+)\s*\((.*?)\)\s*\{/g;
    let match;
    while ((match = functionRegex.exec(source)) !== null) {
      const [matchStr, name, params] = match;
      const func = new Function(params, matchStr.slice(matchStr.indexOf("{") + 1, -1));
      this.addFunction(name, func);
    }
  }

  generateFunctionDocumentation() {
    for (const [name, { func }] of this.functions.entries()) {
      const docString = this.generateFunctionDocString(func);
      console.log(`/**\n${docString} */`);
    }
  }

  generateFunctionDocString(func) {
    const source = func.toString();
    const params = this.getParamNames(source);
    const paramText = this.generateParamText(params);
    const returnType = this.getReturnType(source);
    return ` * @param {${params.join(", ")}}\n * @returns ${returnType}\n */\n${source}`;
  }

  getParamNames(source) {
    const match = source.match(/\((.*?)\)/);
    if (!match) {
      return [];
    }
    return match[1].split(",").map((param) => param.trim());
  }

  generateParamText(params) {
    return params
      .map((param) => ` * @param {${typeof param}} ${param} - TODO: add description for ${param}.`)
      .join("\n");
  }

  getReturnType(source) {
    const match = source.match(/=>\s*(.*?)\s*{/);
    return match ? match[1] : "void";
  }

  async saveDocumentationToFile(filename) {
    const docString = await this.generateDocumentation();
    const blob = new Blob([docString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  }
}

class FunctionDocumenter {
  constructor() {
    this.functions = new Map();
  }

  addFunction(name, func, description = null) {
    this.functions.set(name, { func, description });
  }

  generateDocumentation() {
    let build = []
    for (const [name, { func, description }] of this.functions.entries()) {
      const docString = this.generateFunctionDocString(func);
      const built = description ? `/** ${description}\n${docString} */` : docString
      console.log(built);

      build.push(built);
    }

    return build.join("\n\n\n")
  }

  generateFunctionDocString(func) {
    const source = func.toString();
    const params = this.getParamNames(source);

    const paramText = this.generateParamText(params);
    const returnType = this.getReturnType(source);

    return `function ${func.name}(${params.join(", ")}) {\n${paramText}\n  ...\n  @returns ${returnType}\n}`;
  }

  getParamNames(source) {
    const match = source.match(/\((.*?)\)/);
    if (!match) {
      return [];
    }

    return match[1].split(",").map((param) => param.trim());
  }

  generateParamText(params) {
    return params
      .map(
        (param) => `* @param {${typeof param}} ${param} - TODO: add description for ${param}.`
      )
      .join("\n");
  }

  getReturnType(source) {
    const match = source.match(/=>\s*(.*?)\s*{/);

    return match
      ? match[1]
      : "void";
  }
}
