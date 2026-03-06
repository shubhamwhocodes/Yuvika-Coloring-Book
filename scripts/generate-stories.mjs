import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../src/data/stories/');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const CATEGORIES = {
    SKILL: 'Skill Stories',
    FAMILY: 'Family Stories',
    LEARNING: 'Learning Stories',
    OUTDOOR: 'Outdoor Stories',
    IMAGINATION: 'Imagination Stories'
};

const THEMES = [
    // Skill Stories
    { id: 'pottery-class', title: "{{CHILD}}'s Pottery Class", emoji: '🏺', category: CATEGORIES.SKILL, lesson: 'Patience', color: '#FF9F43', keywords: ['clay', 'wheel', 'shaping', 'muddy hands', 'kiln', 'glaze'] },
    { id: 'baking-day', title: "{{CHILD}}'s Baking Day", emoji: '🧁', category: CATEGORIES.SKILL, lesson: 'Teamwork', color: '#FF6B9D', keywords: ['flour', 'oven', 'mixing', 'sprinkles', 'sugar', 'dough'] },
    { id: 'dancing-dreams', title: "{{CHILD}}'s Dancing Dreams", emoji: '💃', category: CATEGORIES.SKILL, lesson: 'Practice', color: '#E84393', keywords: ['ballet', 'music', 'stage', 'pirouette', 'tutu', 'rhythm'] },
    { id: 'painting-party', title: "{{CHILD}}'s Painting Party", emoji: '🎨', category: CATEGORIES.SKILL, lesson: 'Self-Expression', color: '#8E44AD', keywords: ['canvas', 'colors', 'brush', 'palette', 'easel', 'splatters'] },
    { id: 'building-blocks', title: "{{CHILD}}'s Building Adventure", emoji: '🧱', category: CATEGORIES.SKILL, lesson: 'Focus', color: '#A0522D', keywords: ['tower', 'bricks', 'design', 'helmet', 'tools', 'structure'] },
    { id: 'music-school', title: "{{CHILD}}'s First Concert", emoji: '🎵', category: CATEGORIES.SKILL, lesson: 'Listening', color: '#FF9F43', keywords: ['piano', 'notes', 'melody', 'teacher', 'bow', 'applause'] },
    { id: 'little-scientist', title: "{{CHILD}}'s Science Lab", emoji: '🧪', category: CATEGORIES.SKILL, lesson: 'Inquiry', color: '#74B9FF', keywords: ['bubbles', 'beakers', 'goggles', 'discovery', 'experiment', 'lab coat'] },
    { id: 'junior-chef', title: "{{CHILD}}'s Secret Recipe", emoji: '🍳', category: CATEGORIES.SKILL, lesson: 'Carefulness', color: '#FF7675', keywords: ['pan', 'whisk', 'chef hat', 'tasty', 'veggies', 'cooking'] },
    { id: 'young-gardener', title: "{{CHILD}}'s Seed to Sunflower", emoji: '🌻', category: CATEGORIES.SKILL, lesson: 'Nurturing', color: '#55EFC4', keywords: ['dirt', 'watering can', 'roots', 'leaves', 'petals', 'sunlight'] },
    { id: 'star-coder', title: "{{CHILD}}'s Robot Logic", emoji: '💻', category: CATEGORIES.SKILL, lesson: 'Problem Solving', color: '#2D3436', keywords: ['screen', 'buttons', 'wires', 'commands', 'logic', 'machine'] },

    // Family Stories
    { id: 'puppy-story', title: "{{CHILD}}'s New Puppy", emoji: '🐶', category: CATEGORIES.FAMILY, lesson: 'Kindness', color: '#6BCB77', keywords: ['wagging tail', 'leash', 'barking', 'kisses', 'fuzzy', 'park'] },
    { id: 'rainy-day', title: "{{CHILD}}'s Rainy Day Fun", emoji: '🌧️', category: CATEGORIES.FAMILY, lesson: 'Creativity', color: '#5B86E5', keywords: ['puddles', 'boots', 'umbrella', 'inside', 'games', 'clouds'] },
    { id: 'new-baby', title: "{{CHILD}}'s Baby Sibling", emoji: '👶', category: CATEGORIES.FAMILY, lesson: 'Love', color: '#FAB1A0', keywords: ['soft', 'cradle', 'lullaby', 'tiny fingers', 'diapers', 'smiling'] },
    { id: 'grandparents-visit', title: "{{CHILD}}'s Day at Grandma's", emoji: '🏡', category: CATEGORIES.FAMILY, lesson: 'Heritage', color: '#FD79A8', keywords: ['old photos', 'stories', 'cookies', 'garden', 'hug', 'porch'] },
    { id: 'birthday-party', title: "{{CHILD}}'s Big Celebration", emoji: '🎂', category: CATEGORIES.FAMILY, lesson: 'Gratitude', color: '#F1C40F', keywords: ['balloons', 'gifts', 'cake', 'candles', 'friends', 'singing'] },
    { id: 'helping-hands', title: "{{CHILD}} Helps Today", emoji: '🤝', category: CATEGORIES.FAMILY, lesson: 'Service', color: '#55EFC4', keywords: ['cleaning', 'organizing', 'groceries', 'smiling faces', 'useful', 'kindness'] },
    { id: 'moving-house', title: "{{CHILD}}'s New Bedroom", emoji: '📦', category: CATEGORIES.FAMILY, lesson: 'Adaptability', color: '#FFEAA7', keywords: ['boxes', 'tape', 'new walls', 'posters', 'packing', 'adventure'] },
    { id: 'family-picnic', title: "{{CHILD}}'s Picnic Day", emoji: '🧺', category: CATEGORIES.FAMILY, lesson: 'Togetherness', color: '#7C5CFC', keywords: ['blanket', 'basket', 'sandwiches', 'grass', 'frisbee', 'sun'] },
    { id: 'bedtime-story', title: "{{CHILD}}'s Dreamy Night", emoji: '💤', category: CATEGORIES.FAMILY, lesson: 'Rest', color: '#2D2B55', keywords: ['moon', 'stars', 'pajamas', 'blanket', 'stuffed animal', 'yawn'] },
    { id: 'morning-routine', title: "{{CHILD}}'s Busy Morning", emoji: '☀️', category: CATEGORIES.FAMILY, lesson: 'Discipline', color: '#F9CA24', keywords: ['toothbrush', 'breakfast', 'socks', 'sunshine', 'stretching', 'ready'] },

    // Learning Stories
    { id: 'colors-adventure', title: "{{CHILD}}'s Rainbow Day", emoji: '🌈', category: CATEGORIES.LEARNING, lesson: 'Discovery', color: '#4FC3F7', keywords: ['red', 'blue', 'yellow', 'green', 'purple', 'rainbow'] },
    { id: 'number-magic', title: "{{CHILD}} Counts to Fifty", emoji: '🔢', category: CATEGORIES.LEARNING, lesson: 'Persistence', color: '#3498DB', keywords: ['one', 'ten', 'counting', 'stacking', 'math', 'groups'] },
    { id: 'shape-hunters', title: "{{CHILD}} Finds the Circle", emoji: '🔵', category: CATEGORIES.LEARNING, lesson: 'Observation', color: '#16A085', keywords: ['square', 'triangle', 'round', 'corners', 'edges', 'flat'] },
    { id: 'animal-friends', title: "{{CHILD}} Loves Animals", emoji: '🐱', category: CATEGORIES.LEARNING, lesson: 'Empathy', color: '#F39C12', keywords: ['claws', 'fur', 'feathers', 'tracks', 'habitats', 'sounds'] },
    { id: 'seasons-change', title: "{{CHILD}} Sees the Snow", emoji: '❄️', category: CATEGORIES.LEARNING, lesson: 'Awareness', color: '#DFE6E9', keywords: ['fall', 'winter', 'spring', 'summer', 'leaves', 'sun'] },
    { id: 'weather-wonders', title: "{{CHILD}}'s Stormy Day", emoji: '⚡', category: CATEGORIES.LEARNING, lesson: 'Safety', color: '#636E72', keywords: ['wind', 'thunder', 'lightning', 'forecast', 'shelter', 'sky'] },
    { id: 'planet-explorer', title: "{{CHILD}}'s Solar System", emoji: '🪐', category: CATEGORIES.LEARNING, lesson: 'Wonder', color: '#2C3E50', keywords: ['orbit', 'planets', 'sun', 'rings', 'telescope', 'galaxy'] },
    { id: 'fruit-garden', title: "{{CHILD}} Eats the Rainbow", emoji: '🍎', category: CATEGORIES.LEARNING, lesson: 'Health', color: '#FF7675', keywords: ['apples', 'grapes', 'bananas', 'vitamins', 'orchard', 'sweet'] },
    { id: 'vegetable-patch', title: "{{CHILD}} Loves Carrots", emoji: '🥕', category: CATEGORIES.LEARNING, lesson: 'Trying New Things', color: '#E67E22', keywords: ['crunchy', 'green', 'roots', 'soup', 'healthy', 'fresh'] },
    { id: 'ocean-life', title: "{{CHILD}}'s Undersea Journey", emoji: '🐙', category: CATEGORIES.LEARNING, lesson: 'Ecology', color: '#00A8FF', keywords: ['fish', 'coral', 'bubbles', 'diving', 'deep blue', 'waves'] },

    // Outdoor Stories
    { id: 'zoo-visit', title: "{{CHILD}}'s Zoo Adventure", emoji: '🦁', category: CATEGORIES.OUTDOOR, lesson: 'Appreciation', color: '#FF6B9D', keywords: ['lion', 'giraffe', 'elephant', 'enclosure', 'map', 'walking'] },
    { id: 'park-picnic', title: "{{CHILD}}'s First Slice", emoji: '🛝', category: CATEGORIES.OUTDOOR, lesson: 'Bravery', color: '#7C5CFC', keywords: ['swings', 'sandpit', 'running', 'friends', 'climbing', 'laughing'] },
    { id: 'beach-day', title: "{{CHILD}}'s Sandcastle", emoji: '🏖️', category: CATEGORIES.OUTDOOR, lesson: 'Sharing', color: '#00BCD4', keywords: ['sand', 'waves', 'shells', 'crab', 'towel', 'sunscreen'] },
    { id: 'garden-helpers', title: "{{CHILD}}'s Garden Magic", emoji: '🌻', category: CATEGORIES.OUTDOOR, lesson: 'Responsibility', color: '#4CAF50', keywords: ['weeds', 'seeds', 'bees', 'blooms', 'shovel', 'gloves'] },
    { id: 'forest-walk', title: "{{CHILD}}'s Morning Woods", emoji: '🌲', category: CATEGORIES.OUTDOOR, lesson: 'Calmness', color: '#27AE60', keywords: ['trees', 'moss', 'birds', 'quiet', 'path', 'acorns'] },
    { id: 'mountain-hike', title: "{{CHILD}} Reaches the Top", emoji: '⛰️', category: CATEGORIES.OUTDOOR, lesson: 'Hard Work', color: '#95A5A6', keywords: ['climbing', 'boots', 'view', 'uphill', 'stamina', 'peak'] },
    { id: 'desert-safari', title: "{{CHILD}}'s Camel Ride", emoji: '🐪', category: CATEGORIES.OUTDOOR, lesson: 'Resilience', color: '#F1C40F', keywords: ['dunes', 'sand', 'oasis', 'heat', 'hump', 'travel'] },
    { id: 'jungle-trek', title: "{{CHILD}} Finds a Monkey", emoji: '🐒', category: CATEGORIES.OUTDOOR, lesson: 'Curiosity', color: '#10AC84', keywords: ['vines', 'canopy', 'wildlife', 'humidity', 'expedition', 'leaves'] },
    { id: 'winter-wonderland', title: "{{CHILD}}'s First Sled", emoji: '🛷', category: CATEGORIES.OUTDOOR, lesson: 'Joy', color: '#DFF9FB', keywords: ['snowballs', 'ice', 'mittens', 'scarf', 'frosty', 'cold'] },
    { id: 'farm-fun', title: "{{CHILD}} Milks a Cow", emoji: '🐄', category: CATEGORIES.OUTDOOR, lesson: 'Work ethic', color: '#BDC3C7', keywords: ['tractor', 'hay', 'barn', 'animals', 'harvest', 'fields'] },

    // Imagination Stories
    { id: 'space-adventure', title: "{{CHILD}}'s Trip to Mars", emoji: '🚀', category: CATEGORIES.IMAGINATION, lesson: 'Courage', color: '#2D2B55', keywords: ['rocket', 'stars', 'helmet', 'zero gravity', 'alien', 'planet'] },
    { id: 'dinosaur-world', title: "{{CHILD}} and the Dino", emoji: '🦕', category: CATEGORIES.IMAGINATION, lesson: 'Bravery', color: '#16A085', keywords: ['t-rex', 'jungle', 'roar', 'bones', 'ancient', 'tracks'] },
    { id: 'robot-kingdom', title: "{{CHILD}}'s Best Friend Bot", emoji: '🤖', category: CATEGORIES.IMAGINATION, lesson: 'Friendship', color: '#95A5A6', keywords: ['metal', 'beeps', 'shiny', 'battery', 'workshop', 'gears'] },
    { id: 'fairy-garden', title: "{{CHILD}} and the Fairies", emoji: '🧚', category: CATEGORIES.IMAGINATION, lesson: 'Magic', color: '#FD79A8', keywords: ['wings', 'glitter', 'wand', 'hidden', 'sparkle', 'flowers'] },
    { id: 'pirate-treasure', title: "{{CHILD}} Finds the Gold", emoji: '🏴‍☠️', category: CATEGORIES.IMAGINATION, lesson: 'Trust', color: '#34495E', keywords: ['ship', 'map', 'island', 'chest', 'parrot', 'waves'] },
    { id: 'superhero-training', title: "{{CHILD}}'s Super Powers", emoji: '🦸', category: CATEGORIES.IMAGINATION, lesson: 'Responsibility', color: '#E74C3C', keywords: ['cape', 'mask', 'flying', 'strength', 'justice', 'hero'] },
    { id: 'castle-quest', title: "{{CHILD}}'s Royal Kingdom", emoji: '🏰', category: CATEGORIES.IMAGINATION, lesson: 'Duty', color: '#8E44AD', keywords: ['crown', 'throne', 'knight', 'moat', 'flag', 'tower'] },
    { id: 'time-travel', title: "{{CHILD}}'s Clock Machine", emoji: '⏳', category: CATEGORIES.IMAGINATION, lesson: 'Wisdom', color: '#3498DB', keywords: ['past', 'future', 'vortex', 'history', 'gears', 'ticking'] },
    { id: 'underwater-palace', title: "{{CHILD}} and the Mermaids", emoji: '🧜‍♀️', category: CATEGORIES.IMAGINATION, lesson: 'Grace', color: '#00CEC9', keywords: ['tail', 'shells', 'current', 'palace', 'swimming', 'pearls'] },
    { id: 'toy-shop-mystery', title: "{{CHILD}} and the Talking Toys", emoji: '🧸', category: CATEGORIES.IMAGINATION, lesson: 'Generosity', color: '#FFB8B8', keywords: ['shelves', 'hidden', 'whispers', 'magic', 'midnight', 'playing'] },
];

/**
 * Seeded Random generator
 */
function createRandom(seed) {
    let state = 0;
    for (let i = 0; i < seed.length; i++) {
        state = (state << 5) - state + seed.charCodeAt(i);
        state |= 0;
    }
    return function () {
        state = (state * 1664525 + 1013904223) | 0;
        return (state >>> 0) / 4294967296;
    };
}

const CATEGORY_POOLS = {
    [CATEGORIES.SKILL]: {
        actions: [
            "It was time to practice the {{K0}} kỹ thuật.",
            "They set up the {{K1}} very carefully.",
            "{{CHILD}} focused hard on the {{K2}}.",
            "\"Watch how I handle the {{K3}},\" said the teacher.",
            "The {{K4}} was starting to take shape.",
            "They cleared the {{K5}} to make more room.",
            "Each movement with the {{K0}} felt more natural.",
            "They double-checked the {{K1}} for any mistakes.",
            "The workspace was filled with the sound of {{K2}}.",
            "{{MOTHER}} gave an encouraging nod from the corner."
        ],
        thoughts: [
            "\"I'm getting better at this {{K3}}!\"",
            "Learning a new skill is such a fun {{K4}} adventure.",
            "\"Can we try using the {{K5}} next?\" asked {{CHILD}}.",
            "\"Focus and patience are key,\" they remembered.",
            "The {{K0}} looked professional and beautiful."
        ]
    },
    [CATEGORIES.FAMILY]: {
        actions: [
            "{{CHILD}} and {{MOTHER}} shared a warm smile.",
            "They worked together to organize the {{K0}}.",
            "\"Let's put the {{K1}} here,\" suggested {{FATHER}}.",
            "They found an old {{K2}} that brought back memories.",
            "The house was filled with the scent of {{K3}}.",
            "They sat down to look at the {{K4}} together.",
            "{{CHILD}} gave the {{K5}} a big, happy hug.",
            "They sang a song while holding the {{K0}}.",
            "Everyone gathered around the {{K1}} for a photo.",
            "It was a perfect day for a family {{K2}}."
        ],
        thoughts: [
            "\"I love my family so much,\" thought {{CHILD}}.",
            "Being together makes every {{K3}} special.",
            "\"Thank you for helping with the {{K4}},\" said {{MOTHER}}.",
            "\"This {{K5}} is the best part of home.\"",
            "They felt safe and loved on this {{K0}} day."
        ]
    },
    [CATEGORIES.LEARNING]: {
        actions: [
            "{{CHILD}} pointed at the bright {{K0}}.",
            "\"How many {{K1}} can you see?\" asked {{MOTHER}}.",
            "They followed the pattern of the {{K2}}.",
            "Look at how the {{K3}} changes in the light!",
            "They compared the size of the {{K4}} and the {{K5}}.",
            "{{CHILD}} traced the outline of the {{K0}}.",
            "They sorted the {{K1}} into different groups.",
            "The path was marked by tiny {{K2}} prints.",
            "They listened to the sound of the {{K3}}.",
            "A diagram showed the cycle of the {{K4}}."
        ],
        thoughts: [
            "\"The world is full of amazing {{K5}}!\"",
            "Learning about {{K0}} is like solving a mystery.",
            "\"I want to find more {{K1}} tomorrow!\"",
            "\"Science and nature are so cool,\" said {{CHILD}}.",
            "They felt smarter after seeing the {{K2}}."
        ]
    },
    [CATEGORIES.OUTDOOR]: {
        actions: [
            "They climbed over a large {{K0}} on the trail.",
            "\"Look at those {{K1}} in the distance!\"",
            "The ground was covered in soft {{K2}}.",
            "They followed a trail of {{K3}} deep into the woods.",
            "{{CHILD}} felt the fresh air blowing through the {{K4}}.",
            "They found a hidden {{K5}} behind the rocks.",
            "The sun glinted off the surface of the {{K0}}.",
            "They stopped to watch a {{K1}} move slowly.",
            "They collected some {{K2}} to show the family.",
            "The path led them to a beautiful {{K3}} clearing."
        ],
        thoughts: [
            "\"Nature is the biggest playground!\"",
            "Walking through the {{K4}} felt so peaceful.",
            "\"I feel so brave and strong out here!\"",
            "\"What's over that {{K5}} hill?\" wondered {{CHILD}}.",
            "They breathed in the scent of fresh {{K0}}."
        ]
    },
    [CATEGORIES.IMAGINATION]: {
        actions: [
            "Suddenly, the {{K0}} began to glow with magic!",
            "They jumped onto a floating {{K1}}.",
            "\"We must find the secret of the {{K2}}!\"",
            "A friendly {{K3}} led the way to the palace.",
            "They put on their invisible {{K4}} and vanished.",
            "The sky turned into a swirl of {{K5}} colors.",
            "They had to solve the riddle of the {{K0}}.",
            "\"Hold onto the {{K1}} very tightly!\"",
            "They soared high above the {{K2}} clouds.",
            "A map pointed toward the hidden {{K3}}."
        ],
        thoughts: [
            "\"Anything is possible in ${theme.id}!\"",
            "\"I wish I could live in the {{K4}} forever!\"",
            "\"We are the heroes of this {{K5}} story!\"",
            "\"Let's use our magic {{K0}} powers!\"",
            "The adventure was just beginning in the {{K1}}."
        ]
    }
};

function generatePages(theme) {
    const pages = [];
    const k = theme.keywords;
    const lesson = theme.lesson;
    const storyTitle = theme.id.replace('-', ' ');
    const random = createRandom(theme.id);

    // Get specific pool
    const pool = CATEGORY_POOLS[theme.category] || CATEGORY_POOLS[CATEGORIES.OUTDOOR];

    // Shuffler
    const shuffle = (arr) => [...arr].sort(() => random() - 0.5);
    const shuffledActions = shuffle(pool.actions);
    const shuffledThoughts = shuffle(pool.thoughts);

    const getVar = (arr, i) => {
        let text = arr[i % arr.length];
        // Inject keywords
        for (let j = 0; j < 6; j++) {
            text = text.replace(new RegExp(`\\{\\{K${j}\\}\\}`, 'g'), k[j]);
        }
        return text;
    };

    for (let i = 1; i <= 50; i++) {
        let textLines = [];
        let hint = "";
        let firstLine = "";

        if (i === 1) {
            firstLine = `Today was the start of something amazing for {{CHILD}}.`;
            textLines = [
                firstLine,
                `They were going to explore the world of ${storyTitle}!`,
                `"Are you ready for the ${theme.id} journey?" asked {{MOTHER}}.`
            ];
            hint = `Opening scene: {{CHILD}} and family standing by a sign for "${storyTitle}".`;
        }
        else if (i <= 10) { // Phase 1: Setup
            const setups = [
                `First, they gathered all the ${k[0]} required.`,
                `Then, they checked the ${k[1]} to make sure it was ready.`,
                `{{CHILD}} put on their special ${k[2]} gear.`,
                `"Don't forget the ${k[3]}!" called out {{MOTHER}}.`,
                `Everything felt so ${k[4]} and new today.`,
                `{{CHILD}} noticed a small ${k[5]} near the entrance.`,
                `Step ${i} of the plan was to look for the ${k[0]}.`,
                `"I can't wait to see the ${k[1]}!" {{CHILD}} cheered.`,
                `The air was filled with the scent of ${k[2]}.`,
                `They found a map that showed the way to the ${k[3]}.`
            ];
            firstLine = setups[(i - 1) % setups.length];
            textLines = [
                firstLine,
                getVar(shuffledActions, i),
                `"This ${theme.category} is full of surprises!"`
            ];
            hint = `Setup: {{CHILD}} working with ${k[i % 6]}.`;
        }
        else if (i <= 20) { // Phase 2: Discovery
            const discoveries = [
                `Look at that ${k[0]}! It's bigger than I thought!`,
                `{{CHILD}} discovered a hidden path made of ${k[4]}.`,
                `Wait, is that a ${k[5]} peeking through the ${k[1]}?`,
                `They found a mysterious ${k[2]} sitting on a stone.`,
                `"Look at how the ${k[3]} shines!" {{CHILD}} exclaimed.`,
                `Each step revealed more about the magic of ${k[0]}.`,
                `{{CHILD}} used a magnifying glass to see the ${k[1]}.`,
                `"The ${k[4]} here is so colorful!" they said.`,
                `They followed a trail of ${k[5]} into the deep ${k[2]}.`,
                `A friendly bird chirped from the top of the ${k[3]}.`
            ];
            firstLine = discoveries[(i - 11) % discoveries.length];
            textLines = [
                firstLine,
                `The world of ${storyTitle} was opening up.`,
                getVar(shuffledThoughts, i)
            ];
            hint = `Discovery: {{CHILD}} finding ${k[i % 6]}.`;
        }
        else if (i <= 35) { // Phase 3: Challenge
            const challenges = [
                `Oh no! The path to the ${k[0]} was blocked!`,
                `How will we ever move this heavy ${k[1]}?`,
                `The ${k[2]} started to spin faster and faster!`,
                `{{CHILD}} had to hold onto the ${k[3]} very tightly.`,
                `"We need to solve this ${k[4]} puzzle," said {{FATHER}}.`,
                `It was time to use all their ${lesson} skills.`,
                `The ${k[5]} was being a bit stubborn today.`,
                `{{CHILD}} tried to balance the ${k[0]} on their head.`,
                `"Whew, that ${k[1]} is tricky!" they laughed.`,
                `The ${k[2]} was higher than they expected.`
            ];
            firstLine = challenges[(i - 21) % challenges.length];
            textLines = [
                firstLine,
                `"Remember," said {{FATHER}}, "${lesson} is the key."`,
                getVar(shuffledActions, i + 10)
            ];
            hint = `Challenge: {{CHILD}} overcoming an obstacle involving ${k[i % 6]}.`;
        }
        else if (i <= 45) { // Phase 4: Mastery
            const successes = [
                `Success! The ${k[0]} is finally working!`,
                `{{CHILD}} mastered the use of the ${k[1]}!`,
                `A magical glow came from the ${k[2]}.`,
                `The ${k[3]} turned into a shower of stars!`,
                `Everyone was proud of the ${k[4]} work.`,
                `"You showed so much ${lesson}," said {{MOTHER}}.`,
                `The ${k[5]} looked beautiful in the end.`,
                `They shared a giant ${theme.emoji} celebration.`
            ];
            firstLine = successes[(i - 36) % successes.length];
            textLines = [
                firstLine,
                `The ${storyTitle} adventure was a huge success.`,
                getVar(shuffledThoughts, i + 5)
            ];
            hint = `Success: {{CHILD}} celebrating ${lesson} with ${k[i % 6]}.`;
        }
        else { // Phase 5: Reflection
            const reflections = [
                `As the stars came out, they talked about the ${k[0]}.`,
                `{{CHILD}} realized that ${lesson} is very important.`,
                `They tucked the ${k[1]} into its special box.`,
                `"I loved the ${k[2]} today," said {{CHILD}}.`,
                `The ${k[3]} was now a happy memory.`
            ];
            const finalLine = (i === 50) ?
                `Goodnight, brave adventurer. See you in tomorrow's story!` :
                `{{CHILD}} gave a happy yawn after the ${storyTitle} day.`;

            firstLine = reflections[(i - 46) % reflections.length];
            textLines = [
                firstLine,
                getVar(shuffledActions, i + 20),
                finalLine
            ];
            hint = `Sleepy: {{CHILD}} reflecting on the ${storyTitle} journey.`;
        }

        pages.push({
            id: `${theme.id}-${i}`,
            text: textLines,
            illustrationHint: `Page ${i}: ${hint}. Cartoonish children's coloring book style, black outlines, no shading.`,
            illustrationId: `${theme.id}-${i}`
        });
    }
    return pages;
}

THEMES.forEach(theme => {
    const storyData = {
        id: theme.id,
        title: theme.title,
        emoji: theme.emoji,
        theme: theme.category,
        lesson: theme.lesson,
        description: `Explore the wonders of ${theme.id.replace('-', ' ')} and learn about ${theme.lesson}!`,
        coverColor: theme.color,
        pages: generatePages(theme)
    };

    const fileName = `${theme.id.split('-').map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('')}.js`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const fileContent = `// Refined story - ${theme.title}\nconst story = ${JSON.stringify(storyData, null, 4)};\n\nexport default story;`;

    fs.writeFileSync(filePath, fileContent);
});

console.log('Finished generating 50 DIVERSIFIED stories (2500 pages, unique templates per category)!');
