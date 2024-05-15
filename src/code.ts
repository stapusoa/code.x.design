import '../dist/styles.css';

const width = 450;
const height = 600;

figma.showUI(__html__, { themeColors: true, width, height });

figma.ui.onmessage = async (msg: { type: string, componentType?: string, text?: string, backgroundColor?: { r: number, g: number, b: number } }) => {
  const nodes: SceneNode[] = [];

  try {
    switch (msg.type) {
      case 'create':
        handleCreate(msg, nodes);
        break;
      case 'cancel':
        figma.closePlugin();
        break;
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

async function handleCreate(msg: { componentType?: string, text?: string, backgroundColor?: { r: number, g: number, b: number } }, nodes: SceneNode[]) {
  console.log("Received message for creation:", msg); 

  if (!msg.componentType) {
    console.error("componentType is undefined");
    return;
  }

  let newNode: SceneNode | null = null;

  switch (msg.componentType) {
    case 'text':
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
      break;
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
    case 'button':
      if (!msg.text || !msg.backgroundColor) {
        console.error("Button properties missing: Text =", msg.text, "Background Color =", msg.backgroundColor);
        return; // Return here ensures no further action if properties are missing
      }
      newNode = await createButton(msg.text, msg.backgroundColor);
      break;
    default:
      console.error("Unsupported component type");
      return; // Handle unexpected componentType
  }

  if (newNode) {
    console.log("Appending new node to the page:", newNode);
    figma.currentPage.appendChild(newNode);
    nodes.push(newNode);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
}

async function loadFont(family: string, style: string) {
  const fontName = { family, style };
  const fonts = await figma.listAvailableFontsAsync();  // Correctly use the async function with await
  if (!fonts.some(font => font.fontName.family === family && font.fontName.style === style)) {
    await figma.loadFontAsync(fontName);
  }
}


function createText(text: string, fontSize: number): TextNode {
  let textNode = figma.createText();
  try {
    textNode.characters = text;
    textNode.fontSize = fontSize;
  } catch (error) {
    console.error("Failed to create text node:", error);
  }
  return textNode;
}


function createShape(type: 'rectangle' | 'ellipse', props: { width: number, height: number, color: { r: number, g: number, b: number } }): RectangleNode | EllipseNode {
  let shape: RectangleNode | EllipseNode;
  if (type === 'rectangle') {
    shape = figma.createRectangle();
  } else {
    shape = figma.createEllipse();
  }
  shape.resize(props.width, props.height);
  shape.fills = [{ type: 'SOLID', color: props.color }];
  return shape;
}

async function createButton(text: string, backgroundColor: { r: number, g: number, b: number }): Promise<FrameNode> {
  let button = figma.createFrame();
  button.resize(200, 50);
  button.cornerRadius = 4;
  button.fills = [{ type: 'SOLID', color: backgroundColor }];

  await loadFont("Roboto", "Regular"); // Ensure font is loaded before setting text
  let textNode = createText(text, 16);
  textNode.textAlignHorizontal = 'CENTER';
  textNode.textAlignVertical = 'CENTER';
  button.appendChild(textNode);

  // Calculate position to center the text within the button
  textNode.x = (button.width - textNode.width) / 2;
  textNode.y = (button.height - textNode.height) / 2;
  textNode.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };

  return button; // Return the fully configured FrameNode
}

