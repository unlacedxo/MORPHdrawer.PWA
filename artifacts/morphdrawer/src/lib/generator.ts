// CREATURE TYPES (weighted random selection)
export const creatureTypes = [
  "sleepy mushroom creature", "nervous lamp ghost", "tiny moon robot",
  "lonely backpack spirit", "cursed plushie", "soft bone relic",
  "tiny god fragment", "abstract emotional companion", "haunted doodle",
  "floating eye familiar", "ceramic jar creature", "paper bag ghost"
];

// SHAPE LANGUAGE (body forms)
export const shapes = ["round", "chunky", "floppy", "noodle-shaped", "square", "spiky", "tall", "tiny", "triangle"];

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
  "start with a big round circle", "exaggerate the eyes to double their size",
  "draw the silhouette first, then add inside details",
  "keep the limbs simple — just tubes", "make one feature dramatically oversized",
  "add a crack or imperfection to make it feel alive"
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
    shape: randomItem(shapes),
    face: randomItem(faces),
    details: randomItems(bodyDetails, Math.floor(Math.random() * 3) + 2),
    materials: randomItem(materials),
    colors: randomItem(colorPalettes),
    personality: randomItem(personalities),
    evolutionIdea: randomItem(evolutionIdeas),
    tip: randomItem(tips),
    timestamp: Date.now(),
    parentId,
    evolutionLabel
  };
};
