import '../dist/styles.css';
import buttonConfig from '../dist/parsed-button.json';

interface ParsedStyles {
  backgroundColor: { r: number; g: number; b: number };
  textColor: { r: number; g: number; b: number };
  padding: { horizontal: number, vertical: number };
  borderRadius: number;
}

const utilityClassToHex: { [key: string]: string } = {
  'indigo-500': '6366f1',
  'indigo-600': '4f46e5',
  'forest-light': '125E5C',
  'white': 'FFFFFF',
  // Add more mappings as needed
};

const utilityClassToRadius: { [key: string]: number } = {
  'rounded-none': 0,
  'rounded-sm': 2,
  'rounded-md': 4,
  'rounded-lg': 8,
  'rounded-xl': 12,
  // Add more mappings as needed
};

const utilityClassToPadding: { [key: string]: number } = {
  'p-0': 0,
  'p-1': 4,
  'p-2': 8,
  'p-3': 12,
  'p-4': 16,
  'p-5': 20,
  'px-0': 0,
  'px-1': 4,
  'px-2': 8,
  'px-3': 12,
  'px-4': 16,
  'px-5': 20,
  'py-0': 0,
  'py-1': 4,
  'py-2': 8,
  'py-3': 12,
  'py-4': 16,
  'py-5': 20,
  'pb-0': 0,
  'pb-1': 4,
  'pb-2': 8,
  'pb-3': 12,
  'pb-4': 16,
  'pb-5': 20,
  'pr-0': 0,
  'pr-1': 4,
  'pr-2': 8,
  'pr-3': 12,
  'pr-4': 16,
  'pr-5': 20,
  'pl-0': 0,
  'pl-1': 4,
  'pl-2': 8,
  'pl-3': 12,
  'pl-4': 16,
  'pl-5': 20,
  'pt-0': 0,
  'pt-1': 4,
  'pt-2': 8,
  'pt-3': 12,
  'pt-4': 16,
  'pt-5': 20,
  'ps-0': 0,
  'ps-1': 4,
  'ps-2': 8,
  'ps-3': 12,
  'ps-4': 16,
  'ps-5': 20,
  'pe-0': 0,
  'pe-1': 4,
  'pe-2': 8,
  'pe-3': 12,
  'pe-4': 16,
  'pe-5': 20,
};

const buttonHtml: string = buttonConfig["284"];

const width = 450;
const height = 600;

figma.showUI(__html__, { themeColors: true, width, height });

figma.ui.onmessage = async (msg: { type: string, componentType?: string, label?: string }) => {
  console.log("Received message:", msg);
  switch (msg.type) {
    case 'create':
      if (msg.componentType === 'button-des' && msg.label) {
        await createDynamicButton(msg.label, buttonHtml);
      } else {
        console.error("Required parameters for creating button are missing.");
      }
      break;
    case 'cancel':
      figma.closePlugin();
      break;
    default:
      console.error("Unsupported component type", msg.type);
      return;
  }
};

async function createDynamicButton(label: string, tsx: string) {
  const parsedStyles = parseButtonTSX(tsx);
  console.log("Parsed styles:", parsedStyles);

  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });

  const buttonFrame = figma.createFrame();
  configureButtonFrame(buttonFrame, parsedStyles);
  console.log("Button frame created:", buttonFrame);

  const textNode = createTextNode(label, parsedStyles);
  console.log("Text node created:", textNode);
  
  buttonFrame.appendChild(textNode);

  figma.currentPage.appendChild(buttonFrame);
  figma.currentPage.selection = [buttonFrame];
  figma.viewport.scrollAndZoomIntoView([buttonFrame]);
  return buttonFrame;
}

function configureButtonFrame(buttonFrame: FrameNode, parsedStyles: ParsedStyles) {
  buttonFrame.layoutMode = 'HORIZONTAL';
  buttonFrame.primaryAxisAlignItems = 'CENTER';
  buttonFrame.counterAxisAlignItems = 'CENTER';
  buttonFrame.primaryAxisSizingMode = 'AUTO';
  buttonFrame.counterAxisSizingMode = 'AUTO';
  buttonFrame.name = "button";
  buttonFrame.paddingLeft = parsedStyles.padding.horizontal;
  buttonFrame.paddingRight = parsedStyles.padding.horizontal;
  buttonFrame.paddingTop = parsedStyles.padding.vertical;
  buttonFrame.paddingBottom = parsedStyles.padding.vertical;
  buttonFrame.cornerRadius = parsedStyles.borderRadius;
  buttonFrame.fills = [{ type: 'SOLID', color: parsedStyles.backgroundColor }];
}

function createTextNode(label: string, parsedStyles: ParsedStyles): TextNode {
  const textNode = figma.createText();
  textNode.fontName = { family: "Roboto", style: "Bold" };
  textNode.characters = label;
  textNode.fontSize = 16;
  textNode.fills = [{ type: 'SOLID', color: parsedStyles.textColor }];
  textNode.textAlignHorizontal = 'CENTER';
  textNode.textAlignVertical = 'CENTER';
  return textNode;
}

function parseButtonTSX(tsx: string): ParsedStyles {
  const styleMatches = tsx.match(/className="([^"]+)"/);
  const styleClasses = styleMatches ? styleMatches[1].split(' ') : [];

  const backgroundColorClass = styleClasses.find(cls => cls.startsWith('bg-'));
  const textColorClass = styleClasses.find(cls => cls.startsWith('text-') && !cls.match(/text-(xs|sm|md|lg)/));
  const borderRadiusClass = styleClasses.find(cls => cls.startsWith('rounded-'));

  const paddingClasses = styleClasses.filter(cls => cls.startsWith('p-') || cls.startsWith('px-') || cls.startsWith('py-') || cls.startsWith('pb-') || cls.startsWith('pr-') || cls.startsWith('pl-') || cls.startsWith('pt-') || cls.startsWith('ps-') || cls.startsWith('pe-'));

  const padding = {
    horizontal: 0,
    vertical: 0,
  };

  paddingClasses.forEach(cls => {
    if (cls.startsWith('px-')) {
      padding.horizontal = utilityClassToPadding[cls];
    } else if (cls.startsWith('py-')) {
      padding.vertical = utilityClassToPadding[cls];
    } else if (cls.startsWith('p-')) {
      padding.horizontal = utilityClassToPadding[cls];
      padding.vertical = utilityClassToPadding[cls];
    } else if (cls.startsWith('pb-')) {
      padding.vertical = utilityClassToPadding[cls];
    } else if (cls.startsWith('pr-')) {
      padding.horizontal = utilityClassToPadding[cls];
    } else if (cls.startsWith('pl-')) {
      padding.horizontal = utilityClassToPadding[cls];
    } else if (cls.startsWith('pt-')) {
      padding.vertical = utilityClassToPadding[cls];
    } else if (cls.startsWith('ps-')) {
      padding.horizontal = utilityClassToPadding[cls];
    } else if (cls.startsWith('pe-')) {
      padding.horizontal = utilityClassToPadding[cls];
    }
  });

  const styles: ParsedStyles = {
    backgroundColor: hexToRgb(backgroundColorClass || 'bg-black'),
    textColor: hexToRgb(textColorClass || 'text-black'),
    padding: padding,
    borderRadius: utilityClassToRadius[borderRadiusClass || 'rounded-md'] || 4,
  };
  console.log("Parsed styles after conversion:", styles);
  return styles;
}

function hexToRgb(className: string): { r: number; g: number; b: number } {
  const cleanClass = className.replace('bg-', '').replace('text-', '');
  if (!utilityClassToHex[cleanClass]) {
    console.warn(`Unknown class name ${className}, defaulting to black`);
    return { r: 0, g: 0, b: 0 };
  }
  const hexValue = utilityClassToHex[cleanClass];

  console.log(`Converting class ${className} to hex ${hexValue}`);

  const bigint = parseInt(hexValue, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r: r / 255, g: g / 255, b: b / 255 };
}

// Example usage:
const indigo500 = hexToRgb('bg-indigo-500');
const indigo600 = hexToRgb('bg-indigo-600');
const white = hexToRgb('text-white');

console.log(indigo500); // { r: 0.388, g: 0.4, b: 0.945 }
console.log(indigo600); // { r: 0.31, g: 0.275, b: 0.898 }
console.log(white);     // { r: 1, g: 1, b: 1 }
