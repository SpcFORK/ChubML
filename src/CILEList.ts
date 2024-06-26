interface CILElement {
  c: string;
  i: string | number;
}
export interface ChubNode {
  tag: string;
  id: string;
  class: string;
  content: string;
  data: string;
  style: string;
  attr: string;
  indent: number;
  [Symbol.unscopables]: {
    _: SortedCILE | null,
    atBucket: string[]
  }
}
export interface SortedCILE extends CILElement {
  parent: SortedCILE | null;
  children: SortedCILE[];
  o?: ChubNode;
}
export type CILEList = CILElement[];
export type SortedCIL = SortedCILE[];
