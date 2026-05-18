import { assignMotif } from './motifs';

export const creatureTypes = [
  "sleepy mushroom creature", "nervous little lamp ghost", "tiny pocket moon robot",
  "lonely backpack spirit", "soft cursed plushie", "ancient bone relic",
  "forgotten tiny god", "gentle abstract companion", "drifting haunted doodle",
  "floating eye familiar", "ceramic jar creature", "crumpled paper bag ghost",
  "wobbly candle creature", "melting snow spirit", "grumpy shell crab thing",
  "shy sock puppet ghost", "small mirror demon", "wandering stone guardian",
  "blinking moth familiar", "leaking ink spirit", "soft tooth creature",
  "tangled thread beast", "hollow key creature", "dusty cloud companion"
];

// SHAPE LANGUAGE
const shapeAdj = [
  "chunky", "floppy", "spiky", "tiny", "tall", "crooked", "droopy",
  "lumpy", "soft", "thorny", "stretched", "lopsided", "round-bottomed",
  "top-heavy", "squeezed", "bulging", "asymmetrical", "squat"
];

const shapeBase = [
  "blob", "oval", "round", "square", "triangle", "teardrop",
  "wedge", "tube", "pillar", "pear shape", "egg shape"
];

function generateShape(): string {
  const base = randomItem(shapeBase);
  const adj1 = randomItem(shapeAdj);
  // 50% chance of a third modifier
  const adj2 = Math.random() > 0.5 ? randomItem(shapeAdj.filter(a => a !== adj1)) : null;
  return adj2 ? `${adj1} + ${adj2} ${base}` : `${adj1} ${base}`;
}

// FACE OPTIONS
export const faces = [
  "two big button eyes", "three sleepy dots", "one giant eye one tiny one",
  "stitched-up smile", "tiny fang poking out", "X eyes and a dot nose",
  "single huge eye in the center", "crescent moon eyes", "spiral pupils on a flat face",
  "just a sad horizontal line", "two dots and a crooked smile", "star-shaped pupils",
  "eyes on stalks", "sleepy half-closed dots", "big round eyes with tiny pupils"
];

// BODY DETAILS
export const bodyDetails = [
  "floating little hands", "oversized droopy sleeves", "a stubby leaf tail",
  "dangling tiny charms", "a cracked shell patch", "four stumpy legs",
  "one wobbly antenna", "dragging a tiny blanket", "sewn-on patches",
  "slightly melted on one side", "a tiny glowing core", "a floppy ribbon bow",
  "stubby nub arms", "one arm longer than the other", "tiny wings that don't work",
  "feet that are just circles", "a long draggy tail", "extra eyes on the back",
  "a small halo that's slightly bent"
];

// MATERIALS
export const materials = [
  "plush fabric", "crumpled paper", "cracked old paint", "soft graphite",
  "smooth ceramic", "fuzzy felt", "wobbly jelly", "shiny worn plastic",
  "melted wax", "tarnished metal", "dried clay", "wet ink",
  "rough burlap", "soft cotton stuffing"
];

// EMOTIONALLY NAMED COLORS
export const colorPalettes = [
  ["attic blue", "bruised lavender", "dusty mint"],
  ["candle yellow", "raincloud gray", "moth wing brown"],
  ["ghost white", "rust blush", "faded teal"],
  ["bone cream", "dried amber", "soot black"],
  ["moonmilk", "indigo static", "pale violet"],
  ["wilted rose", "old parchment", "faded ink blue"],
  ["moss shadow", "rain-washed stone", "soft clay pink"],
  ["cemetery green", "fog white", "pencil gray"],
  ["candlelit amber", "cold shadow blue", "warm cream"],
  ["deep plum", "dusty blush", "faded gold"]
];

// PERSONALITY
export const personalities = [
  "shy but desperately curious", "sleepy ancient guardian", "dramatic tiny menace",
  "lonely but quietly friendly", "chaotic little sweetheart", "very old and slightly confused",
  "quietly overprotective", "feral in a soft way", "melancholy but optimistic",
  "surprisingly brave", "embarrassed about being haunted", "secretly very wise",
  "nervous about everything", "pretending to be scary", "genuinely delighted by small things"
];

// DRAWING TIPS
export const tips = [
  "start with one big circle — everything else grows from that",
  "make the eyes way too big. yes, even bigger than that",
  "draw the outline first, then add one detail inside",
  "keep the arms tiny — stumpy and simple",
  "make one side uneven. creatures aren't symmetric",
  "add a tiny crack or mark to make it feel lived-in",
  "sketch it loose first, then commit to just one line",
  "give it weight — bigger at the bottom, lighter at the top",
  "add a doodle inside the body — a tiny star, a dot, a squiggle",
  "keep the legs super simple — just four small bumps",
  "make the head slightly too large for the body",
  "put the face slightly off-center",
  "give it one feature that's the wrong size",
  "draw the silhouette as one connected shape first",
  "don't erase — every mistake is part of its character",
  "a lumpy outline is better than a smooth one",
  "if you're scared to start — just draw a circle, then squish it a bit"
];

// EVOLUTION IDEAS
export const evolutionIdeas = [
  "grows one extra eye", "sleeves slowly becoming wings", "a crack appears across the face",
  "tiny symbols spreading across the body", "colors deepening at the edges",
  "body stretching taller and thinner", "gaining a small shadowy companion",
  "patches of texture shifting to ceramic", "softly melting on one side",
  "the tail growing longer and curlier", "extra tiny arms appearing",
  "the face sliding slightly sideways", "patches of fur growing in",
  "one eye closing permanently"
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
