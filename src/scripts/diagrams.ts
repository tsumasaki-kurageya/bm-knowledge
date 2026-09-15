async function renderDiagrams() {
  const nodes = [...document.querySelectorAll<HTMLElement>('pre.mermaid:not([data-rendered])')];
  if (!nodes.length) return;
  try {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
    await document.fonts.ready;
    for (const [index, node] of nodes.entries()) {
      const source = node.textContent ?? '';
      try {
        const { svg } = await mermaid.render(`review-diagram-${index}`, source);
        node.innerHTML = svg;
        node.dataset.rendered = 'true';
        node.setAttribute('aria-label', '業務関係図');
        node.tabIndex = 0;
      } catch (error) {
        node.textContent = source;
        node.dataset.error = 'true';
        console.error('Diagram rendering failed', error);
      }
    }
  } catch (error) {
    const notice = document.createElement('p');
    notice.textContent = '図を読み込めませんでした。図の定義を表示しています。';
    nodes[0].before(notice);
    console.error('Diagram module unavailable', error);
  }
}
void renderDiagrams();
