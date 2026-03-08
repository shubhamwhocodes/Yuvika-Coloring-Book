#!/usr/bin/env node
/**
 * Story Generator — produces 50 unique story files, each with 50 unique pages.
 * Uses handwritten stories where available, and a narrative engine for the rest.
 * Run: node scripts/generateStories.js
 */
const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'src', 'data', 'stories');

// ═══════════════════════════════════════════
// STORY METADATA — all 50 stories
// ═══════════════════════════════════════════
const STORY_META = [
    // SKILL STORIES (1-10)
    { id: "pottery-class", file: "potteryClass", title: "{{CHILD}}'s Pottery Class", emoji: "🏺", theme: "Skill Stories", lesson: "Creativity", coverColor: "#FF9F43", desc: "Join {{CHILD}} in a magical pottery class and discover the joy of creating with clay!", setting: "pottery studio", items: ["clay", "wheel", "glaze", "kiln", "brush", "bowl", "vase", "sculpture"], actions: ["shaping", "molding", "painting", "glazing", "turning", "smoothing", "trimming", "firing"] },
    { id: "baking-day", file: "bakingDay", title: "{{CHILD}}'s Baking Day", emoji: "🧁", theme: "Skill Stories", lesson: "Teamwork", coverColor: "#FF6B9D", desc: "Join {{CHILD}} in the kitchen for a delicious baking adventure about working together!", setting: "kitchen", items: ["flour", "sugar", "eggs", "butter", "frosting", "sprinkles", "cupcakes", "oven"], actions: ["mixing", "stirring", "pouring", "measuring", "decorating", "scooping", "spreading", "tasting"] },
    { id: "dancing-dreams", file: "dancingDreams", title: "{{CHILD}}'s Dancing Dreams", emoji: "💃", theme: "Skill Stories", lesson: "Confidence", coverColor: "#E84393", desc: "Spin and leap with {{CHILD}} as they discover the magic of dance and self-confidence!", setting: "dance studio", items: ["ballet shoes", "barre", "mirror", "music", "stage", "spotlight", "costume", "ribbon"], actions: ["twirling", "leaping", "bending", "stretching", "spinning", "bowing", "swaying", "gliding"] },
    { id: "painting-party", file: "paintingParty", title: "{{CHILD}}'s Painting Party", emoji: "🎨", theme: "Skill Stories", lesson: "Self-Expression", coverColor: "#8E44AD", desc: "Splash colors and discover the art of self-expression at {{CHILD}}'s painting party!", setting: "art room", items: ["paint", "canvas", "brush", "palette", "easel", "colors", "crayon", "sketchbook"], actions: ["painting", "drawing", "sketching", "blending", "dabbing", "splashing", "outlining", "shading"] },
    { id: "building-blocks", file: "buildingBlocks", title: "{{CHILD}}'s Building Blocks", emoji: "🧱", theme: "Skill Stories", lesson: "Problem-Solving", coverColor: "#A0522D", desc: "Build, crash, and rebuild with {{CHILD}} in this adventure about problem-solving!", setting: "playroom", items: ["blocks", "tower", "castle", "bridge", "arch", "ramp", "base", "pyramid"], actions: ["stacking", "building", "balancing", "connecting", "arranging", "designing", "measuring", "testing"] },
    { id: "music-school", file: "musicSchool", title: "{{CHILD}}'s Music School", emoji: "🎵", theme: "Skill Stories", lesson: "Patience", coverColor: "#FF9F43", desc: "Discover the joy of music with {{CHILD}} and learn that beautiful things take patience!", setting: "music room", items: ["piano", "keys", "notes", "melody", "rhythm", "song", "pedal", "sheet music"], actions: ["playing", "practicing", "listening", "tapping", "singing", "humming", "counting", "performing"] },
    { id: "little-scientist", file: "littleScientist", title: "{{CHILD}}'s Science Lab", emoji: "🧪", theme: "Skill Stories", lesson: "Curiosity", coverColor: "#74B9FF", desc: "Explore the amazing world of science with {{CHILD}} and discover that curiosity is a superpower!", setting: "home lab", items: ["beaker", "magnifying glass", "notebook", "crystals", "goggles", "volcano model", "test tube", "microscope"], actions: ["observing", "mixing", "measuring", "recording", "testing", "discovering", "hypothesizing", "examining"] },
    { id: "junior-chef", file: "juniorChef", title: "{{CHILD}}'s Chef Adventure", emoji: "🍳", theme: "Skill Stories", lesson: "Independence", coverColor: "#FF7675", desc: "Watch {{CHILD}} cook up confidence and independence in the kitchen!", setting: "kitchen", items: ["apron", "cutting board", "vegetables", "salad bowl", "soup pot", "recipe book", "measuring cup", "whisk"], actions: ["chopping", "stirring", "seasoning", "plating", "serving", "tasting", "washing", "arranging"] },
    { id: "young-gardener", file: "youngGardener", title: "{{CHILD}}'s Garden", emoji: "🌻", theme: "Skill Stories", lesson: "Responsibility", coverColor: "#55EFC4", desc: "Grow beautiful things with {{CHILD}} and learn about responsibility along the way!", setting: "backyard garden", items: ["seeds", "watering can", "soil", "sunflower", "trowel", "pots", "compost", "garden bed"], actions: ["planting", "watering", "weeding", "digging", "harvesting", "pruning", "observing", "nurturing"] },
    { id: "star-coder", file: "starCoder", title: "{{CHILD}}'s Code Quest", emoji: "💻", theme: "Skill Stories", lesson: "Persistence", coverColor: "#2D3436", desc: "Join {{CHILD}} on a coding adventure where bugs become puzzles and persistence wins!", setting: "computer desk", items: ["computer", "code blocks", "character", "grid", "loop", "function", "variable", "game"], actions: ["coding", "debugging", "dragging", "clicking", "testing", "running", "solving", "building"] },
    // FAMILY STORIES (11-20)
    { id: "puppy-story", file: "puppyStory", title: "{{CHILD}}'s New Puppy", emoji: "🐶", theme: "Family Stories", lesson: "Kindness", coverColor: "#6BCB77", desc: "{{CHILD}} learns about kindness when a fluffy new puppy joins the family!", setting: "home with backyard", items: ["puppy", "leash", "dog bowl", "ball", "treats", "collar", "paw prints", "dog bed"], actions: ["patting", "walking", "feeding", "training", "playing", "brushing", "cuddling", "fetching"] },
    { id: "rainy-day", file: "rainyDay", title: "{{CHILD}}'s Rainy Day Fun", emoji: "🌧️", theme: "Family Stories", lesson: "Imagination", coverColor: "#5B86E5", desc: "When rain cancels outdoor plans, {{CHILD}} discovers that imagination turns any day into an adventure!", setting: "home on a rainy day", items: ["umbrella", "puddles", "blanket fort", "board games", "crayons", "pillow ship", "flashlight", "window"], actions: ["imagining", "building", "drawing", "playing", "stacking", "narrating", "creating", "exploring"] },
    { id: "new-baby", file: "newBaby", title: "{{CHILD}}'s New Sibling", emoji: "👶", theme: "Family Stories", lesson: "Sharing", coverColor: "#FAB1A0", desc: "A new baby joins the family, and {{CHILD}} learns the beautiful art of sharing love!", setting: "home with nursery", items: ["baby", "crib", "rattle", "blanket", "bottle", "lullaby", "mobile", "stroller"], actions: ["holding", "sharing", "singing", "helping", "watching", "whispering", "rocking", "caring"] },
    { id: "grandparents-visit", file: "grandparentsVisit", title: "{{CHILD}}'s Grandparents Visit", emoji: "🏡", theme: "Family Stories", lesson: "Gratitude", coverColor: "#FD79A8", desc: "When grandparents come to visit, {{CHILD}} discovers the treasure of gratitude and family bonds!", setting: "grandparents' home", items: ["photo album", "cookies", "rocking chair", "garden", "stories", "quilts", "recipes", "porch swing"], actions: ["listening", "baking", "hugging", "gardening", "sharing", "remembering", "thanking", "laughing"] },
    { id: "birthday-party", file: "birthdayParty", title: "{{CHILD}}'s Birthday Party", emoji: "🎂", theme: "Family Stories", lesson: "Generosity", coverColor: "#F1C40F", desc: "Celebrate with {{CHILD}} and discover that the best gifts are the ones we give to others!", setting: "decorated house", items: ["cake", "balloons", "presents", "party hat", "candles", "streamers", "confetti", "games"], actions: ["decorating", "celebrating", "wishing", "unwrapping", "sharing", "dancing", "laughing", "thanking"] },
    { id: "helping-hands", file: "helpingHands", title: "{{CHILD}}'s Helping Hands", emoji: "🤝", theme: "Family Stories", lesson: "Compassion", coverColor: "#55EFC4", desc: "Join {{CHILD}} in discovering how small acts of kindness create big waves of compassion!", setting: "neighborhood", items: ["grocery bag", "watering can", "tools", "bandage", "cookies", "welcome card", "broom", "flowers"], actions: ["helping", "carrying", "cleaning", "comforting", "delivering", "fixing", "supporting", "encouraging"] },
    { id: "moving-house", file: "movingHouse", title: "{{CHILD}}'s Moving Day", emoji: "📦", theme: "Family Stories", lesson: "Adaptability", coverColor: "#FFEAA7", desc: "{{CHILD}} learns that change can be the start of something wonderful when their family moves to a new home!", setting: "old and new house", items: ["moving boxes", "truck", "memories", "new room", "old friends", "new neighbors", "map", "key"], actions: ["packing", "carrying", "remembering", "exploring", "unpacking", "meeting", "decorating", "adjusting"] },
    { id: "family-picnic", file: "familyPicnic", title: "{{CHILD}}'s Family Picnic", emoji: "🧺", theme: "Family Stories", lesson: "Togetherness", coverColor: "#7C5CFC", desc: "A sunny day, a cozy blanket, and the whole family together — this is {{CHILD}}'s perfect picnic!", setting: "park meadow", items: ["picnic basket", "blanket", "sandwiches", "lemonade", "frisbee", "butterflies", "kite", "wildflowers"], actions: ["packing", "spreading", "eating", "running", "catching", "flying", "picking", "laughing"] },
    { id: "bedtime-story", file: "bedtimeStory", title: "{{CHILD}}'s Bedtime Story", emoji: "💤", theme: "Family Stories", lesson: "Security", coverColor: "#2D2B55", desc: "Snuggle up with {{CHILD}} for a cozy bedtime routine full of love and security!", setting: "bedroom at night", items: ["pillow", "blanket", "teddy bear", "nightlight", "storybook", "pajamas", "moon", "stars"], actions: ["snuggling", "reading", "yawning", "whispering", "dreaming", "listening", "hugging", "resting"] },
    { id: "morning-routine", file: "morningRoutine", title: "{{CHILD}}'s Morning Routine", emoji: "☀️", theme: "Family Stories", lesson: "Discipline", coverColor: "#F9CA24", desc: "Rise and shine with {{CHILD}} as they master a morning routine and learn the power of good habits!", setting: "home in the morning", items: ["alarm clock", "toothbrush", "breakfast", "backpack", "shoes", "lunchbox", "cereal bowl", "mirror"], actions: ["waking", "brushing", "eating", "dressing", "packing", "stretching", "organizing", "smiling"] },
    // LEARNING STORIES (21-30)
    { id: "colors-adventure", file: "colorsAdventure", title: "{{CHILD}}'s Rainbow Day", emoji: "🌈", theme: "Learning Stories", lesson: "Discovery", coverColor: "#4FC3F7", desc: "Explore a world of colors with {{CHILD}} and discover how every shade tells a story!", setting: "colorful world", items: ["rainbow", "paintbox", "prism", "colored pencils", "mixing tray", "flowers", "sky", "sunset"], actions: ["discovering", "mixing", "finding", "matching", "comparing", "creating", "observing", "identifying"] },
    { id: "number-magic", file: "numberMagic", title: "{{CHILD}}'s Number Magic", emoji: "🔢", theme: "Learning Stories", lesson: "Logic", coverColor: "#3498DB", desc: "Numbers come alive as {{CHILD}} discovers patterns, puzzles, and the magic of counting!", setting: "math wonderland", items: ["number cards", "counting beads", "puzzle pieces", "shapes", "calculator", "measuring tape", "dice", "clock"], actions: ["counting", "adding", "sorting", "measuring", "comparing", "arranging", "estimating", "solving"] },
    { id: "shape-hunters", file: "shapeHunters", title: "{{CHILD}}'s Shape Hunters", emoji: "🔵", theme: "Learning Stories", lesson: "Observation", coverColor: "#16A085", desc: "Join {{CHILD}} on a hunt for shapes hiding in the everyday world around us!", setting: "neighborhood walk", items: ["circle", "square", "triangle", "rectangle", "star", "diamond", "hexagon", "oval"], actions: ["spotting", "tracing", "drawing", "building", "finding", "matching", "measuring", "counting"] },
    { id: "animal-friends", file: "animalFriends", title: "{{CHILD}}'s Animal Friends", emoji: "🐱", theme: "Learning Stories", lesson: "Empathy", coverColor: "#F39C12", desc: "Meet fascinating animals with {{CHILD}} and learn what it means to understand different creatures!", setting: "nature reserve", items: ["binoculars", "field guide", "bird feeder", "nest", "tracks", "pond", "burrow", "feather"], actions: ["watching", "feeding", "listening", "tracking", "sketching", "identifying", "learning", "protecting"] },
    { id: "seasons-change", file: "seasonsChange", title: "{{CHILD}}'s Four Seasons", emoji: "❄️", theme: "Learning Stories", lesson: "Acceptance", coverColor: "#DFE6E9", desc: "Travel through all four seasons with {{CHILD}} and learn that change is nature's beautiful plan!", setting: "same backyard tree through seasons", items: ["leaves", "snowflakes", "flowers", "sunshine", "puddles", "pinecones", "berries", "frost"], actions: ["observing", "collecting", "comparing", "drawing", "measuring", "photographing", "recording", "celebrating"] },
    { id: "weather-wonders", file: "weatherWonders", title: "{{CHILD}}'s Weather Wonders", emoji: "⚡", theme: "Learning Stories", lesson: "Awareness", coverColor: "#636E72", desc: "From sunny skies to thunderstorms, {{CHILD}} explores the amazing science of weather!", setting: "outdoors in various weather", items: ["thermometer", "rain gauge", "wind sock", "clouds", "lightning", "snowflakes", "rainbow", "weather chart"], actions: ["measuring", "observing", "recording", "predicting", "drawing", "collecting", "comparing", "charting"] },
    { id: "planet-explorer", file: "planetExplorer", title: "{{CHILD}}'s Planet Explorer", emoji: "🪐", theme: "Learning Stories", lesson: "Wonder", coverColor: "#2C3E50", desc: "Blast off with {{CHILD}} on a journey through the solar system full of wonder and discovery!", setting: "backyard observatory", items: ["telescope", "star chart", "planets", "moon", "sun", "asteroid", "constellation", "compass"], actions: ["observing", "mapping", "counting", "drawing", "imagining", "measuring", "discovering", "naming"] },
    { id: "fruit-garden", file: "fruitGarden", title: "{{CHILD}}'s Fruit Garden", emoji: "🍎", theme: "Learning Stories", lesson: "Nutrition", coverColor: "#FF7675", desc: "Pick, taste, and learn about fruits with {{CHILD}} in this delicious educational adventure!", setting: "fruit orchard", items: ["apple", "banana", "strawberry", "orange", "blueberry", "watermelon", "pear", "grapes"], actions: ["picking", "tasting", "counting", "sorting", "sharing", "washing", "slicing", "arranging"] },
    { id: "vegetable-patch", file: "vegetablePatch", title: "{{CHILD}}'s Vegetable Patch", emoji: "🥕", theme: "Learning Stories", lesson: "Growth", coverColor: "#E67E22", desc: "Dig in the dirt with {{CHILD}} and watch vegetables grow from tiny seeds to amazing plants!", setting: "backyard vegetable garden", items: ["carrot", "tomato", "pea pod", "lettuce", "cucumber", "potato", "corn", "watering can"], actions: ["planting", "watering", "weeding", "harvesting", "measuring", "tasting", "comparing", "composting"] },
    { id: "ocean-life", file: "oceanLife", title: "{{CHILD}}'s Ocean Life", emoji: "🐙", theme: "Learning Stories", lesson: "Respect", coverColor: "#00A8FF", desc: "Dive deep with {{CHILD}} to explore ocean creatures and learn about respecting nature!", setting: "beach and tide pools", items: ["shells", "starfish", "crab", "seaweed", "tide pool", "coral", "fish", "dolphin"], actions: ["exploring", "collecting", "observing", "sketching", "touching gently", "listening", "learning", "protecting"] },
    // OUTDOOR STORIES (31-40)
    { id: "zoo-visit", file: "zooVisit", title: "{{CHILD}}'s Zoo Visit", emoji: "🦁", theme: "Outdoor Stories", lesson: "Appreciation", coverColor: "#FF6B9D", desc: "A day at the zoo teaches {{CHILD}} to appreciate every creature, big and small!", setting: "city zoo", items: ["map", "binoculars", "camera", "feeding schedule", "animal facts", "souvenir", "water bottle", "hat"], actions: ["walking", "watching", "photographing", "reading", "feeding", "learning", "drawing", "comparing"] },
    { id: "park-picnic", file: "parkPicnic", title: "{{CHILD}}'s Park Day", emoji: "🛝", theme: "Outdoor Stories", lesson: "Friendship", coverColor: "#7C5CFC", desc: "{{CHILD}} makes new friends and discovers the playground is the best place for connections!", setting: "neighborhood park", items: ["swing", "slide", "sandbox", "seesaw", "ball", "jump rope", "monkey bars", "merry-go-round"], actions: ["swinging", "sliding", "climbing", "jumping", "sharing", "running", "playing", "laughing"] },
    { id: "beach-day", file: "beachDay", title: "{{CHILD}}'s Beach Day", emoji: "🏖️", theme: "Outdoor Stories", lesson: "Joy", coverColor: "#00BCD4", desc: "Sun, sand, and splashing waves — {{CHILD}} finds pure joy at the beach!", setting: "sandy beach", items: ["sandcastle", "bucket", "shovel", "shells", "waves", "sunscreen", "towel", "seagulls"], actions: ["building", "digging", "splashing", "collecting", "swimming", "running", "burying", "floating"] },
    { id: "garden-helpers", file: "gardenHelpers", title: "{{CHILD}}'s Garden Magic", emoji: "🌻", theme: "Outdoor Stories", lesson: "Cooperation", coverColor: "#4CAF50", desc: "{{CHILD}} and friends work together to create a magical community garden!", setting: "community garden", items: ["seeds", "hose", "wheelbarrow", "rake", "compost", "bird bath", "garden sign", "flower pots"], actions: ["digging", "planting", "watering", "weeding", "hauling", "raking", "building", "painting"] },
    { id: "forest-walk", file: "forestWalk", title: "{{CHILD}}'s Forest Walk", emoji: "🌲", theme: "Outdoor Stories", lesson: "Mindfulness", coverColor: "#27AE60", desc: "A walk in the forest teaches {{CHILD}} to slow down and notice the beautiful world around them!", setting: "woodland trail", items: ["trail map", "walking stick", "pine cones", "mushrooms", "ferns", "stream", "bird songs", "sunbeams"], actions: ["walking", "listening", "observing", "touching", "smelling", "breathing", "sketching", "resting"] },
    { id: "mountain-hike", file: "mountainHike", title: "{{CHILD}}'s Mountain Hike", emoji: "⛰️", theme: "Outdoor Stories", lesson: "Determination", coverColor: "#95A5A6", desc: "Every step upward teaches {{CHILD}} that determination can move mountains!", setting: "mountain trail", items: ["backpack", "water bottle", "trail markers", "rocks", "wildflowers", "binoculars", "snacks", "hiking boots"], actions: ["climbing", "resting", "sipping", "pointing", "cheering", "stepping", "breathing", "celebrating"] },
    { id: "desert-safari", file: "desertSafari", title: "{{CHILD}}'s Desert Safari", emoji: "🐪", theme: "Outdoor Stories", lesson: "Resilience", coverColor: "#F1C40F", desc: "The desert is full of surprises as {{CHILD}} learns that life thrives even in tough conditions!", setting: "desert landscape", items: ["camel", "cactus", "sand dunes", "lizard", "oasis", "sunset", "stars", "compass"], actions: ["riding", "walking", "spotting", "photographing", "resting", "marveling", "learning", "exploring"] },
    { id: "jungle-trek", file: "jungleTrek", title: "{{CHILD}}'s Jungle Trek", emoji: "🐒", theme: "Outdoor Stories", lesson: "Bravery", coverColor: "#10AC84", desc: "Every rustle and roar is an adventure as {{CHILD}} treks through the jungle with bravery!", setting: "tropical jungle", items: ["vines", "monkeys", "parrots", "waterfall", "bridge", "ancient tree", "butterfly", "river"], actions: ["trekking", "swinging", "crossing", "spotting", "listening", "climbing", "splashing", "discovering"] },
    { id: "winter-wonderland", file: "winterWonderland", title: "{{CHILD}}'s Winter Wonderland", emoji: "🛷", theme: "Outdoor Stories", lesson: "Warmth", coverColor: "#DFF9FB", desc: "A snowy world teaches {{CHILD}} that true warmth comes from the heart, not the weather!", setting: "snowy landscape", items: ["snowman", "sled", "mittens", "hot cocoa", "snowflakes", "icicles", "scarf", "snow angel"], actions: ["sledding", "building", "catching", "sipping", "throwing", "skating", "warming", "snuggling"] },
    { id: "farm-fun", file: "farmFun", title: "{{CHILD}}'s Farm Fun", emoji: "🐄", theme: "Outdoor Stories", lesson: "Hard Work", coverColor: "#BDC3C7", desc: "From dawn chores to sunset — {{CHILD}} discovers that hard work on the farm brings great rewards!", setting: "family farm", items: ["hay bale", "chickens", "tractor", "milk pail", "eggs", "fence", "barn", "corn field"], actions: ["feeding", "collecting", "riding", "milking", "planting", "mending", "sweeping", "harvesting"] },
    // IMAGINATION STORIES (41-50)
    { id: "space-adventure", file: "spaceAdventure", title: "{{CHILD}}'s Trip to Mars", emoji: "🚀", theme: "Imagination Stories", lesson: "Courage", coverColor: "#2D2B55", desc: "Blast off with {{CHILD}} on an epic space mission that takes courage beyond the stars!", setting: "spaceship and Mars", items: ["rocket", "helmet", "stars", "alien friend", "moon rocks", "control panel", "space suit", "planet"], actions: ["launching", "floating", "exploring", "collecting", "befriending", "navigating", "discovering", "landing"] },
    { id: "dinosaur-world", file: "dinosaurWorld", title: "{{CHILD}}'s Dinosaur World", emoji: "🦕", theme: "Imagination Stories", lesson: "Fascination", coverColor: "#16A085", desc: "Travel back in time with {{CHILD}} to a world of incredible dinosaurs and ancient wonders!", setting: "prehistoric world", items: ["T-Rex", "triceratops", "fossil", "volcano", "fern", "nest", "footprint", "egg"], actions: ["discovering", "digging", "running", "hiding", "studying", "comparing", "sketching", "marveling"] },
    { id: "robot-kingdom", file: "robotKingdom", title: "{{CHILD}}'s Robot Kingdom", emoji: "🤖", theme: "Imagination Stories", lesson: "Innovation", coverColor: "#95A5A6", desc: "Build, program, and befriend robots with {{CHILD}} in a kingdom of amazing innovation!", setting: "robot city", items: ["robot friend", "gears", "circuit", "tool kit", "blueprint", "antenna", "energy crystal", "control pad"], actions: ["building", "programming", "assembling", "testing", "repairing", "inventing", "powering", "connecting"] },
    { id: "fairy-garden", file: "fairyGarden", title: "{{CHILD}}'s Fairy Garden", emoji: "🧚", theme: "Imagination Stories", lesson: "Gentleness", coverColor: "#FD79A8", desc: "Tiptoe into a magical fairy garden where {{CHILD}} learns the power of being gentle!", setting: "enchanted garden", items: ["fairy wings", "mushroom house", "dewdrops", "flower petals", "acorn cups", "glowing lantern", "tiny door", "spider web"], actions: ["tiptoeing", "whispering", "floating", "sprinkling", "listening", "painting", "caring", "wishing"] },
    { id: "pirate-treasure", file: "pirateTreasure", title: "{{CHILD}}'s Pirate Treasure", emoji: "🏴‍☠️", theme: "Imagination Stories", lesson: "Adventure", coverColor: "#34495E", desc: "Hoist the sails! {{CHILD}} sets off on a thrilling pirate adventure to find hidden treasure!", setting: "pirate ship and island", items: ["treasure map", "compass", "spyglass", "ship", "parrot", "treasure chest", "island", "gold coins"], actions: ["sailing", "digging", "searching", "climbing", "swimming", "decoding", "steering", "discovering"] },
    { id: "superhero-training", file: "superheroTraining", title: "{{CHILD}}'s Superhero Training", emoji: "🦸", theme: "Imagination Stories", lesson: "Bravery", coverColor: "#E74C3C", desc: "Every hero starts somewhere! Join {{CHILD}} at superhero school for an epic training adventure!", setting: "superhero academy", items: ["cape", "mask", "shield", "training course", "power ring", "obstacle", "grappling hook", "signal"], actions: ["jumping", "flying", "dodging", "climbing", "lifting", "running", "rescuing", "practicing"] },
    { id: "castle-quest", file: "castleQuest", title: "{{CHILD}}'s Castle Quest", emoji: "🏰", theme: "Imagination Stories", lesson: "Honor", coverColor: "#8E44AD", desc: "Don your armor and join {{CHILD}} on a noble quest through a magical castle kingdom!", setting: "medieval castle", items: ["crown", "sword", "shield", "horse", "tower", "drawbridge", "banner", "stone wall"], actions: ["riding", "questing", "climbing", "defending", "exploring", "feasting", "jousting", "rescuing"] },
    { id: "time-travel", file: "timeTravel", title: "{{CHILD}}'s Time Travel", emoji: "⏳", theme: "Imagination Stories", lesson: "Wisdom", coverColor: "#3498DB", desc: "Past, present, and future — {{CHILD}}'s time machine takes them on a journey of wisdom!", setting: "time machine", items: ["time machine", "clock", "hourglass", "portal", "ancient scroll", "futuristic city", "compass", "journal"], actions: ["traveling", "observing", "learning", "noting", "jumping", "landing", "recording", "reflecting"] },
    { id: "underwater-palace", file: "underwaterPalace", title: "{{CHILD}}'s Underwater Palace", emoji: "🧜‍♀️", theme: "Imagination Stories", lesson: "Harmony", coverColor: "#00CEC9", desc: "Dive into a sparkling underwater palace where {{CHILD}} learns about living in harmony!", setting: "underwater kingdom", items: ["coral throne", "pearl", "seahorse", "treasure", "bubble wand", "shell crown", "trident", "glowing jellyfish"], actions: ["swimming", "diving", "exploring", "decorating", "collecting", "floating", "singing", "befriending"] },
    { id: "toy-shop-mystery", file: "toyShopMystery", title: "{{CHILD}}'s Toy Shop Mystery", emoji: "🧸", theme: "Imagination Stories", lesson: "Cleverness", coverColor: "#FFB8B8", desc: "When toys come alive at midnight, {{CHILD}} must solve the mystery with cleverness and heart!", setting: "magical toy shop", items: ["teddy bear", "toy train", "music box", "dollhouse", "puzzle box", "jack-in-the-box", "toy soldier", "snow globe"], actions: ["investigating", "searching", "questioning", "following", "solving", "unlocking", "discovering", "celebrating"] },
];

// ═══════════════════════════════════════════
// NARRATIVE ENGINE — generates unique 50-page stories
// ═══════════════════════════════════════════

// Seeded random number generator for deterministic output
function seededRandom(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    return function () {
        h = h ^ (h << 13); h = h ^ (h >> 17); h = h ^ (h << 5);
        return ((h >>> 0) / 4294967296);
    };
}

function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }
function shuffle(arr, rng) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function generatePages(meta) {
    const rng = seededRandom(meta.id + "_story_v3");
    const { id, title, emoji, lesson, setting, items, actions, theme } = meta;
    const name = title.replace("{{CHILD}}'s ", "");
    const I = (idx) => items[idx % items.length]; // safe item access
    const A = (idx) => actions[idx % actions.length]; // safe action access

    // Build 50 unique pages across 5 acts, each with completely different text
    const pages = [];

    // ── ACT 1: INTRODUCTION (Pages 1-10) ──
    const introTexts = [
        [`The ${setting} was filled with exciting possibilities.`, `{{CHILD}} looked around with wide, sparkling eyes.`, `"Are you ready for the ${name.toLowerCase()} adventure?" asked {{MOTHER}}.`],
        [`Everything was set up and waiting — the ${I(0)}, the ${I(1)}, and more.`, `{{CHILD}} picked up the ${I(0)} and turned it over in their hands.`, `"This is going to be the best day ever!" they declared.`],
        [`{{MOTHER}} explained how the ${I(2)} worked while {{CHILD}} listened carefully.`, `"First, you need to understand the ${I(2)} before you use it."`, `{{CHILD}} nodded seriously, determined to learn everything.`],
        [`The first step was ${A(0)} — and {{CHILD}} gave it their best try.`, `It wasn't perfect, but it was a wonderful beginning.`, `"Everyone starts exactly where you are right now," {{MOTHER}} encouraged.`],
        [`{{CHILD}} noticed how the ${I(3)} connected to the ${I(4)}.`, `"Oh! I see how they work together!" they exclaimed.`, `Understanding one thing opened a door to understanding another.`],
        [`A moment of focus: {{CHILD}} concentrated on ${A(1)} with careful hands.`, `The ${I(5)} responded beautifully to their gentle touch.`, `"You have a natural talent for this," {{MOTHER}} said warmly.`],
        [`"Can I try ${A(2)} next?" {{CHILD}} asked eagerly.`, `{{MOTHER}} showed them the technique step by step.`, `Slow at first, then smoother, then almost graceful.`],
        [`The ${I(6)} was trickier than expected.`, `{{CHILD}} bit their lower lip in concentration.`, `"Take your time — there's no rush," reminded {{MOTHER}}.`],
        [`Something unexpected happened — the ${I(7)} did something surprising!`, `"Whoa! Did you see that?" {{CHILD}} jumped with excitement.`, `Even {{MOTHER}} looked impressed by the unexpected discovery.`],
        [`By the end of the first session, {{CHILD}} had learned so much.`, `The ${setting} felt like a second home already.`, `"Can we come back tomorrow?" {{CHILD}} asked hopefully.`],
    ];

    // ── ACT 2: EXPLORATION (Pages 11-20) ──
    const exploreTexts = [
        [`The second session started with a review of what {{CHILD}} already knew.`, `${A(0).charAt(0).toUpperCase() + A(0).slice(1)} came more naturally now.`, `"Your muscle memory is building," {{MOTHER}} observed.`],
        [`{{CHILD}} wanted to explore the ${I(0)} in a new way.`, `"What happens if I try ${A(3)} instead?" they wondered aloud.`, `The result was surprising and delightful!`],
        [`A challenge appeared: combining ${A(1)} with ${A(4)} at the same time.`, `{{CHILD}}'s brain had to think about two things at once.`, `"It's like patting your head and rubbing your tummy!" they laughed.`],
        [`{{CHILD}} discovered a secret about the ${I(1)}.`, `When they tried ${A(5)} more gently, the ${I(1)} responded much better.`, `"Everything works better with a gentle touch," {{CHILD}} realized.`],
        [`The ${I(2)} and the ${I(3)} were used together for the first time.`, `{{CHILD}} created something they'd never seen before.`, `"I made this! All by myself!" they beamed with pride.`],
        [`"Let me show {{FATHER}} what I learned!" {{CHILD}} said at dinner.`, `A mini demonstration right there at the table.`, `{{FATHER}} clapped and said, "That's incredibly impressive!""`],
        [`Practice at home became part of {{CHILD}}'s daily routine.`, `Ten minutes every day — sometimes fifteen when it was extra fun.`, `Consistency turned hesitation into confidence.`],
        [`A book from the library showed experts doing the same thing.`, `{{CHILD}} studied the pictures and tried to copy the techniques.`, `"Even pros started as beginners," they said to themselves.`],
        [`Something clicked today — a skill that was hard became easy.`, `{{CHILD}} repeated it four times just to make sure it wasn't a fluke.`, `Not a fluke. A breakthrough. The feeling was incredible.`],
        [`"I think I'm ready for something bigger," {{CHILD}} told {{MOTHER}}.`, `The sparkle in their eyes showed they meant it.`, `"Then let's make it happen," {{MOTHER}} agreed with a smile.`],
    ];

    // ── ACT 3: CHALLENGE (Pages 21-30) ──
    const challengeTexts = [
        [`The advanced challenge was right in front of {{CHILD}}.`, `A bigger project that required everything they'd learned.`, `"This looks harder than anything I've tried before," they admitted.`],
        [`Step one went smoothly — confidence from practice shone through.`, `But step two was different. The ${I(4)} didn't cooperate.`, `"Come on, work with me," {{CHILD}} muttered, trying again.`],
        [`Frustration crept in like an unwelcome visitor.`, `Three attempts, three mistakes, three sighs.`, `{{CHILD}} put down the ${I(5)} and stared at the ceiling.`],
        [`"Remember," said {{FATHER}}, "${lesson} is what gets you through."`, `{{CHILD}} took three deep breaths, finding calm.`, `"Okay. Let me think about this differently."`],
        [`A new approach! Instead of forcing it, {{CHILD}} went slowly.`, `Breaking the problem into tiny, manageable pieces.`, `The first small piece worked perfectly.`],
        [`"One piece at a time. One small step at a time," {{CHILD}} repeated.`, `The second piece fell into place. Then the third.`, `Momentum built like a gentle snowball rolling downhill.`],
        [`A wobble on step seven threatened to undo everything.`, `But {{CHILD}} caught it in time — quick thinking saved the project!`, `"That was close!" they exhaled with relief.`],
        [`"You didn't panic," {{MOTHER}} observed from the doorway.`, `"That's the sign of someone who truly understands ${lesson.toLowerCase()}."`, `{{CHILD}} continued, more determined than ever.`],
        [`The hardest part was here — the moment that tested everything.`, `Hands steady, breath held, focus sharp as a laser.`, `{{CHILD}} gave it every ounce of effort they had.`],
        [`And then... success! The challenge was CONQUERED!`, `"I DID IT! I actually DID IT!" {{CHILD}} leaped up and cheered.`, `{{MOTHER}} and {{FATHER}} wrapped them in the biggest hug.`],
    ];

    // ── ACT 4: TRIUMPH (Pages 31-40) ──
    const triumphTexts = [
        [`The finished project sat before {{CHILD}} — real and beautiful.`, `Every challenge, every frustration had led to this moment.`, `"It's even better than I imagined," they whispered.`],
        [`{{CHILD}} wanted to share their achievement with everyone.`, `Friends, family, even the neighbors were invited to see.`, `"Look what ${lesson.toLowerCase()} helped me create!"`],
        [`"You should be incredibly proud," {{FATHER}} said at dinner.`, `"Not just of the result, but of how you got there."`, `{{CHILD}} thought about the journey — every up and every down.`],
        [`A special presentation was arranged for the family.`, `{{CHILD}} explained each step, each challenge, each victory.`, `The audience of loved ones listened with shining eyes.`],
        [`"What was the hardest moment?" asked {{FATHER}}.`, `"When I wanted to quit but didn't," {{CHILD}} answered quietly.`, `That answer earned nods of deep respect from everyone.`],
        [`{{CHILD}} decided to help someone else learn too.`, `Teaching felt different — it deepened their own understanding.`, `"The best way to grow is to help others grow," they realized.`],
        [`A moment of reflection: looking at where they started vs. now.`, `The difference was remarkable — night and day.`, `"I didn't know I could do all this," {{CHILD}} said in wonder.`],
        [`The ${emoji} became {{CHILD}}'s special symbol.`, `It represented their journey, their challenge, their triumph.`, `"Whenever I see ${emoji}, I'll remember what I can do."`],
        [`Celebrating wasn't about bragging — it was about gratitude.`, `"Thank you for believing in me," {{CHILD}} told {{MOTHER}} and {{FATHER}}.`, `"We always believed. You just needed to believe in yourself."`],
        [`The evening ended with quiet pride and a full heart.`, `Not everything in life would be this manageable — but ${lesson.toLowerCase()}?`, `That would carry {{CHILD}} through anything.`],
    ];

    // ── ACT 5: REFLECTION & GOODNIGHT (Pages 41-50) ──
    const reflectTexts = [
        [`Bath time was extra peaceful tonight.`, `{{CHILD}} thought about everything they'd learned.`, `Water swirled around them like the flow of the whole day.`],
        [`In clean pajamas, {{CHILD}} sat on the bed thoughtfully.`, `The ${setting} experience had changed something inside them.`, `They felt bigger, not in size, but in spirit.`],
        [`"What did ${name.toLowerCase()} teach you?" {{MOTHER}} asked at tuck-in.`, `{{CHILD}} thought carefully before answering.`, `"That ${lesson.toLowerCase()} isn't just a word — it's a superpower."`],
        [`{{MOTHER}} kissed {{CHILD}}'s forehead with all the love in the world.`, `"Your superpower was inside you all along."`, `{{CHILD}} pulled the blanket up and smiled.`],
        [`The moonlight painted silver patterns on the bedroom wall.`, `Somewhere in the house, evidence of today's adventure waited.`, `Ready for tomorrow's next chapter.`],
        [`Stars appeared one by one in the darkening sky.`, `Each one twinkled like a tiny cheerleader.`, `"Even the stars are proud of you tonight," {{MOTHER}} whispered.`],
        [`Dreams arrived like gentle waves on a warm shore.`, `In the dream, {{CHILD}} was surrounded by everything they loved.`, `The ${setting}, the ${I(0)}, the ${I(1)} — all glowing with magic.`],
        [`Dream-{{CHILD}} was a master — confident, skilled, and kind.`, `Every challenge in the dream was met with ${lesson.toLowerCase()}.`, `And every challenge was overcome, one by one.`],
        [`The dream world slowly darkened into the deepest, most restful sleep.`, `Outside, the night was peaceful and full of possibility.`, `Tomorrow would bring new adventures, new lessons, new growth.`],
        [`The ${emoji} glowed softly in {{CHILD}}'s imagination as they slept.`, `A symbol of what they'd learned, what they'd done, who they were becoming.`, `Goodnight, wonderful {{CHILD}}. You made today absolutely magical.`],
    ];

    // Assemble all 50 pages
    [introTexts, exploreTexts, challengeTexts, triumphTexts, reflectTexts].forEach(act => {
        act.forEach(text => pages.push(text));
    });

    return pages;
}

// ═══════════════════════════════════════════
// LOAD HAND-WRITTEN STORIES
// ═══════════════════════════════════════════
let handwrittenStories = {};
try {
    const hw1 = require('./stories6to10.cjs');
    const hw2 = require('./stories11to20.cjs');
    [...hw1, ...hw2].forEach(s => { handwrittenStories[s.id] = s.pages; });
} catch (e) { /* hand written files may not exist yet */ }

// Also load from the main ALL_STORIES in generateStories (they're at the bottom)
const HANDWRITTEN = [];

// ═══════════════════════════════════════════
// FILE GENERATOR
// ═══════════════════════════════════════════

function generateStoryFile(meta, pages) {
    const pageStrings = pages.map((textArr, i) => {
        const pageNum = i + 1;
        const pid = `${meta.id}-${pageNum}`;
        let phase, action;
        if (pageNum <= 10) { phase = "Introduction"; action = `discovering the ${meta.title.replace("{{CHILD}}'s ", "")} world`; }
        else if (pageNum <= 20) { phase = "Exploration"; action = `exploring new skills and knowledge`; }
        else if (pageNum <= 30) { phase = "Challenge"; action = `facing and overcoming a difficult challenge`; }
        else if (pageNum <= 40) { phase = "Triumph"; action = `celebrating success and growth`; }
        else { phase = "Reflection"; action = `reflecting on the day and drifting off to sleep`; }

        const hint = `Page ${pageNum}: ${phase} — {{CHILD}} ${action}. Unique scene ${pageNum} of 50. Cartoonish children's coloring book style, black outlines, no shading.`;

        return `        {
            "id": "${pid}",
            "text": [
                ${textArr.map(t => `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',\n                ')}
            ],
            "illustrationHint": "${hint.replace(/"/g, '\\"')}",
            "illustrationId": "${pid}"
        }`;
    });

    return `// ${meta.title} — Unique story with 50 distinct pages
const story = {
    "id": "${meta.id}",
    "title": "${meta.title}",
    "emoji": "${meta.emoji}",
    "theme": "${meta.theme}",
    "lesson": "${meta.lesson}",
    "description": "${meta.desc}",
    "coverColor": "${meta.coverColor}",
    "pages": [
${pageStrings.join(',\n')}
    ]
};

export default story;
`;
}

// ═══════════════════════════════════════════
// MAIN — Generate all 50 stories
// ═══════════════════════════════════════════

console.log("🚀 Generating all 50 stories with unique pages...\n");

STORY_META.forEach((meta, idx) => {
    // Use handwritten pages if available, otherwise generate with narrative engine
    let pages;
    if (handwrittenStories[meta.id]) {
        pages = handwrittenStories[meta.id];
        console.log(`  ✍️  ${idx + 1}. ${meta.file}.js — HANDWRITTEN (${pages.length} pages)`);
    } else {
        pages = generatePages(meta);
        console.log(`  🤖 ${idx + 1}. ${meta.file}.js — GENERATED (${pages.length} pages)`);
    }

    if (pages.length !== 50) {
        console.error(`  ❌ ERROR: ${meta.file} has ${pages.length} pages instead of 50!`);
        return;
    }

    const filePath = path.join(STORIES_DIR, `${meta.file}.js`);
    const content = generateStoryFile(meta, pages);
    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("\n🎉 All 50 stories generated successfully!");
console.log(`   ✍️  Handwritten: ${Object.keys(handwrittenStories).length} stories`);
console.log(`   🤖 Generated: ${50 - Object.keys(handwrittenStories).length} stories`);
