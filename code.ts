const width = 300;
const height = 200;

figma.showUI(__html__, { width, height });

figma.ui.onmessage = async (msg: {type: string, componentType?: string }) => {

  if (msg.type === 'create') {
    const nodes: SceneNode[] = [];
    let newNode: SceneNode | null = null;

    if (msg.componentType === 'text') {
      // Load the font asynchronously before creating the text node
      await figma.loadFontAsync({ family: "Roboto", style: "Bold" })
        .then(() => {
          newNode = figma.createText();
          newNode.characters = "Hello, Figma!";
          newNode.fontSize = 24;
          figma.currentPage.appendChild(newNode);
          nodes.push(newNode);
          figma.currentPage.selection = nodes;
          figma.viewport.scrollAndZoomIntoView(nodes);
        })
        .catch(error => {
          console.error("Failed to load font:", error);
          // Handle the error, perhaps notify the user via UI
        });
    } else {
      // For non-text components, proceed without font loading
      switch (msg.componentType) {
        case 'rectangle':
          newNode = figma.createRectangle();
          newNode.resize(150, 100);
          newNode.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.75, b: 0.5 } }];
          break;
        case 'circle':
          newNode = figma.createEllipse();
          newNode.resize(100, 100);
          newNode.fills = [{ type: 'SOLID', color: { r: 0.25, g: 0.25, b: 0.75 } }];
          break;
      }
      if (newNode !== null) {
          figma.currentPage.appendChild(newNode);
          nodes.push(newNode);
          figma.currentPage.selection = nodes;
          figma.viewport.scrollAndZoomIntoView(nodes);
      }
    }
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
