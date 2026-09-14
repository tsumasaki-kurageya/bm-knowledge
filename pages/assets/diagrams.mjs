// Keep Markdown visible if the renderer cannot load or a diagram is invalid.
const diagrams = document.querySelectorAll('pre.mermaid');
if (diagrams.length) {
  try {
    const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs');
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
    for (const [index, node] of [...diagrams].entries()) {
      const source = node.textContent;
      try {
        const { svg } = await mermaid.render(`review-diagram-${index}`, source);
        node.innerHTML = svg;
        node.setAttribute('aria-label', '業務関係図');
        node.setAttribute('tabindex', '0');
      } catch (error) {
        node.textContent = source;
        console.error('Diagram rendering failed', error);
      }
    }
  } catch (error) {
    const notice = document.createElement('p');
    notice.className = 'diagram-error';
    notice.textContent = '図を読み込めませんでした。図の定義を表示しています。';
    diagrams[0].before(notice);
    console.error('Diagram module unavailable', error);
  }
}
