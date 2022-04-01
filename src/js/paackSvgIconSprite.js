import { readFileSync } from 'fs';

const svg = readFileSync('./dist/icons-sprite.svg', 'utf-8');

class PaackSvgIconSprite extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.innerHTML = svg;
  }
}

window.customElements.define('paack-svg-icon-sprite', PaackSvgIconSprite);
