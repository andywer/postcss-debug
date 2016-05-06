import h from 'hyperscript'
import hyperx from 'hyperx'

export const html = hyperx(h)

/**
 * Use like: mount(html`<div>test</div>`, document.querySelector('.my-component'))
 */
export function mount (domFragmentObject, node) {
  removeAllChildren(node)
  node.appendChild(domFragmentObject)
}

function removeAllChildren (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
