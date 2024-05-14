import '../dist/styles.css';

const width = 450;
const height = 600;

figma.showUI(__html__, { themeColors: true, width, height });

figma.ui.onmessage = async (msg: {type: string, componentType?: string }) => {
  const nodes: SceneNode[] = [];
  let newNode: SceneNode | null = null;

  switch (msg.type) {
    case 'create':
      if (msg.componentType === 'text') {
        // Load the font asynchronously before creating the text node
        try {
          await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
          newNode = figma.createText();
          newNode.characters = "Hello, Figma!";
          newNode.fontSize = 24;
          figma.currentPage.appendChild(newNode);
          nodes.push(newNode);
          figma.currentPage.selection = nodes;
          figma.viewport.scrollAndZoomIntoView(nodes);
        } catch (error) {
          console.error("Failed to load font:", error);
          // Handle the error, perhaps notify the user via UI
        }
      } else {
        // For non-text components, proceed without font loading
        if (msg.componentType === 'rectangle') {
          newNode = figma.createRectangle();
          newNode.resize(150, 100);
          newNode.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.75, b: 0.5 } }];
        } else if (msg.componentType === 'circle') {
          newNode = figma.createEllipse();
          newNode.resize(100, 100);
          newNode.fills = [{ type: 'SOLID', color: { r: 0.25, g: 0.25, b: 0.75 } }];
        }

        if (newNode !== null) {
          figma.currentPage.appendChild(newNode);
          nodes.push(newNode);
          figma.currentPage.selection = nodes;
          figma.viewport.scrollAndZoomIntoView(nodes);
        }
      }
      break;
    case 'cancel':
      figma.closePlugin();
      break;
    // Add more cases as needed based on other messages your UI might send
  }
};
