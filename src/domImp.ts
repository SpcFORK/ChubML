import eobj from './eobj';

class CowHTMLDocCtx {
  constructor(
    public document: Document,
    public documentElement: HTMLElement = document.documentElement
  ) { }

  args = []
  init(...html: string[]) {
    this.document.open(...this.args)
    this.document.write(...html)
    this.document.close()
  }

  initScripts(element = this.document) {
    let scripts = Array.from(element.scripts)
    scripts.forEach(s => {
      let newNode = document.createElement('script')
      for (let attr of s.attributes) newNode.setAttribute(attr.name, attr.value)
      newNode.textContent = s.textContent
      document.body.appendChild(newNode)
    })
    return scripts
  }

  static d = globalThis.document?.implementation
  static makeStaticPage = function(docName: string | undefined) {
    if (!CowHTMLDocCtx.d) throw new Error('No document implementation')
    let doc = CowHTMLDocCtx.d.createHTMLDocument(docName)
    return new CowHTMLDocCtx(doc)
  }

  static writePageToPage(page: CowHTMLDocCtx) {
    let pe = page.document.documentElement;
    let ce = document.documentElement;
    ce.replaceWith(pe)
  }

  static manualWrite = function(...html: string[]) {
    let docName
    if (new.target) [docName, ...html] = html
    let doc = CowHTMLDocCtx.makeStaticPage(docName)
    doc.init(...html)
    doc.initScripts()
    CowHTMLDocCtx.writePageToPage(doc)
    return doc
  }
}

class CowXMLDocCtx {
  static d = globalThis.document?.implementation
  static makeDoc(namespace: string | null, qualifiedName: string | null, doctype: DocumentType | null | undefined) {
    if (!this.d) throw new Error('No document implementation')
    let de = this.d.createDocument(namespace, qualifiedName, doctype);
    return new CowXMLDocCtx(de)
  }

  document: XMLDocument
  constructor(d: XMLDocument) {
    this.document = d
  }

  addElement(tagName: any, attributes: Record<string, any> = {}) {
    let element = this.document.createElement(tagName);
    for (let attr in attributes)
      element.setAttribute(attr, attributes[attr]);
    this.document.appendChild(element);
    return element;
  }

  getElementsByTagName(tagName: any) {
    return this.document.getElementsByTagName(tagName);
  }

  serialize() {
    let serializer = new XMLSerializer();
    return serializer.serializeToString(this.document);
  }

  treewalk(callback: (node: Node, tw: TreeWalker) => {}, filter = NodeFilter.SHOW_ALL) {
    let walker = document.createTreeWalker(this.document, filter);
    let node;
    while (node = walker.nextNode())
      callback(node, walker);
  }
}

/**
--- SpcFORK ---
••¡¡¡¡••••ïï++••¡¡¡¡••••ïï++••¦¦¬¬||||¡¡¡¡¯¯¯¯ªª÷÷¯¯\\||{{••••••ïï••††\\¬¬¦¦¦¦}}
ïï++••¡¡¬¬{{••ïï++••¡¡¬¬{{••ïï++¡¡((¡¡¡¡¯¯¯¯ªªªª))))÷÷¯¯\\||||||{{ïï••††\\¬¬¦¦¦¦
{{••ïï++¬¬||||{{••ïï++¬¬||||{{••ïï¬¬¡¡¯¯¯¯ªªªª))))••ii))÷÷¯¯¯¯¯¯\\{{ïï••††\\¬¬¦¦
\\||{{••ïï((¡¡\\||{{••ïï((¡¡\\||{{••((¬¬ªªªª))))••••¬¬¬¬ii))))))÷÷\\{{ïï••††\\¬¬
¯¯¯¯\\||{{¬¬¡¡¯¯¯¯\\||{{¬¬¡¡¯¯¯¯\\||¬¬¡¡ªª))))••••¬¬¬¬¡¡\\¬¬¬¬¬¬ii÷÷\\{{ïï••††\\
¬¬ªª÷÷¯¯\\||((¬¬ªª÷÷¯¯\\||((¬¬ªª÷÷¯¯\\||¬¬””••••¬¬¬¬¡¡¡¡¦¦¦¦¦¦¦¦\\ii÷÷\\{{ïï••††
¡¡ªª))))÷÷¯¯\\¡¡ªª))))÷÷¯¯\\¡¡ªª))))÷÷¯¯¡¡ªª••¬¬¬¬¡¡¡¡¦¦¦¦cccc^^÷÷\\ii÷÷\\{{ïï••
||¬¬””••ii))÷÷¯¯¯¯””••ii))÷÷¯¯¯¯””••ii))÷÷¯¯””{{¡¡¡¡¦¦¦¦ccccÙÙcc^^÷÷\\ii÷÷\\{{ïï
¯¯¡¡ªª••¬¬¬¬ii))))))••¬¬¬¬ii))))))••¬¬¬¬ii))))••¡¡¦¦¦¦ccccÿÿÙÙÿÿcc^^÷÷\\ii÷÷\\{{
ªª÷÷¯¯””{{¡¡\\¬¬¬¬¬¬ii{{¡¡\\¬¬¬¬¬¬ii{{¡¡\\¬¬¬¬¬¬¬¬¬¬ccccððððÙÙññÙÙcc^^¦¦¬¬))¯¯||
ªª))))ªª••¡¡¦¦¦¦¦¦¦¦\\••¡¡¦¦¦¦¦¦¦¦\\¬¬¡¡¦¦¦¦¦¦¦¦¦¦¦¦¾¾ððððÙÙððÙÙññÙÙcc¦¦¬¬))¯¯||
))))••ii)){{¬¬cccc^^¦¦\\¬¬¬¬cccc^^¦¦¦¦¦¦¦¦cccc^^¦¦cccccccccccccccccccc¦¦¬¬))¯¯||
””••••¬¬¬¬••¡¡¾¾ððcc÷÷¦¦¦¦¦¦¾¾ððcc¦¦¬¬cccc¾¾ððcc÷÷¾¾ððððððððððððððððcc¦¦¬¬))¯¯||
ªª••¬¬¬¬¡¡\\¡¡¾¾ððccccccccccccððcc÷÷¦¦¾¾ððccððccccccððððððððððððððððcc¦¦¬¬))¯¯||
¬¬””{{¡¡¡¡¦¦¦¦¾¾ððððccððððccððððccccccccccccccccððððððððcc¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬))¯¯||
¡¡ªª••¡¡¦¦¦¦ccccccððððððððððððcccc¾¾ððððððccððccððððððððcc¦¦¡¡¡¡¡¡¡¡¬¬¦¦\\ii÷÷\\
((¬¬””{{¬¬ccccððððððððððððððððððððccccccccccððccððððcc¾¾cc¦¦¬¬••••••{{¡¡¡¡¬¬))¯¯
¬¬¡¡ªª••¡¡¾¾ððcc¾¾ððccððððccððcc¾¾ððccððððccððccððððcccc^^¦¦\\¬¬¬¬ii””••{{¬¬ii÷÷
¡¡((¬¬””{{¬¬¾¾cc¦¦¾¾cccccccccccc^^ccccccððccððccððððððððcc÷÷¦¦¦¦¦¦\\iiªª””••••))
}}¡¡((¬¬””{{¡¡¬¬¦¦ccccððððcc¾¾ððccccððððccccððccððððððððcccccccc^^¦¦\\ii÷÷ªª””))
ïï}}¡¡((¬¬””••{{¬¬¾¾ððððððððccccððððccccððccððcc¾¾¾¾ððððððððððððcc÷÷¦¦\\ii÷÷¬¬ªª
//ïï}}¡¡((¬¬””••¡¡¾¾ððððððððccððccccððððccccððcc¦¦¾¾ððððððððððððcccc^^¦¦¬¬))¯¯¡¡
||++««¦¦¬¬¡¡ªª••¡¡ccccððððccccccððððccccððððcccc¦¦¬¬¾¾¾¾¾¾¾¾ððððððððcc¦¦¬¬))¯¯||
||++««¦¦¬¬¡¡ªª••¡¡¾¾ððððððððccððcc¾¾ððððcc¾¾cc¦¦÷÷¦¦¦¦¦¦¦¦¾¾ððððððððcc¦¦¬¬))¯¯||
¡¡//ïï}}¡¡((¬¬””{{¬¬¾¾¾¾cccccccccccc¾¾¾¾cc÷÷¦¦÷÷¦¦cccc^^cccc¾¾¾¾ððððcc¦¦¬¬))¯¯||
««¡¡//ïï}}¡¡((¬¬””{{¡¡¬¬¾¾ððccððccððcc÷÷¦¦cccccc^^¾¾ððcc¾¾ððcc¾¾ððððcc¦¦¬¬))¯¯||
ii««¡¡//ïï}}¡¡((¬¬””{{¡¡¾¾ððccððccððcccc^^¾¾ððððcccc¾¾cccc¾¾cc¾¾ððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððððððððððcc¾¾ððððccððccccððccccccððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððcccccccccc¾¾ððððcc¾¾ððððccccððððððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððððððððððcc¾¾ððððccccccccccccððððððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððcccccccccccccc¦¦¾¾¾¾ððððððððððððððððcc¾¾cc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððððððððððððððcc¦¦¬¬¾¾ððððððððððððððððcc¦¦¬¬¦¦\\ii÷÷\\
ïïii««¡¡//ïï}}¡¡((¬¬””{{¬¬¾¾¾¾¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬¬¬¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬¡¡¡¡¬¬))¯¯
——ïïii««¡¡//ïï}}¡¡((¬¬””{{¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬¦¦\\{{¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬¦¦\\••{{¬¬ii÷÷
————ïïii««¡¡//ïï}}¡¡((¬¬””••••••••••••••{{¡¡¡¡¬¬••••••••••••••••{{¡¡¡¡¬¬))••••))
——————ïïii««¡¡//ïï}}¡¡((¬¬ªªªªªªªªªªªªªª””••{{¬¬iiªªªªªªªªªªªªªª””••{{¬¬iiªª””))
————————ïïii««¡¡//ïï}}¡¡((¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬ªª””••••))¯¯¡¡¡¡¡¡¡¡¡¡¬¬ªª””••••))¯¯ªª
——————————ïïii««¡¡//ïï}}¡¡¬¬¬¬¬¬¬¬¬¬¬¬¬¬((¡¡¬¬ªª””))÷÷\\¬¬¬¬¬¬¬¬((¡¡¬¬ªª””))÷÷¡¡
————————————ïïii««¡¡//ïï}}¦¦¦¦¦¦¦¦¦¦¦¦¦¦¡¡¬¬((¡¡¬¬ªªªª¯¯||••++¦¦¡¡¬¬((¡¡¬¬ªªªª¯¯
——————————————ïïii««¡¡//ïï««««««««««««««}}¦¦¡¡¬¬((¡¡¬¬¯¯\\{{ïï••}}¦¦¡¡¬¬((¡¡¬¬¯¯
*/
export default {
  CowHTMLDocCtx: eobj(CowHTMLDocCtx).default,
  CowXMLDocCtx: eobj(CowXMLDocCtx).default
}