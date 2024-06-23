import * as cmld from '../dist/cml.js';

declare global {
  interface Window {
    ChubML: cmld.ChubMLMod;
  }
}