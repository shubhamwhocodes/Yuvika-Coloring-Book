const CATEGORIES = {
    SKILL: 'Skill Stories',
    FAMILY: 'Family Stories',
    LEARNING: 'Learning Stories',
    OUTDOOR: 'Outdoor Stories',
    IMAGINATION: 'Imagination Stories'
};

const THEMES = [
    { id: 'pottery-class', title: "Pottery Class", emoji: '🏺', category: CATEGORIES.SKILL, color: '#FF9F43' },
    { id: 'baking-day', title: "Baking Day", emoji: '🧁', category: CATEGORIES.SKILL, color: '#FF6B9D' },
    { id: 'dancing-dreams', title: "Dancing Dreams", emoji: '💃', category: CATEGORIES.SKILL, color: '#E84393' },
    { id: 'painting-party', title: "Painting Party", emoji: '🎨', category: CATEGORIES.SKILL, color: '#8E44AD' },
    { id: 'building-blocks', title: "Building Blocks", emoji: '🧱', category: CATEGORIES.SKILL, color: '#A0522D' },
    { id: 'music-school', title: "Music School", emoji: '🎵', category: CATEGORIES.SKILL, color: '#FF9F43' },
    { id: 'little-scientist', title: "Little Scientist", emoji: '🧪', category: CATEGORIES.SKILL, color: '#74B9FF' },
    { id: 'junior-chef', title: "Junior Chef", emoji: '🍳', category: CATEGORIES.SKILL, color: '#FF7675' },
    { id: 'young-gardener', title: "Young Gardener", emoji: '🌻', category: CATEGORIES.SKILL, color: '#55EFC4' },
    { id: 'star-coder', title: "Star Coder", emoji: '💻', category: CATEGORIES.SKILL, color: '#2D3436' },

    { id: 'puppy-story', title: "Puppy Story", emoji: '🐶', category: CATEGORIES.FAMILY, color: '#6BCB77' },
    { id: 'rainy-day', title: "Rainy Day Fun", emoji: '🌧️', category: CATEGORIES.FAMILY, color: '#5B86E5' },
    { id: 'new-baby', title: "New Baby", emoji: '👶', category: CATEGORIES.FAMILY, color: '#FAB1A0' },
    { id: 'grandparents-visit', title: "Grandparents Visit", emoji: '🏡', category: CATEGORIES.FAMILY, color: '#FD79A8' },
    { id: 'birthday-party', title: "Birthday Party", emoji: '🎂', category: CATEGORIES.FAMILY, color: '#F1C40F' },
    { id: 'helping-hands', title: "Helping Hands", emoji: '🤝', category: CATEGORIES.FAMILY, color: '#55EFC4' },
    { id: 'moving-house', title: "Moving House", emoji: '📦', category: CATEGORIES.FAMILY, color: '#FFEAA7' },
    { id: 'family-picnic', title: "Family Picnic", emoji: '🧺', category: CATEGORIES.FAMILY, color: '#7C5CFC' },
    { id: 'bedtime-story', title: "Bedtime Story", emoji: '💤', category: CATEGORIES.FAMILY, color: '#2D2B55' },
    { id: 'morning-routine', title: "Morning Routine", emoji: '☀️', category: CATEGORIES.FAMILY, color: '#F9CA24' },

    { id: 'colors-adventure', title: "Colors Adventure", emoji: '🌈', category: CATEGORIES.LEARNING, color: '#4FC3F7' },
    { id: 'number-magic', title: "Number Magic", emoji: '🔢', category: CATEGORIES.LEARNING, color: '#3498DB' },
    { id: 'shape-hunters', title: "Shape Hunters", emoji: '🔵', category: CATEGORIES.LEARNING, color: '#16A085' },
    { id: 'animal-friends', title: "Animal Friends", emoji: '🐱', category: CATEGORIES.LEARNING, color: '#F39C12' },
    { id: 'seasons-change', title: "Seasons Change", emoji: '❄️', category: CATEGORIES.LEARNING, color: '#DFE6E9' },
    { id: 'weather-wonders', title: "Weather Wonders", emoji: '⚡', category: CATEGORIES.LEARNING, color: '#636E72' },
    { id: 'planet-explorer', title: "Planet Explorer", emoji: '🪐', category: CATEGORIES.LEARNING, color: '#2C3E50' },
    { id: 'fruit-garden', title: "Fruit Garden", emoji: '🍎', category: CATEGORIES.LEARNING, color: '#FF7675' },
    { id: 'vegetable-patch', title: "Vegetable Patch", emoji: '🥕', category: CATEGORIES.LEARNING, color: '#E67E22' },
    { id: 'ocean-life', title: "Ocean Life", emoji: '🐙', category: CATEGORIES.LEARNING, color: '#00A8FF' },

    { id: 'zoo-visit', title: "Zoo Visit", emoji: '🦁', category: CATEGORIES.OUTDOOR, color: '#FF6B9D' },
    { id: 'park-picnic', title: "Park Picnic", emoji: '🛝', category: CATEGORIES.OUTDOOR, color: '#7C5CFC' },
    { id: 'beach-day', title: "Beach Day", emoji: '🏖️', category: CATEGORIES.OUTDOOR, color: '#00BCD4' },
    { id: 'garden-helpers', title: "Garden Magic", emoji: '🌻', category: CATEGORIES.OUTDOOR, color: '#4CAF50' },
    { id: 'forest-walk', title: "Forest Walk", emoji: '🌲', category: CATEGORIES.OUTDOOR, color: '#27AE60' },
    { id: 'mountain-hike', title: "Mountain Hike", emoji: '⛰️', category: CATEGORIES.OUTDOOR, color: '#95A5A6' },
    { id: 'desert-safari', title: "Desert Safari", emoji: '🐪', category: CATEGORIES.OUTDOOR, color: '#F1C40F' },
    { id: 'jungle-trek', title: "Jungle Trek", emoji: '🐒', category: CATEGORIES.OUTDOOR, color: '#10AC84' },
    { id: 'winter-wonderland', title: "Winter Wonderland", emoji: '🛷', category: CATEGORIES.OUTDOOR, color: '#DFF9FB' },
    { id: 'farm-fun', title: "Farm Fun", emoji: '🐄', category: CATEGORIES.OUTDOOR, color: '#BDC3C7' },

    { id: 'space-adventure', title: "Space Adventure", emoji: '🚀', category: CATEGORIES.IMAGINATION, color: '#2D2B55' },
    { id: 'dinosaur-world', title: "Dinosaur World", emoji: '🦕', category: CATEGORIES.IMAGINATION, color: '#16A085' },
    { id: 'robot-kingdom', title: "Robot Kingdom", emoji: '🤖', category: CATEGORIES.IMAGINATION, color: '#95A5A6' },
    { id: 'fairy-garden', title: "Fairy Garden", emoji: '🧚', category: CATEGORIES.IMAGINATION, color: '#FD79A8' },
    { id: 'pirate-treasure', title: "Pirate Treasure", emoji: '🏴‍☠️', category: CATEGORIES.IMAGINATION, color: '#34495E' },
    { id: 'superhero-training', title: "Superhero Training", emoji: '🦸', category: CATEGORIES.IMAGINATION, color: '#E74C3C' },
    { id: 'castle-quest', title: "Castle Quest", emoji: '🏰', category: CATEGORIES.IMAGINATION, color: '#8E44AD' },
    { id: 'time-travel', title: "Time Travel", emoji: '⏳', category: CATEGORIES.IMAGINATION, color: '#3498DB' },
    { id: 'underwater-palace', title: "Underwater Palace", emoji: '🧜‍♀️', category: CATEGORIES.IMAGINATION, color: '#00CEC9' },
    { id: 'toy-shop-mystery', title: "Toy Shop Mystery", emoji: '🧸', category: CATEGORIES.IMAGINATION, color: '#FFB8B8' },
];

function getFileName(id) {
    return id.split('-').map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

let imports = '';
let instances = '';
let themes = '';

THEMES.forEach(t => {
    const varName = getFileName(t.id);
    imports += `import ${varName} from './${varName}';\n`;
    instances += `    ${varName},\n`;
    themes += `    { id: '${t.id}', label: '${t.title}', emoji: '${t.emoji}', color: '${t.color}', category: '${t.category}' },\n`;
});

const content = `${imports}
export const stories = [
${instances}];

export function getStoryById(id) {
    return stories.find(s => s.id === id);
}

export const storyThemes = [
${themes}];

export default stories;
`;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fs.writeFileSync(path.join(__dirname, '../src/data/stories/index.js'), content);
console.log('Story index updated!');
