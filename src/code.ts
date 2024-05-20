import '../dist/styles.css';
import buttonConfig from '../dist/parsed-Button.json';
import { utilityClassToHex, utilityClassToRadius, utilityClassToPadding } from './utilityMapping';

interface ParsedStyles {
  backgroundColor: { r: number; g: number; b: number };
  textColor: { r: number; g: number; b: number };
  padding: { horizontal: number, vertical: number };
  borderRadius: number;
}

// Generate the HTML string from the `jsx` array
const buttonHtml: string = buttonConfig.jsx.map(tag => `<${tag}></${tag}>`).join('');

const width = 450;
const height = 600;

figma.showUI(__html__, { themeColors: true, width, height });

figma.ui.onmessage = async (msg: { type: string, componentType?: string, label?: string, variant?: string, size?: string }) => {
  console.log("Received message:", msg);
  switch (msg.type) {
    case 'create':
      if (msg.componentType === 'button-des' && msg.label) {
        await createDynamicButton(msg.label, buttonHtml, msg.variant, msg.size);
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

async function createDynamicButton(label: string, tsx: string, variant?: string, size?: string) {
  const parsedStyles = parseButtonTSX(tsx, variant, size);
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

function parseButtonTSX(tsx: string, variant?: string, size?: string, type?: string): ParsedStyles {
  const styleMatches = tsx.match(/className="([^"]+)"/);
  const styleClasses = styleMatches ? styleMatches[1].split(' ') : [];

  if (variant) {
    styleClasses.push(`variant-${variant}`);
  }
  if (size) {
    styleClasses.push(`size-${size}`);
  }

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
