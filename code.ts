const width = 300;
const height = 200;

figma.showUI(__html__, { width, height });

figma.loadFontAsync({ family: "Roboto", style: "Bold" });

figma.ui.onmessage =  (msg: {type: string, componentType?: string }) => {

  if (msg.type === 'create') {
    const nodes: SceneNode[] = [];
    let newNode: SceneNode | null = null;

    switch (msg.componentType) {
      case 'rectangle':
          newNode = figma.createRectangle();
          newNode.resize(150, 100); // Example size
          newNode.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.75, b: 0.5 } }];
          break;
      case 'circle':
          newNode = figma.createEllipse();
          newNode.resize(100, 100); // Uniform width and height for a circle
          newNode.fills = [{ type: 'SOLID', color: { r: 0.25, g: 0.25, b: 0.75 } }];
          break;
      case 'text':
          newNode = figma.createText();
          newNode.characters = "Hello, Figma!";
          newNode.fontSize = 24;
          break;
  }

  if (newNode !== null) {
      figma.currentPage.appendChild(newNode);
      nodes.push(newNode);
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
  }
} else if (msg.type === 'cancel') {
  figma.closePlugin();
}
};
