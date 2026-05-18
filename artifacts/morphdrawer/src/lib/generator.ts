// CREATURE TYPES (weighted random selection)
import { assignMotif } from './motifs';

export const creatureTypes = [
  "sleepy mushroom creature", "nervous lamp ghost", "tiny moon robot",
  "lonely backpack spirit", "cursed plushie", "soft bone relic",
  "tiny god fragment", "abstract emotional companion", "haunted doodle",
  "floating eye familiar", "ceramic jar creature", "paper bag ghost"
];

// SHAPE LANGUAGE
const shapeAdj = ["chunky", "floppy", "noodle-shaped", "spiky", "tiny", "tall", "crooked", "droopy", "lumpy", "compact", "soft", "angular", "thorny", "stretched"];
const shapeBase = ["round", "square", "triangle", "blob", "oval", "wedge", "tube", "slab"];

function generateShape(): string {
  const base = randomItem(shapeBase);
  const adj1 = randomItem(shapeAdj);
  // 50% chance of a third modifier
  const adj2 = Math.random() > 0.5 ? randomItem(shapeAdj.filter(a => a !== adj1)) : null;
  return adj2 ? `${adj1} + ${adj2} ${base}` : `${adj1} ${base}`;
}

// FACE OPTIONS
export const faces = [
  "button eyes", "sleepy dots", "stitched mouth + tiny fang",
  "crooked smile", "star nose", "X eyes", "single large eye",
  "three dots", "crescent moon eyes", "spiral pupils"
];

// BODY DETAILS
export const bodyDetails = [
  "floating hands", "oversized sleeves", "leaf tail", "dangling charms",
  "cracked shell", "tiny legs", "antenna", "dragging blanket",
  "sewn patches", "half-melted texture", "glowing core", "ribbon bow"
];

// MATERIALS
export const materials = ["plush", "paper", "cracked paint", "graphite", "ceramic", "fuzzy", "jelly-like", "shiny plastic", "wax", "tarnished metal"];

// EMOTIONALLY NAMED COLORS
export const colorPalettes = [
  ["attic blue", "bruised lavender", "dusty mint"],
  ["candle yellow", "raincloud gray", "moth wing brown"],
  ["ghost white", "rust blush", "faded teal"],
  ["bone cream", "dried blood amber", "soot black"],
  ["moonmilk", "indigo static", "pale violet"],
  ["wilted rose", "old parchment", "faded ink"],
  ["moss green", "rain-washed stone", "soft clay"]
];

// PERSONALITY
export const personalities = [
  "shy but curious", "sleepy guardian", "dramatic little menace",
  "lonely but friendly", "chaotic sweetheart", "ancient and confused",
  "quietly protective", "feral but soft", "melancholy optimist"
];

// DRAWING TIPS
export const tips = [
  "start with a big round circle, add the face last",
  "exaggerate the eyes — make them twice as large as feels right",
  "draw the full silhouette first, then add inside details",
  "keep limbs simple — just gentle tubes or sausage shapes",
  "make one feature dramatically oversized — it's the personality",
  "add a crack or imperfection — it makes the creature feel alive",
  "sketch lightly first, then commit to one confident line",
  "try drawing with your non-dominant hand for character",
  "overlap shapes slightly for a more organic feel",
  "add tiny details in corners — tiny arrows, dots, extra eyes",
  "give it weight — heavier at the bottom makes it feel grounded",
  "think about where light comes from and add one dark shadow side"
];

// EVOLUTION IDEAS
export const evolutionIdeas = [
  "grows extra eyes", "sleeves become wings", "face cracks slightly",
  "symbols spread across body", "colors darken", "body stretches taller",
  "gains a tiny companion", "texture shifts to ceramic", "softly melts"
];

export type CreatureForm = {
  id: string;
  concept: string;
  shape: string;
  face: string;
  details: string[];
  materials: string;
  colors: string[];
  personality: string;
  evolutionIdea: string;
  tip: string;
  timestamp: number;
  parentId?: string;
  evolutionLabel?: string;
  motifId?: string;
};

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomItems = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateForm = (parentId?: string, evolutionLabel?: string): CreatureForm => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    concept: randomItem(creatureTypes),
    shape: generateShape(),
    face: randomItem(faces),
    details: randomItems(bodyDetails, Math.floor(Math.random() * 3) + 2),
    materials: randomItem(materials),
    colors: randomItem(colorPalettes),
    personality: randomItem(personalities),
    evolutionIdea: randomItem(evolutionIdeas),
    tip: randomItem(tips),
    timestamp: Date.now(),
    parentId,
    evolutionLabel,
    motifId: assignMotif()
  };
};
