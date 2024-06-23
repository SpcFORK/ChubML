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
}
export interface SortedCILE extends CILElement {
  children: SortedCILE[];
  o?: ChubNode;
}
export type CILEList = CILElement[];
type SortedCIL = SortedCILE[];
