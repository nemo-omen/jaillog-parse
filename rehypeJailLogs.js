import { visit } from "unist-util-visit";

export default function rehypeJailLogs() {
  return (tree, file) => {
    visit(tree, 'element', (node, index, parent) => {
      if(node.tagName === 'div' && node.properties.className) {
        const className = node.properties.className;
        if(className.includes('x_data-item') && node.children[0].value.split('')[0] != '$') {
          console.log(node.children[0]);
        }
      }
    });
  };
}