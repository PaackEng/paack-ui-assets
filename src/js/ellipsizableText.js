const template = Object.assign(document.createElement('template'), {
  innerHTML: `
      <style>
        .text {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
        }
  
        .text--overflown {
          cursor: pointer;
        }
  
        .tooltip {
          outline: 0;
          position: fixed;
          top: calc(100% + 8px);
          display: block;
          z-index: 1;
          background: rgba(228, 228, 228);
          border-radius: 8px;
          box-sizing: content-box;
          left: -12px;
          opacity: 0;
          clip: rect(0, 0, 0, 0);
          word-break: break-all;
          pointer-events: none;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.2px;
          color: #0E1420;
        }
  
        .tooltip::before {
          content: '';
          height: 0;
          width: 0;
          border: 8px solid transparent;
          border-bottom-color: rgba(228, 228, 228);
          position: absolute;
          top: -16px;
          right: 32px;
        }
  
        .tooltip::after {
          content: '';
          height: 8px;
          width: 100%;
          position: absolute;
          top: -8px;
          right: 0;
          background: transparent;
        }

        .tooltip.show {
          opacity: 1;
          width: 100%;
          padding: 8px 16px;
          clip: auto;
        }
      </style>
        <span class="text"></span>
    `,
});

const runDelayed = window.requestIdleCallback || window.requestAnimationFrame;

class EllipsizableText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const { textContent } = this;

    const text = this.shadowRoot.querySelector('.text');

    text.textContent = textContent;

    runDelayed(() => {
      if (text.offsetWidth < text.scrollWidth) {
        text.setAttribute('tabIndex', 0);
        text.classList.add('text--overflown');

        const tooltip = text.cloneNode(true);

        tooltip.setAttribute('tabIndex', 0);
        tooltip.className = 'tooltip';

        text.addEventListener('mouseenter', () => {
          tooltip.classList.add('show');

          const bounds = text.getBoundingClientRect();
          tooltip.style.top = `${bounds.top + bounds.height}px`;
          tooltip.style.left = `${bounds.left}px`;
          tooltip.style.width = `${bounds.width}px`;
        });

        text.addEventListener('mouseleave', () => tooltip.classList.remove('show'));

        this.shadowRoot.appendChild(tooltip);
      }
    });
  }
}

window.customElements.define('ellipsizable-text', EllipsizableText);
