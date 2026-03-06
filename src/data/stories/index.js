import potteryClass from './potteryClass';
import bakingDay from './bakingDay';
import dancingDreams from './dancingDreams';
import paintingParty from './paintingParty';
import buildingBlocks from './buildingBlocks';
import musicSchool from './musicSchool';
import littleScientist from './littleScientist';
import juniorChef from './juniorChef';
import youngGardener from './youngGardener';
import starCoder from './starCoder';
import puppyStory from './puppyStory';
import rainyDay from './rainyDay';
import newBaby from './newBaby';
import grandparentsVisit from './grandparentsVisit';
import birthdayParty from './birthdayParty';
import helpingHands from './helpingHands';
import movingHouse from './movingHouse';
import familyPicnic from './familyPicnic';
import bedtimeStory from './bedtimeStory';
import morningRoutine from './morningRoutine';
import colorsAdventure from './colorsAdventure';
import numberMagic from './numberMagic';
import shapeHunters from './shapeHunters';
import animalFriends from './animalFriends';
import seasonsChange from './seasonsChange';
import weatherWonders from './weatherWonders';
import planetExplorer from './planetExplorer';
import fruitGarden from './fruitGarden';
import vegetablePatch from './vegetablePatch';
import oceanLife from './oceanLife';
import zooVisit from './zooVisit';
import parkPicnic from './parkPicnic';
import beachDay from './beachDay';
import gardenHelpers from './gardenHelpers';
import forestWalk from './forestWalk';
import mountainHike from './mountainHike';
import desertSafari from './desertSafari';
import jungleTrek from './jungleTrek';
import winterWonderland from './winterWonderland';
import farmFun from './farmFun';
import spaceAdventure from './spaceAdventure';
import dinosaurWorld from './dinosaurWorld';
import robotKingdom from './robotKingdom';
import fairyGarden from './fairyGarden';
import pirateTreasure from './pirateTreasure';
import superheroTraining from './superheroTraining';
import castleQuest from './castleQuest';
import timeTravel from './timeTravel';
import underwaterPalace from './underwaterPalace';
import toyShopMystery from './toyShopMystery';

export const stories = [
    potteryClass,
    bakingDay,
    dancingDreams,
    paintingParty,
    buildingBlocks,
    musicSchool,
    littleScientist,
    juniorChef,
    youngGardener,
    starCoder,
    puppyStory,
    rainyDay,
    newBaby,
    grandparentsVisit,
    birthdayParty,
    helpingHands,
    movingHouse,
    familyPicnic,
    bedtimeStory,
    morningRoutine,
    colorsAdventure,
    numberMagic,
    shapeHunters,
    animalFriends,
    seasonsChange,
    weatherWonders,
    planetExplorer,
    fruitGarden,
    vegetablePatch,
    oceanLife,
    zooVisit,
    parkPicnic,
    beachDay,
    gardenHelpers,
    forestWalk,
    mountainHike,
    desertSafari,
    jungleTrek,
    winterWonderland,
    farmFun,
    spaceAdventure,
    dinosaurWorld,
    robotKingdom,
    fairyGarden,
    pirateTreasure,
    superheroTraining,
    castleQuest,
    timeTravel,
    underwaterPalace,
    toyShopMystery,
];

export function getStoryById(id) {
    return stories.find(s => s.id === id);
}

export const storyThemes = [
    { id: 'pottery-class', label: 'Pottery Class', emoji: '🏺', color: '#FF9F43', category: 'Skill Stories' },
    { id: 'baking-day', label: 'Baking Day', emoji: '🧁', color: '#FF6B9D', category: 'Skill Stories' },
    { id: 'dancing-dreams', label: 'Dancing Dreams', emoji: '💃', color: '#E84393', category: 'Skill Stories' },
    { id: 'painting-party', label: 'Painting Party', emoji: '🎨', color: '#8E44AD', category: 'Skill Stories' },
    { id: 'building-blocks', label: 'Building Blocks', emoji: '🧱', color: '#A0522D', category: 'Skill Stories' },
    { id: 'music-school', label: 'Music School', emoji: '🎵', color: '#FF9F43', category: 'Skill Stories' },
    { id: 'little-scientist', label: 'Little Scientist', emoji: '🧪', color: '#74B9FF', category: 'Skill Stories' },
    { id: 'junior-chef', label: 'Junior Chef', emoji: '🍳', color: '#FF7675', category: 'Skill Stories' },
    { id: 'young-gardener', label: 'Young Gardener', emoji: '🌻', color: '#55EFC4', category: 'Skill Stories' },
    { id: 'star-coder', label: 'Star Coder', emoji: '💻', color: '#2D3436', category: 'Skill Stories' },
    { id: 'puppy-story', label: 'Puppy Story', emoji: '🐶', color: '#6BCB77', category: 'Family Stories' },
    { id: 'rainy-day', label: 'Rainy Day Fun', emoji: '🌧️', color: '#5B86E5', category: 'Family Stories' },
    { id: 'new-baby', label: 'New Baby', emoji: '👶', color: '#FAB1A0', category: 'Family Stories' },
    { id: 'grandparents-visit', label: 'Grandparents Visit', emoji: '🏡', color: '#FD79A8', category: 'Family Stories' },
    { id: 'birthday-party', label: 'Birthday Party', emoji: '🎂', color: '#F1C40F', category: 'Family Stories' },
    { id: 'helping-hands', label: 'Helping Hands', emoji: '🤝', color: '#55EFC4', category: 'Family Stories' },
    { id: 'moving-house', label: 'Moving House', emoji: '📦', color: '#FFEAA7', category: 'Family Stories' },
    { id: 'family-picnic', label: 'Family Picnic', emoji: '🧺', color: '#7C5CFC', category: 'Family Stories' },
    { id: 'bedtime-story', label: 'Bedtime Story', emoji: '💤', color: '#2D2B55', category: 'Family Stories' },
    { id: 'morning-routine', label: 'Morning Routine', emoji: '☀️', color: '#F9CA24', category: 'Family Stories' },
    { id: 'colors-adventure', label: 'Colors Adventure', emoji: '🌈', color: '#4FC3F7', category: 'Learning Stories' },
    { id: 'number-magic', label: 'Number Magic', emoji: '🔢', color: '#3498DB', category: 'Learning Stories' },
    { id: 'shape-hunters', label: 'Shape Hunters', emoji: '🔵', color: '#16A085', category: 'Learning Stories' },
    { id: 'animal-friends', label: 'Animal Friends', emoji: '🐱', color: '#F39C12', category: 'Learning Stories' },
    { id: 'seasons-change', label: 'Seasons Change', emoji: '❄️', color: '#DFE6E9', category: 'Learning Stories' },
    { id: 'weather-wonders', label: 'Weather Wonders', emoji: '⚡', color: '#636E72', category: 'Learning Stories' },
    { id: 'planet-explorer', label: 'Planet Explorer', emoji: '🪐', color: '#2C3E50', category: 'Learning Stories' },
    { id: 'fruit-garden', label: 'Fruit Garden', emoji: '🍎', color: '#FF7675', category: 'Learning Stories' },
    { id: 'vegetable-patch', label: 'Vegetable Patch', emoji: '🥕', color: '#E67E22', category: 'Learning Stories' },
    { id: 'ocean-life', label: 'Ocean Life', emoji: '🐙', color: '#00A8FF', category: 'Learning Stories' },
    { id: 'zoo-visit', label: 'Zoo Visit', emoji: '🦁', color: '#FF6B9D', category: 'Outdoor Stories' },
    { id: 'park-picnic', label: 'Park Picnic', emoji: '🛝', color: '#7C5CFC', category: 'Outdoor Stories' },
    { id: 'beach-day', label: 'Beach Day', emoji: '🏖️', color: '#00BCD4', category: 'Outdoor Stories' },
    { id: 'garden-helpers', label: 'Garden Magic', emoji: '🌻', color: '#4CAF50', category: 'Outdoor Stories' },
    { id: 'forest-walk', label: 'Forest Walk', emoji: '🌲', color: '#27AE60', category: 'Outdoor Stories' },
    { id: 'mountain-hike', label: 'Mountain Hike', emoji: '⛰️', color: '#95A5A6', category: 'Outdoor Stories' },
    { id: 'desert-safari', label: 'Desert Safari', emoji: '🐪', color: '#F1C40F', category: 'Outdoor Stories' },
    { id: 'jungle-trek', label: 'Jungle Trek', emoji: '🐒', color: '#10AC84', category: 'Outdoor Stories' },
    { id: 'winter-wonderland', label: 'Winter Wonderland', emoji: '🛷', color: '#DFF9FB', category: 'Outdoor Stories' },
    { id: 'farm-fun', label: 'Farm Fun', emoji: '🐄', color: '#BDC3C7', category: 'Outdoor Stories' },
    { id: 'space-adventure', label: 'Space Adventure', emoji: '🚀', color: '#2D2B55', category: 'Imagination Stories' },
    { id: 'dinosaur-world', label: 'Dinosaur World', emoji: '🦕', color: '#16A085', category: 'Imagination Stories' },
    { id: 'robot-kingdom', label: 'Robot Kingdom', emoji: '🤖', color: '#95A5A6', category: 'Imagination Stories' },
    { id: 'fairy-garden', label: 'Fairy Garden', emoji: '🧚', color: '#FD79A8', category: 'Imagination Stories' },
    { id: 'pirate-treasure', label: 'Pirate Treasure', emoji: '🏴‍☠️', color: '#34495E', category: 'Imagination Stories' },
    { id: 'superhero-training', label: 'Superhero Training', emoji: '🦸', color: '#E74C3C', category: 'Imagination Stories' },
    { id: 'castle-quest', label: 'Castle Quest', emoji: '🏰', color: '#8E44AD', category: 'Imagination Stories' },
    { id: 'time-travel', label: 'Time Travel', emoji: '⏳', color: '#3498DB', category: 'Imagination Stories' },
    { id: 'underwater-palace', label: 'Underwater Palace', emoji: '🧜‍♀️', color: '#00CEC9', category: 'Imagination Stories' },
    { id: 'toy-shop-mystery', label: 'Toy Shop Mystery', emoji: '🧸', color: '#FFB8B8', category: 'Imagination Stories' },
];

export default stories;
