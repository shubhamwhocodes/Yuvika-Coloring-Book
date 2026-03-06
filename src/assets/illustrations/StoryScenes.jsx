/**
 * StoryScenes.jsx — 50 unique scene backgrounds, one per story theme.
 * Replaces the shared 5-layout system with per-story visual identity.
 */
import React from 'react';
import { getThemeSprite } from './ThemeSprites';

const outlineStyle = {
    fill: 'none',
    stroke: '#2D2147',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

const fillableStyle = (regionId) => ({
    fill: '#FFFFFF',
    stroke: '#2D2147',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    cursor: 'pointer',
    'data-region': regionId
});

// ========== CHARACTERS ==========
function Child({ x = 0, y = 0, scale = 1, facing = 'right' }) {
    const flip = facing === 'left' ? -1 : 1;
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale * flip}, ${scale})`}>
            <circle cx="0" cy="-25" r="18" style={fillableStyle('child-head')} />
            <circle cx="6" cy="-28" r="2.5" fill="#2D2147" />
            <path d="M 2 -22 Q 6 -19 10 -22" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <rect x="-12" y="-8" width="24" height="35" rx="8" style={fillableStyle('child-body')} />
            <rect x="-14" y="27" width="11" height="18" rx="4" style={fillableStyle('child-leg-l')} />
            <rect x="3" y="27" width="11" height="18" rx="4" style={fillableStyle('child-leg-r')} />
            <path d="M -18 -30 Q 0 -50 18 -30" style={fillableStyle('child-hair')} />
        </g>
    );
}

function Parent({ x = 0, y = 0, scale = 1, gender = 'father' }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            <circle cx="0" cy="-35" r="20" style={fillableStyle(`${gender}-head`)} />
            <circle cx="7" cy="-38" r="2.5" fill="#2D2147" />
            <path d="M 3 -32 Q 7 -29 11 -32" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <rect x="-16" y="-15" width="32" height="45" rx="10" style={fillableStyle(`${gender}-body`)} />
            <rect x="-18" y="30" width="14" height="22" rx="5" style={fillableStyle(`${gender}-leg-l`)} />
            <rect x="4" y="30" width="14" height="22" rx="5" style={fillableStyle(`${gender}-leg-r`)} />
        </g>
    );
}

// ========== BASE SCENES ==========
function Sky({ children, groundY = 320, groundColor }) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('sky-bg')} />
            <circle cx="420" cy="60" r="30" style={fillableStyle('sun')} />
            {groundColor && <rect x="0" y={groundY} width="500" height={400 - groundY} style={fillableStyle(groundColor)} />}
            {children}
        </svg>
    );
}

function Room({ children, floorY = 310 }) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height={floorY} style={fillableStyle('wall-bg')} />
            <rect x="0" y={floorY} width="500" height={400 - floorY} style={fillableStyle('floor-bg')} />
            <line x1="0" y1={floorY} x2="500" y2={floorY} style={{ ...outlineStyle, strokeWidth: 2 }} />
            {children}
        </svg>
    );
}

// ========== PROCEDURAL SCENE RANDOMIZER ==========
// Procedurally manipulates shape children using the page number as a seed
const sRand = (seedStr) => {
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) {
        h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
    }
    const x = Math.sin(h) * 10000;
    return x - Math.floor(x);
};

const SceneRandomizer = ({ children, pageNum }) => {
    const randomizeElement = (element, pathContext = "root") => {
        if (!React.isValidElement(element)) return element;

        let newProps = { ...element.props };
        let shouldRender = true;
        const region = newProps.style?.['data-region'] || '';

        const isShape = typeof element.type === 'string' &&
            ['rect', 'circle', 'path', 'ellipse', 'polygon', 'g'].includes(element.type);

        if (isShape && region) {
            const isProtected = region.includes('child') ||
                region.includes('father') ||
                region.includes('mother') ||
                region.includes('bg') ||
                region.includes('sun');

            if (!isProtected && pageNum > 1) {
                // Group 50 pages into 5 phases + individual page variation
                const phase = Math.floor((pageNum - 1) / 10) + 1;
                const seed = `${region}_${pathContext}_${phase}_${pageNum}`;

                const rHide = sRand(seed + "hide");
                const rShiftX = sRand(seed + "X");
                const rShiftY = sRand(seed + "Y");

                // 25% chance to hide background elements (not groups) to change density
                if (rHide < 0.25 && element.type !== 'g') {
                    shouldRender = false;
                } else {
                    // Apply translation based on phase and page
                    const shiftX = (rShiftX - 0.5) * 60; // -30 to +30px X shift
                    const shiftY = (rShiftY - 0.5) * 15; // -7.5 to +7.5px Y shift
                    const existingTransform = newProps.transform || "";

                    // Carefully append translation to existing transform string
                    newProps.transform = `${existingTransform} translate(${shiftX.toFixed(1)}, ${shiftY.toFixed(1)})`.trim();
                }
            }
        }

        if (!shouldRender) return null;

        // Traverse custom components or DOM children
        if (newProps.children) {
            newProps.children = React.Children.map(newProps.children, (child, index) =>
                randomizeElement(child, `${pathContext}_${index}`)
            );
        }

        return React.cloneElement(element, newProps);
    };

    return randomizeElement(children);
};

// ========== SKILL STORIES ==========

export function potteryScene(p) {
    const isEven = p % 2 === 0;
    return (
        <Room>
            {/* Shelves */}
            <rect x="350" y="80" width="120" height="10" rx="2" style={fillableStyle('shelf1')} />
            <rect x="350" y="160" width="120" height="10" rx="2" style={fillableStyle('shelf2')} />
            {/* Pots on shelves */}
            <path d={`M 370 80 Q 385 ${60 + p} 400 80`} style={fillableStyle('pot1')} />
            <path d={`M 420 80 Q 435 ${55 + p % 5 * 3} 450 80`} style={fillableStyle('pot2')} />
            <path d={`M 380 160 Q 395 ${140 + p % 7 * 2} 410 160`} style={fillableStyle('pot3')} />
            {/* Pottery wheel */}
            <ellipse cx="200" cy="280" rx="50" ry="15" style={fillableStyle('wheel')} />
            <rect x="180" y="285" width="40" height="25" rx="5" style={fillableStyle('wheel-base')} />
            {/* Clay on wheel */}
            <path d="M 185 280 Q 200 250 215 280" style={fillableStyle('clay')} />
            <Child x={isEven ? 140 : 220} y={180} scale={0.8} facing={isEven ? 'right' : 'left'} />
            {p % 3 === 0 && <Parent x={50} y={140} scale={0.65} gender="mother" />}
        </Room>
    );
}

export function bakingScene(p) {
    return (
        <Room>
            {/* Kitchen counter */}
            <rect x="30" y="240" width="440" height="20" rx="3" style={fillableStyle('counter')} />
            <rect x="30" y="260" width="100" height="50" rx="3" style={fillableStyle('cabinet1')} />
            <rect x="370" y="260" width="100" height="50" rx="3" style={fillableStyle('cabinet2')} />
            {/* Oven */}
            <rect x="180" y="260" width="80" height="50" rx="3" style={fillableStyle('oven')} />
            <rect x="190" y="270" width="60" height="25" rx="2" style={fillableStyle('oven-glass')} />
            {/* Bowl and ingredients */}
            <ellipse cx={150 + p % 5 * 20} cy="230" rx="25" ry="12" style={fillableStyle('bowl')} />
            <circle cx={300 + p % 3 * 15} cy="225" r="8" style={fillableStyle('egg')} />
            <Child x={200} y={140} scale={0.8} />
            {p < 30 && <Parent x={350} y={120} scale={0.65} gender="mother" />}
        </Room>
    );
}

export function dancingScene(p) {
    return (
        <Room>
            {/* Dance studio mirror */}
            <rect x="50" y="60" width="400" height="180" rx="5" style={fillableStyle('mirror')} />
            <rect x="55" y="65" width="390" height="170" style={{ ...outlineStyle, strokeWidth: 1 }} />
            {/* Ballet barre */}
            <line x1="50" y1="250" x2="450" y2="250" style={{ ...outlineStyle, strokeWidth: 6 }} />
            <line x1="80" y1="250" x2="80" y2="310" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="420" y1="250" x2="420" y2="310" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Musical notes */}
            <text x={100 + p * 5 % 200} y="50" fontSize="20" fill="#2D2147" opacity="0.4">♪</text>
            <text x={250 + p * 7 % 150} y="45" fontSize="16" fill="#2D2147" opacity="0.3">♫</text>
            <Child x={250 + (p % 2) * 40 - 20} y={175} scale={0.85} facing={p % 2 === 0 ? 'right' : 'left'} />
        </Room>
    );
}

export function paintingScene(p) {
    return (
        <Room>
            {/* Large easel */}
            <line x1="280" y1="80" x2="250" y2="310" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="380" y1="80" x2="410" y2="310" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="330" y1="60" x2="330" y2="310" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Canvas on easel */}
            <rect x="270" y="90" width="120" height="150" rx="3" style={fillableStyle('canvas')} />
            {/* Paint splotches on canvas */}
            <circle cx={310 + p % 4 * 15} cy={140 + p % 3 * 20} r={10 + p % 3 * 3} style={fillableStyle('paint-blob1')} />
            <circle cx={340 - p % 5 * 8} cy={180 + p % 4 * 10} r={8 + p % 2 * 4} style={fillableStyle('paint-blob2')} />
            {/* Paint palette on floor */}
            <ellipse cx="120" cy="280" rx="40" ry="25" style={fillableStyle('palette')} />
            <circle cx="100" cy="275" r="6" style={fillableStyle('paint-red')} />
            <circle cx="120" cy="265" r="5" style={fillableStyle('paint-blue')} />
            <circle cx="140" cy="275" r="6" style={fillableStyle('paint-yellow')} />
            <Child x={180} y={170} scale={0.8} />
        </Room>
    );
}

export function buildingScene(p) {
    return (
        <Room>
            {/* Block tower */}
            <rect x={200} y={280 - p % 6 * 25} width="40" height="25" rx="2" style={fillableStyle('block1')} />
            <rect x={210} y={255 - p % 6 * 25} width="40" height="25" rx="2" style={fillableStyle('block2')} />
            <rect x={195} y={230 - p % 6 * 25} width="40" height="25" rx="2" style={fillableStyle('block3')} />
            {p > 10 && <rect x={205} y={205 - p % 6 * 10} width="40" height="25" rx="2" style={fillableStyle('block4')} />}
            {/* Scattered blocks */}
            <rect x="350" y="280" width="30" height="20" rx="3" style={fillableStyle('loose1')} />
            <rect x="390" y="275" width="25" height="25" rx="3" style={fillableStyle('loose2')} />
            <polygon points="80,300 95,270 110,300" style={fillableStyle('triangle-block')} />
            <Child x={140} y={180} scale={0.8} />
            {p % 4 === 0 && <Parent x={380} y={150} scale={0.6} gender="father" />}
        </Room>
    );
}

export function musicScene(p) {
    return (
        <Room>
            {/* Piano */}
            <rect x="250" y="200" width="200" height="100" rx="5" style={fillableStyle('piano-body')} />
            <rect x="255" y="195" width="190" height="20" rx="2" style={fillableStyle('piano-lid')} />
            {/* Piano keys */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <rect key={i} x={260 + i * 18} y="220" width="16" height="40" rx="1" style={fillableStyle(`key-${i}`)} />
            ))}
            {/* Musical notes floating */}
            <text x={80 + p * 8 % 150} y={80 + p * 3 % 60} fontSize="24" fill="#2D2147" opacity="0.5">♫</text>
            <text x={200 + p * 11 % 100} y={60 + p * 5 % 50} fontSize="18" fill="#2D2147" opacity="0.4">♪</text>
            <text x={350 + p * 3 % 80} y={90 + p * 7 % 40} fontSize="20" fill="#2D2147" opacity="0.3">♩</text>
            <Child x={200} y={140} scale={0.8} />
        </Room>
    );
}

export function scienceScene(p) {
    return (
        <Room>
            {/* Lab table */}
            <rect x="80" y="240" width="340" height="15" rx="3" style={fillableStyle('lab-table')} />
            <rect x="100" y="255" width="10" height="55" style={outlineStyle} />
            <rect x="390" y="255" width="10" height="55" style={outlineStyle} />
            {/* Beakers and flasks */}
            <path d="M 130 240 L 120 200 L 160 200 L 150 240" style={fillableStyle('flask1')} />
            <ellipse cx="140" cy="200" rx="20" ry="5" style={fillableStyle('flask1-top')} />
            <circle cx="140" cy="180" r="5" style={fillableStyle('bubble1')} />
            <circle cx="150" cy="170" r="3" style={fillableStyle('bubble2')} />
            {/* Test tubes */}
            <rect x="250" y="200" width="12" height="40" rx="6" style={fillableStyle('tube1')} />
            <rect x="275" y="210" width="12" height="30" rx="6" style={fillableStyle('tube2')} />
            <rect x="300" y="205" width="12" height="35" rx="6" style={fillableStyle('tube3')} />
            {/* Microscope */}
            <rect x="360" y="210" width="30" height="30" rx="3" style={fillableStyle('microscope-base')} />
            <line x1="375" y1="210" x2="375" y2="170" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <circle cx="375" cy="165" r="10" style={fillableStyle('microscope-lens')} />
            <Child x={200} y={140} scale={0.75} />
        </Room>
    );
}

export function cookingScene(p) {
    return (
        <Room>
            {/* Stove/counter */}
            <rect x="50" y="240" width="400" height="20" rx="3" style={fillableStyle('counter2')} />
            {/* Stove burners */}
            <circle cx="150" cy="235" r="20" style={fillableStyle('burner1')} />
            <circle cx="250" cy="235" r="20" style={fillableStyle('burner2')} />
            {/* Pan on stove */}
            <ellipse cx="150" cy="220" rx="30" ry="8" style={fillableStyle('pan')} />
            <line x1="180" y1="220" x2="220" y2="210" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Pot on stove */}
            <rect x="230" y="200" width="40" height="30" rx="3" style={fillableStyle('pot')} />
            <ellipse cx="250" cy="200" rx="22" ry="5" style={fillableStyle('pot-lid')} />
            {/* Steam */}
            <path d={`M 245 190 Q 240 ${175 - p % 5 * 3} 250 160`} style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.4 }} />
            <path d={`M 255 190 Q 260 ${170 - p % 4 * 4} 255 155`} style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.3 }} />
            {/* Vegetables */}
            <circle cx="380" cy="230" r="8" style={fillableStyle('tomato')} />
            <rect x="400" y="225" width="25" height="8" rx="4" style={fillableStyle('carrot')} />
            <Child x={300} y={140} scale={0.75} />
            {p < 25 && <Parent x={80} y={120} scale={0.65} gender="father" />}
        </Room>
    );
}

export function gardeningScene(p) {
    return (
        <Sky groundY={300} groundColor="garden-dirt">
            {/* Fence */}
            {[50, 100, 150, 200, 250, 300, 350, 400, 450].map(fx => (
                <rect key={fx} x={fx - 5} y="260" width="10" height="40" rx="2" style={fillableStyle('fence-post')} />
            ))}
            <line x1="40" y1="270" x2="460" y2="270" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="40" y1="285" x2="460" y2="285" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Growing plants */}
            <line x1="120" y1="300" x2="120" y2={260 - p % 8 * 3} style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="120" cy={255 - p % 8 * 3} r="8" style={fillableStyle('flower1')} />
            <line x1="250" y1="300" x2="250" y2={270 - p % 6 * 4} style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="250" cy={265 - p % 6 * 4} r="6" style={fillableStyle('flower2')} />
            <line x1="370" y1="300" x2="370" y2={265 - p % 7 * 3} style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="370" cy={260 - p % 7 * 3} r="7" style={fillableStyle('flower3')} />
            {/* Watering can */}
            <path d="M 60 285 L 55 260 L 90 260 L 85 285 Z" style={fillableStyle('watering-can')} />
            <line x1="90" y1="268" x2="110" y2="255" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <Child x={200} y={195} scale={0.75} />
        </Sky>
    );
}

export function codingScene(p) {
    return (
        <Room>
            {/* Desk */}
            <rect x="100" y="230" width="300" height="15" rx="3" style={fillableStyle('desk')} />
            <rect x="120" y="245" width="10" height="65" style={outlineStyle} />
            <rect x="370" y="245" width="10" height="65" style={outlineStyle} />
            {/* Monitor */}
            <rect x="160" y="120" width="180" height="110" rx="8" style={fillableStyle('monitor')} />
            <rect x="170" y="130" width="160" height="85" style={fillableStyle('screen')} />
            <rect x="235" y="230" width="30" height="5" style={outlineStyle} />
            <line x1="250" y1="225" x2="250" y2="230" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Code lines on screen */}
            <line x1="180" y1="145" x2={220 + p % 5 * 10} y2="145" style={{ ...outlineStyle, strokeWidth: 2, opacity: 0.5 }} />
            <line x1="185" y1="160" x2={240 + p % 4 * 8} y2="160" style={{ ...outlineStyle, strokeWidth: 2, opacity: 0.4 }} />
            <line x1="180" y1="175" x2={210 + p % 6 * 7} y2="175" style={{ ...outlineStyle, strokeWidth: 2, opacity: 0.5 }} />
            <line x1="190" y1="190" x2={230 + p % 3 * 12} y2="190" style={{ ...outlineStyle, strokeWidth: 2, opacity: 0.3 }} />
            {/* Keyboard */}
            <rect x="180" y="215" width="140" height="15" rx="2" style={fillableStyle('keyboard')} />
            <Child x={250} y={140} scale={0.7} />
        </Room>
    );
}

// Export the scene map for Skill stories
export const skillScenes = {
    'pottery-class': potteryScene,
    'baking-day': bakingScene,
    'dancing-dreams': dancingScene,
    'painting-party': paintingScene,
    'building-blocks': buildingScene,
    'music-school': musicScene,
    'little-scientist': scienceScene,
    'junior-chef': cookingScene,
    'young-gardener': gardeningScene,
    'star-coder': codingScene,
};

// ========== FAMILY STORIES ==========

export function puppyLivingRoom(p) {
    return (
        <Room>
            {/* Couch */}
            <rect x="50" y="200" width="200" height="80" rx="10" style={fillableStyle('couch')} />
            <rect x="40" y="190" width="30" height="100" rx="8" style={fillableStyle('couch-arm-l')} />
            <rect x="240" y="190" width="30" height="100" rx="8" style={fillableStyle('couch-arm-r')} />
            {/* TV */}
            <rect x="340" y="100" width="120" height="80" rx="5" style={fillableStyle('tv')} />
            <rect x="390" y="180" width="20" height="30" style={outlineStyle} />
            {/* Dog bowl */}
            <ellipse cx={350 + p % 3 * 20} cy="295" rx="20" ry="8" style={fillableStyle('dog-bowl')} />
            {/* Bone toy */}
            <path d={`M ${80 + p % 5 * 30} 300 l 30 0`} style={{ ...outlineStyle, strokeWidth: 6, strokeLinecap: 'round' }} />
            <Child x={150} y={130} scale={0.75} />
            {p % 3 === 0 && <Parent x={350} y={120} scale={0.6} gender="father" />}
        </Room>
    );
}

export function rainyWindowScene(p) {
    return (
        <Room>
            {/* Large window */}
            <rect x="150" y="60" width="200" height="180" rx="5" style={fillableStyle('window')} />
            <line x1="250" y1="60" x2="250" y2="240" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="150" y1="150" x2="350" y2="150" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Rain drops */}
            {[170, 200, 230, 280, 310, 330].map((rx, i) => (
                <line key={i} x1={rx} y1={80 + (p * 7 + i * 20) % 80} x2={rx - 3} y2={90 + (p * 7 + i * 20) % 80} style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.5 }} />
            ))}
            {/* Umbrella on floor */}
            <path d="M 420 250 Q 450 200 480 250" style={fillableStyle('umbrella')} />
            <line x1="450" y1="250" x2="450" y2="310" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Art supplies scattered */}
            <rect x="60" y="280" width="40" height="6" rx="2" style={fillableStyle('crayon1')} />
            <rect x="80" y="290" width="35" height="6" rx="2" style={fillableStyle('crayon2')} />
            <Child x={100} y={160} scale={0.8} />
            {p < 20 && <Parent x={380} y={130} scale={0.6} gender="mother" />}
        </Room>
    );
}

export function nurseryScene(p) {
    return (
        <Room>
            {/* Crib */}
            <rect x="280" y="200" width="150" height="100" rx="5" style={fillableStyle('crib')} />
            <line x1="290" y1="200" x2="290" y2="300" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="310" y1="200" x2="310" y2="300" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="330" y1="200" x2="330" y2="300" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="400" y1="200" x2="400" y2="300" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="420" y1="200" x2="420" y2="300" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Mobile above crib */}
            <line x1="355" y1="100" x2="355" y2="150" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="330" cy="160" r="8" style={fillableStyle('mobile-star')} />
            <circle cx="355" cy="165" r="6" style={fillableStyle('mobile-moon')} />
            <circle cx="380" cy="160" r="8" style={fillableStyle('mobile-heart')} />
            {/* Toys on floor */}
            <circle cx="100" cy="290" r="12" style={fillableStyle('ball-toy')} />
            <rect x="150" y="280" width="20" height="25" rx="3" style={fillableStyle('block-toy')} />
            <Child x={180} y={160} scale={0.75} />
            <Parent x={60} y={130} scale={0.6} gender="mother" />
        </Room>
    );
}

export function grandparentScene(p) {
    return (
        <Sky groundY={310} groundColor="porch-ground">
            {/* Porch/house front */}
            <rect x="0" y="100" width="500" height="210" style={fillableStyle('house-wall')} />
            <rect x="0" y="100" width="500" height="15" style={fillableStyle('roof-edge')} />
            {/* Door */}
            <rect x="200" y="150" width="100" height="160" rx="3" style={fillableStyle('door')} />
            <circle cx="285" cy="230" r="5" style={fillableStyle('doorknob')} />
            {/* Windows */}
            <rect x="60" y="170" width="80" height="60" rx="3" style={fillableStyle('window-l')} />
            <line x1="100" y1="170" x2="100" y2="230" style={outlineStyle} />
            <rect x="360" y="170" width="80" height="60" rx="3" style={fillableStyle('window-r')} />
            <line x1="400" y1="170" x2="400" y2="230" style={outlineStyle} />
            {/* Rocking chair */}
            <path d="M 80 290 Q 100 270 120 290 Q 100 310 80 290" style={fillableStyle('rocking-chair')} />
            <Child x={300} y={200} scale={0.7} />
            <Parent x={120} y={160} scale={0.6} gender="father" />
        </Sky>
    );
}

export function birthdayPartyScene(p) {
    return (
        <Room>
            {/* Balloon bunches */}
            {[80, 180, 320, 420].map((bx, i) => (
                <g key={i}>
                    <circle cx={bx} cy={60 + i * 10} r="18" style={fillableStyle(`balloon-${i}`)} />
                    <line x1={bx} y1={78 + i * 10} x2={bx} y2={140 + i * 5} style={{ ...outlineStyle, strokeWidth: 1 }} />
                </g>
            ))}
            {/* Banner */}
            <line x1="50" y1="100" x2="450" y2="100" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {['H', 'A', 'P', 'P', 'Y'].map((l, i) => (
                <polygon key={i} points={`${110 + i * 70},100 ${120 + i * 70},125 ${140 + i * 70},125 ${150 + i * 70},100`} style={fillableStyle(`flag-${i}`)} />
            ))}
            {/* Cake on table */}
            <rect x="180" y="260" width="140" height="15" rx="3" style={fillableStyle('table-top')} />
            <rect x="220" y="220" width="60" height="40" rx="3" style={fillableStyle('cake')} />
            <line x1="250" y1="220" x2="250" y2="205" style={outlineStyle} />
            <path d="M 247 205 Q 250 195 253 205 Z" style={fillableStyle('candle-flame')} />
            {/* Presents */}
            <rect x="380" y="270" width="30" height="25" rx="2" style={fillableStyle('gift1')} />
            <rect x="420" y="265" width="35" height="30" rx="2" style={fillableStyle('gift2')} />
            <Child x={150} y={160} scale={0.75} />
        </Room>
    );
}

export function helpingScene(p) {
    return (
        <Room>
            {/* Grocery shelves */}
            <rect x="300" y="80" width="170" height="12" rx="2" style={fillableStyle('shelf-a')} />
            <rect x="300" y="160" width="170" height="12" rx="2" style={fillableStyle('shelf-b')} />
            <rect x="300" y="240" width="170" height="12" rx="2" style={fillableStyle('shelf-c')} />
            {/* Items on shelves */}
            <rect x="320" y="60" width="18" height="20" rx="2" style={fillableStyle('box1')} />
            <rect x="350" y="55" width="18" height="25" rx="2" style={fillableStyle('box2')} />
            <circle cx="400" cy="70" r="8" style={fillableStyle('can1')} />
            <rect x="330" y="140" width="15" height="20" rx="2" style={fillableStyle('box3')} />
            <circle cx="420" cy="150" r="7" style={fillableStyle('can2')} />
            {/* Shopping cart */}
            <rect x="80" y="230" width="100" height="60" rx="5" style={fillableStyle('cart')} />
            <circle cx="100" cy="300" r="10" style={fillableStyle('cart-wheel1')} />
            <circle cx="160" cy="300" r="10" style={fillableStyle('cart-wheel2')} />
            <line x1="80" y1="240" x2="60" y2="200" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <Child x={200} y={160} scale={0.75} />
            <Parent x={60} y={120} scale={0.6} gender="mother" />
        </Room>
    );
}

export function movingScene(p) {
    return (
        <Sky groundY={320} groundColor="road">
            {/* Moving truck */}
            <rect x="150" y="200" width="200" height="120" rx="5" style={fillableStyle('truck-box')} />
            <rect x="350" y="250" width="80" height="70" rx="5" style={fillableStyle('truck-cab')} />
            <rect x="360" y="260" width="40" height="30" rx="3" style={fillableStyle('truck-window')} />
            <circle cx="200" cy="330" r="20" style={fillableStyle('truck-wheel1')} />
            <circle cx="300" cy="330" r="20" style={fillableStyle('truck-wheel2')} />
            <circle cx="400" cy="330" r="20" style={fillableStyle('truck-wheel3')} />
            {/* Boxes in truck */}
            <rect x="170" y="250" width="40" height="35" rx="2" style={fillableStyle('move-box1')} />
            <rect x="220" y="240" width="45" height="45" rx="2" style={fillableStyle('move-box2')} />
            <rect x="280" y="255" width="35" height="30" rx="2" style={fillableStyle('move-box3')} />
            {/* House in background */}
            <rect x="30" y="200" width="80" height="120" rx="3" style={fillableStyle('old-house')} />
            <polygon points="30,200 70,160 110,200" style={fillableStyle('old-roof')} />
            <Child x={70} y={130} scale={0.6} />
        </Sky>
    );
}

export function familyPicnicScene(p) {
    return (
        <Sky groundY={290} groundColor="grass">
            {/* Trees */}
            <polygon points="50,180 80,100 110,180" style={fillableStyle('tree-l')} />
            <rect x="75" y="180" width="10" height="110" style={fillableStyle('trunk-l')} />
            <polygon points="400,160 440,80 480,160" style={fillableStyle('tree-r')} />
            <rect x="435" y="160" width="10" height="130" style={fillableStyle('trunk-r')} />
            {/* Blanket */}
            <path d="M 150 300 L 350 300 L 370 370 L 130 370 Z" style={fillableStyle('blanket')} />
            {/* Food items */}
            <rect x="200" y="285" width="30" height="20" rx="3" style={fillableStyle('basket')} />
            <path d="M 200 285 Q 215 270 230 285" style={outlineStyle} />
            <circle cx="270" cy="295" r="8" style={fillableStyle('apple')} />
            <rect x="290" y="288" width="20" height="12" rx="2" style={fillableStyle('sandwich')} />
            <Child x={220} y={195} scale={0.7} />
            <Parent x={100} y={155} scale={0.6} gender="father" />
            <Parent x={350} y={155} scale={0.6} gender="mother" />
        </Sky>
    );
}

export function bedtimeScene(p) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" fill="#2d3436" />
            <path d="M 380 60 A 25 25 0 1 0 420 45 A 30 30 0 1 1 380 60 Z" style={fillableStyle('moon')} />
            {[80, 160, 250, 340, 440].map((sx, i) => (
                <circle key={i} cx={sx} cy={30 + i * 15} r={1.5 + i % 2} fill="#FFFFFF" />
            ))}
            <rect x="0" y="250" width="500" height="150" fill="#636e72" />
            {/* Bed */}
            <rect x="80" y="270" width="250" height="50" rx="5" style={fillableStyle('bed')} />
            <rect x="60" y="230" width="30" height="100" rx="5" style={fillableStyle('headboard')} />
            {/* Blanket */}
            <path d="M 120 270 Q 210 250 310 270 L 310 320 L 120 320 Z" style={fillableStyle('blanket')} />
            {/* Bookshelf */}
            <rect x="380" y="260" width="80" height="10" rx="2" style={fillableStyle('bshelf')} />
            <rect x="390" y="245" width="12" height="15" rx="1" style={fillableStyle('book1')} />
            <rect x="405" y="242" width="12" height="18" rx="1" style={fillableStyle('book2')} />
            <rect x="420" y="247" width="12" height="13" rx="1" style={fillableStyle('book3')} />
            <Child x={200} y={200} scale={0.6} />
            <Parent x={380} y={160} scale={0.6} gender="mother" />
        </svg>
    );
}

export function morningScene(p) {
    return (
        <Room>
            {/* Breakfast table */}
            <rect x="100" y="230" width="300" height="15" rx="3" style={fillableStyle('table')} />
            <rect x="120" y="245" width="10" height="65" style={outlineStyle} />
            <rect x="370" y="245" width="10" height="65" style={outlineStyle} />
            {/* Plates and food */}
            <circle cx="200" cy="220" r="20" style={fillableStyle('plate1')} />
            <circle cx="200" cy="220" r="12" style={fillableStyle('pancake')} />
            <circle cx="320" cy="220" r="20" style={fillableStyle('plate2')} />
            <rect x="310" y="212" width="20" height="10" rx="2" style={fillableStyle('toast')} />
            {/* Glass of juice */}
            <rect x="250" y="205" width="15" height="25" rx="2" style={fillableStyle('juice')} />
            {/* Window with morning sun */}
            <rect x="350" y="60" width="120" height="100" rx="3" style={fillableStyle('morning-window')} />
            <circle cx="410" cy="95" r="20" style={fillableStyle('morning-sun')} />
            <Child x={200} y={130} scale={0.75} />
            <Parent x={80} y={110} scale={0.6} gender="father" />
        </Room>
    );
}

export const familyScenes = {
    'puppy-story': puppyLivingRoom,
    'rainy-day': rainyWindowScene,
    'new-baby': nurseryScene,
    'grandparents-visit': grandparentScene,
    'birthday-party': birthdayPartyScene,
    'helping-hands': helpingScene,
    'moving-house': movingScene,
    'family-picnic': familyPicnicScene,
    'bedtime-story': bedtimeScene,
    'morning-routine': morningScene,
};

// ========== LEARNING STORIES ==========

export function rainbowScene(p) {
    return (
        <Sky groundY={320} groundColor="grass-field">
            {/* Rainbow arcs */}
            {[50, 60, 70, 80, 90, 100, 110].map((r, i) => (
                <path key={i} d={`M ${250 - r} 200 A ${r} ${r} 0 0 1 ${250 + r} 200`} style={{ ...outlineStyle, strokeWidth: 8 }} />
            ))}
            <Child x={250} y={210} scale={0.8} />
            <Parent x={80} y={170} scale={0.6} gender="mother" />
        </Sky>
    );
}

export function numberScene(p) {
    return (
        <Room>
            {/* Chalkboard */}
            <rect x="80" y="60" width="340" height="200" rx="5" style={fillableStyle('chalkboard')} />
            <rect x="75" y="55" width="350" height="210" rx="8" style={outlineStyle} />
            {/* Numbers on board */}
            <g style={{ fontSize: '40px', fontWeight: 'bold', fill: '#FFFFFF', stroke: '#2D2147', strokeWidth: 1.5 }}>
                <text x="120" y="130">{1 + p % 9}</text>
                <text x="200" y="160">{2 + p % 8}</text>
                <text x="300" y="120">{3 + p % 7}</text>
            </g>
            {/* Desk */}
            <rect x="150" y="290" width="200" height="12" rx="3" style={fillableStyle('desk')} />
            <Child x={250} y={200} scale={0.75} />
        </Room>
    );
}

export function shapeScene(p) {
    return (
        <Sky groundY={330} groundColor="playground-ground">
            {/* Playground with shapes */}
            <rect x="60" y="200" width="80" height="80" rx="3" style={fillableStyle('shape-square')} />
            <circle cx="250" cy="230" r="50" style={fillableStyle('shape-circle')} />
            <polygon points="400,170 450,270 350,270" style={fillableStyle('shape-triangle')} />
            {/* Slide (like a triangle) */}
            <line x1="200" y1="300" x2="300" y2="200" style={{ ...outlineStyle, strokeWidth: 6 }} />
            <line x1="300" y1="200" x2="300" y2="300" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <Child x={150} y={220} scale={0.7} />
        </Sky>
    );
}

export function animalScene(p) {
    return (
        <Sky groundY={300} groundColor="farm-grass">
            {/* Barn */}
            <rect x="320" y="160" width="150" height="140" style={fillableStyle('barn')} />
            <polygon points="320,160 395,100 470,160" style={fillableStyle('barn-roof')} />
            <rect x="370" y="220" width="50" height="80" style={fillableStyle('barn-door')} />
            {/* Fence */}
            {[50, 90, 130, 170, 210, 250].map(fx => (
                <rect key={fx} x={fx} y="270" width="6" height="30" style={outlineStyle} />
            ))}
            <line x1="50" y1="278" x2="256" y2="278" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="50" y1="290" x2="256" y2="290" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Chicken */}
            <ellipse cx="120" cy="285" rx="12" ry="8" style={fillableStyle('chicken')} />
            <circle cx="132" cy="278" r="5" style={fillableStyle('chicken-head')} />
            <Child x={200} y={190} scale={0.7} />
        </Sky>
    );
}

export function seasonsScene(p) {
    return (
        <Sky groundY={310} groundColor="season-ground">
            {/* Big tree with 4 quarters */}
            <rect x="235" y="200" width="30" height="110" style={fillableStyle('tree-trunk')} />
            <circle cx="250" cy="160" r="80" style={fillableStyle('tree-crown')} />
            <line x1="250" y1="80" x2="250" y2="240" style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.3 }} />
            <line x1="170" y1="160" x2="330" y2="160" style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.3 }} />
            {/* Falling leaves */}
            <path d={`M ${350 + p % 3 * 15} ${100 + p * 3 % 60} q 5 -8 10 0 q -5 8 -10 0`} style={fillableStyle('leaf1')} />
            <path d={`M ${80 + p % 4 * 10} ${120 + p * 5 % 50} q 5 -8 10 0 q -5 8 -10 0`} style={fillableStyle('leaf2')} />
            <Child x={100} y={200} scale={0.7} />
        </Sky>
    );
}

export function weatherScene(p) {
    return (
        <Sky groundY={330} groundColor="ground">
            {/* Big cloud */}
            <ellipse cx="200" cy="80" rx="60" ry="30" style={fillableStyle('cloud1')} />
            <ellipse cx="160" cy="90" rx="40" ry="25" style={fillableStyle('cloud2')} />
            <ellipse cx="240" cy="90" rx="40" ry="25" style={fillableStyle('cloud3')} />
            {/* Lightning bolt */}
            <polygon points="210,110 195,150 210,145 195,180 220,140 205,145" style={fillableStyle('lightning')} />
            {/* Rain */}
            {[150, 180, 210, 240, 270].map((rx, i) => (
                <line key={i} x1={rx} y1={125 + i * 5} x2={rx - 5} y2={140 + i * 5} style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.4 }} />
            ))}
            {/* Weather station */}
            <rect x="380" y="200" width="60" height="100" rx="3" style={fillableStyle('station')} />
            <circle cx="410" cy="230" r="15" style={fillableStyle('thermometer')} />
            <Child x={300} y={220} scale={0.7} />
        </Sky>
    );
}

export function planetScene(p) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" fill="#1a1a2e" />
            {/* Stars */}
            {[30, 80, 150, 220, 300, 380, 440, 70, 180, 350].map((sx, i) => (
                <circle key={i} cx={sx} cy={20 + (i * 37) % 120} r={1 + i % 3} fill="#FFFFFF" />
            ))}
            {/* Large planet */}
            <circle cx="300" cy="200" r="80" style={fillableStyle('planet')} />
            <ellipse cx="300" cy="200" rx="120" ry="20" transform="rotate(-20 300 200)" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {/* Small planet */}
            <circle cx="100" cy="100" r="25" style={fillableStyle('small-planet')} />
            {/* Telescope */}
            <rect x="50" y="300" width="8" height="80" style={outlineStyle} />
            <line x1="54" y1="300" x2="100" y2="260" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <circle cx="105" cy="255" r="12" style={fillableStyle('lens')} />
            <Child x={180} y={260} scale={0.7} />
        </svg>
    );
}

export function fruitScene(p) {
    return (
        <Sky groundY={310} groundColor="orchard-ground">
            {/* Apple trees */}
            <rect x="75" y="180" width="15" height="130" style={fillableStyle('trunk1')} />
            <circle cx="82" cy="150" r="50" style={fillableStyle('foliage1')} />
            <circle cx="60" cy="130" r="8" style={fillableStyle('apple1')} />
            <circle cx="100" cy="140" r="7" style={fillableStyle('apple2')} />
            <circle cx="75" cy="170" r="8" style={fillableStyle('apple3')} />
            {/* Orange tree */}
            <rect x="375" y="190" width="15" height="120" style={fillableStyle('trunk2')} />
            <circle cx="382" cy="160" r="45" style={fillableStyle('foliage2')} />
            <circle cx="365" cy="145" r="7" style={fillableStyle('orange1')} />
            <circle cx="400" cy="155" r="8" style={fillableStyle('orange2')} />
            {/* Basket */}
            <path d="M 220 290 L 210 260 L 290 260 L 280 290 Z" style={fillableStyle('fruit-basket')} />
            <path d="M 220 260 Q 250 240 280 260" style={outlineStyle} />
            <Child x={250} y={190} scale={0.75} />
        </Sky>
    );
}

export function vegetableScene(p) {
    return (
        <Sky groundY={290} groundColor="soil">
            {/* Garden rows */}
            <line x1="50" y1="300" x2="450" y2="300" style={{ ...outlineStyle, strokeWidth: 1, opacity: 0.3 }} />
            <line x1="50" y1="330" x2="450" y2="330" style={{ ...outlineStyle, strokeWidth: 1, opacity: 0.3 }} />
            <line x1="50" y1="360" x2="450" y2="360" style={{ ...outlineStyle, strokeWidth: 1, opacity: 0.3 }} />
            {/* Carrots poking up */}
            {[100, 160, 220, 300, 380].map((cx, i) => (
                <g key={i}>
                    <path d={`M ${cx - 4} 300 Q ${cx} ${280 - i * 2} ${cx + 4} 300`} style={outlineStyle} />
                    <path d={`M ${cx - 2} 300 Q ${cx - 8} ${285} ${cx - 6} ${275}`} style={{ ...outlineStyle, strokeWidth: 1.5 }} />
                    <path d={`M ${cx + 2} 300 Q ${cx + 8} ${282} ${cx + 6} ${272}`} style={{ ...outlineStyle, strokeWidth: 1.5 }} />
                </g>
            ))}
            {/* Watering can */}
            <path d="M 400 260 L 395 240 L 430 240 L 425 260 Z" style={fillableStyle('water-can')} />
            <line x1="430" y1="245" x2="450" y2="235" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <Child x={250} y={185} scale={0.75} />
        </Sky>
    );
}

export function oceanScene(p) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('ocean-bg')} />
            {/* Waves */}
            <path d="M 0 100 Q 60 80 120 100 Q 180 120 240 100 Q 300 80 360 100 Q 420 120 500 100" style={{ ...outlineStyle, strokeWidth: 2, opacity: 0.3 }} />
            {/* Coral */}
            <path d="M 50 350 Q 30 300 60 280 Q 80 260 70 350" style={fillableStyle('coral1')} />
            <path d="M 400 370 Q 380 320 410 300 Q 430 280 420 370" style={fillableStyle('coral2')} />
            {/* Fish */}
            <ellipse cx="200" cy="200" rx="25" ry="15" style={fillableStyle('fish1')} />
            <polygon points="175,200 160,185 160,215" style={fillableStyle('fish1-tail')} />
            <circle cx="215" cy="197" r="3" fill="#2D2147" />
            {/* Smaller fish */}
            <ellipse cx={320 + p % 3 * 20} cy={250 - p % 4 * 10} rx="15" ry="8" style={fillableStyle('fish2')} />
            <polygon points={`${305 + p % 3 * 20},${250 - p % 4 * 10} ${295 + p % 3 * 20},${242 - p % 4 * 10} ${295 + p % 3 * 20},${258 - p % 4 * 10}`} style={fillableStyle('fish2-tail')} />
            {/* Bubbles */}
            <circle cx={280} cy={150 + p % 5 * 10} r="5" style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.5 }} />
            <circle cx={290} cy={130 + p % 4 * 8} r="3" style={{ ...outlineStyle, strokeWidth: 1, opacity: 0.4 }} />
            <Child x={100} y={250} scale={0.65} />
        </svg>
    );
}

export const learningScenes = {
    'colors-adventure': rainbowScene,
    'number-magic': numberScene,
    'shape-hunters': shapeScene,
    'animal-friends': animalScene,
    'seasons-change': seasonsScene,
    'weather-wonders': weatherScene,
    'planet-explorer': planetScene,
    'fruit-garden': fruitScene,
    'vegetable-patch': vegetableScene,
    'ocean-life': oceanScene,
};

// ========== OUTDOOR STORIES ==========

export function zooScene(p) {
    return (
        <Sky groundY={320} groundColor="zoo-path">
            <rect x="180" y="100" width="20" height="220" style={fillableStyle('gate-l')} />
            <rect x="300" y="100" width="20" height="220" style={fillableStyle('gate-r')} />
            <path d="M 180 100 Q 250 60 320 100" style={{ ...outlineStyle, strokeWidth: 5 }} />
            <text x="215" y="90" fontSize="18" fill="#2D2147" fontWeight="bold">ZOO</text>
            <ellipse cx="100" cy="280" rx="25" ry="15" style={fillableStyle('bush1')} />
            <ellipse cx="400" cy="275" rx="30" ry="18" style={fillableStyle('bush2')} />
            <Child x={250} y={200} scale={0.7} />
            <Parent x={80} y={170} scale={0.6} gender="father" />
        </Sky>
    );
}

export function parkScene(p) {
    return (
        <Sky groundY={310} groundColor="park-grass">
            {/* Swing set */}
            <line x1="100" y1="120" x2="100" y2="310" style={{ ...outlineStyle, strokeWidth: 5 }} />
            <line x1="250" y1="120" x2="250" y2="310" style={{ ...outlineStyle, strokeWidth: 5 }} />
            <line x1="90" y1="120" x2="260" y2="120" style={{ ...outlineStyle, strokeWidth: 5 }} />
            <line x1="150" y1="120" x2="140" y2="250" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <line x1="170" y1="120" x2="180" y2="250" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <rect x="135" y="250" width="50" height="8" rx="2" style={fillableStyle('seat')} />
            {/* Slide */}
            <line x1="350" y1="150" x2="450" y2="290" style={{ ...outlineStyle, strokeWidth: 6 }} />
            <line x1="350" y1="150" x2="350" y2="290" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <Child x={160} y={175} scale={0.65} />
        </Sky>
    );
}

export function beachScene(p) {
    return (
        <Sky groundY={280} groundColor="sand">
            <rect x="0" y="280" width="500" height="120" style={fillableStyle('beach-sand')} />
            <path d="M 0 280 Q 125 260 250 280 Q 375 300 500 280" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {/* Umbrella */}
            <path d="M 320 160 A 50 50 0 0 1 420 160 Z" style={fillableStyle('umbrella')} />
            <line x1="370" y1="160" x2="370" y2="310" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Sandcastle */}
            <rect x="100" y="280" width="60" height="30" rx="2" style={fillableStyle('castle-base')} />
            <rect x="105" y="265" width="20" height="20" rx="1" style={fillableStyle('tower-l')} />
            <rect x="135" y="265" width="20" height="20" rx="1" style={fillableStyle('tower-r')} />
            <Child x={200} y={190} scale={0.7} />
        </Sky>
    );
}

export function gardenPathScene(p) {
    return (
        <Sky groundY={300} groundColor="garden-path-ground">
            <path d="M 250 400 Q 200 350 250 300 Q 300 250 250 200 Q 200 150 250 100" style={{ ...outlineStyle, strokeWidth: 20, opacity: 0.2 }} />
            {/* Bushes along path */}
            <ellipse cx="100" cy="250" rx="40" ry="25" style={fillableStyle('hedge1')} />
            <ellipse cx="400" cy="230" rx="35" ry="28" style={fillableStyle('hedge2')} />
            <ellipse cx="150" cy="320" rx="30" ry="20" style={fillableStyle('hedge3')} />
            {/* Flowers */}
            {[80, 200, 350, 430].map((fx, i) => (
                <g key={i}>
                    <line x1={fx} y1="300" x2={fx} y2={280 - i * 3} style={{ ...outlineStyle, strokeWidth: 2 }} />
                    <circle cx={fx} cy={275 - i * 3} r="6" style={fillableStyle(`path-flower-${i}`)} />
                </g>
            ))}
            <Child x={250} y={200} scale={0.7} />
        </Sky>
    );
}

export function forestScene(p) {
    return (
        <Sky groundY={320} groundColor="forest-floor">
            {/* Tall trees */}
            {[60, 180, 320, 440].map((tx, i) => (
                <g key={i}>
                    <rect x={tx - 8} y={180 + i * 10} width="16" height={140 - i * 10} style={fillableStyle(`ftrunk-${i}`)} />
                    <polygon points={`${tx},${100 + i * 15} ${tx - 35},${200 + i * 10} ${tx + 35},${200 + i * 10}`} style={fillableStyle(`ftop-${i}`)} />
                    <polygon points={`${tx},${130 + i * 12} ${tx - 30},${190 + i * 10} ${tx + 30},${190 + i * 10}`} style={fillableStyle(`fmid-${i}`)} />
                </g>
            ))}
            {/* Mushroom */}
            <rect x="245" y="300" width="10" height="20" style={fillableStyle('mushroom-stem')} />
            <path d="M 230 300 Q 250 275 270 300" style={fillableStyle('mushroom-cap')} />
            <Child x={250} y={220} scale={0.7} />
        </Sky>
    );
}

export function mountainScene(p) {
    return (
        <Sky groundY={350} groundColor="mt-ground">
            <polygon points="100,350 200,100 300,350" style={fillableStyle('mountain1')} />
            <polygon points="250,350 380,80 500,350" style={fillableStyle('mountain2')} />
            <polygon points="0,350 80,200 180,350" style={fillableStyle('mountain3')} />
            {/* Snow caps */}
            <polygon points="200,100 185,140 215,140" style={fillableStyle('snow-cap1')} />
            <polygon points="380,80 365,120 395,120" style={fillableStyle('snow-cap2')} />
            {/* Path */}
            <path d="M 250 350 Q 230 300 260 270 Q 280 250 250 220" style={{ ...outlineStyle, strokeWidth: 3, strokeDasharray: "8,8" }} />
            <Child x={250} y={250} scale={0.6} />
            <Parent x={150} y={230} scale={0.55} gender="father" />
        </Sky>
    );
}

export function desertScene(p) {
    return (
        <Sky groundY={300} groundColor="desert-sand">
            <circle cx="420" cy="60" r="40" style={fillableStyle('hot-sun')} />
            {/* Sand dunes */}
            <path d="M 0 320 Q 100 270 200 310 Q 300 350 400 300 Q 450 280 500 310 L 500 400 L 0 400 Z" style={fillableStyle('dune1')} />
            {/* Cactus */}
            <rect x="140" y="230" width="18" height="70" rx="8" style={fillableStyle('cactus-body')} />
            <path d="M 140 260 Q 120 250 125 240 Q 130 230 140 250" style={fillableStyle('cactus-arm-l')} />
            <path d="M 158 255 Q 178 245 175 235 Q 172 225 158 248" style={fillableStyle('cactus-arm-r')} />
            {/* Another cactus */}
            <rect x="380" y="250" width="14" height="50" rx="7" style={fillableStyle('cactus2')} />
            <Child x={280} y={200} scale={0.7} />
        </Sky>
    );
}

export function jungleScene(p) {
    return (
        <Sky groundY={320} groundColor="jungle-floor">
            {/* Thick vines */}
            <path d="M 50 0 Q 80 100 50 200 Q 30 300 60 400" style={{ ...outlineStyle, strokeWidth: 6 }} />
            <path d="M 450 0 Q 420 80 450 180 Q 470 280 440 400" style={{ ...outlineStyle, strokeWidth: 5 }} />
            {/* Large leaves */}
            <path d="M 50 100 Q 100 80 120 120 Q 100 140 50 100" style={fillableStyle('leaf-big1')} />
            <path d="M 450 120 Q 400 100 380 140 Q 400 160 450 120" style={fillableStyle('leaf-big2')} />
            {/* Parrot */}
            <ellipse cx="350" cy="100" rx="12" ry="18" style={fillableStyle('parrot-body')} />
            <circle cx="350" cy="85" r="8" style={fillableStyle('parrot-head')} />
            <polygon points="358,85 375,83 358,88" style={fillableStyle('beak')} />
            <Child x={250} y={210} scale={0.7} />
        </Sky>
    );
}

export function winterScene(p) {
    return (
        <Sky groundY={300} groundColor="snow-ground">
            {/* Snowflakes */}
            {[80, 160, 250, 340, 420].map((sx, i) => (
                <g key={i} transform={`translate(${sx},${40 + (p * 11 + i * 30) % 100})`}>
                    <line x1="0" y1="-5" x2="0" y2="5" style={{ ...outlineStyle, strokeWidth: 1 }} />
                    <line x1="-5" y1="0" x2="5" y2="0" style={{ ...outlineStyle, strokeWidth: 1 }} />
                    <line x1="-3" y1="-3" x2="3" y2="3" style={{ ...outlineStyle, strokeWidth: 1 }} />
                    <line x1="3" y1="-3" x2="-3" y2="3" style={{ ...outlineStyle, strokeWidth: 1 }} />
                </g>
            ))}
            {/* Snowman */}
            <circle cx="350" cy="270" r="25" style={fillableStyle('snowman-base')} />
            <circle cx="350" cy="235" r="18" style={fillableStyle('snowman-head')} />
            <circle cx="345" cy="230" r="2" fill="#2D2147" />
            <circle cx="355" cy="230" r="2" fill="#2D2147" />
            <polygon points="350,235 365,232 350,238" style={fillableStyle('carrot-nose')} />
            {/* Pine tree */}
            <polygon points="120,180 80,280 160,280" style={fillableStyle('pine1')} />
            <polygon points="120,210 90,280 150,280" style={fillableStyle('pine2')} />
            <rect x="115" y="280" width="10" height="20" style={fillableStyle('pine-trunk')} />
            <Child x={220} y={200} scale={0.7} />
        </Sky>
    );
}

export function farmScene(p) {
    return (
        <Sky groundY={300} groundColor="farm-field">
            {/* Barn */}
            <rect x="300" y="150" width="160" height="150" style={fillableStyle('farm-barn')} />
            <polygon points="300,150 380,90 460,150" style={fillableStyle('farm-roof')} />
            <rect x="355" y="220" width="50" height="80" style={fillableStyle('barn-gate')} />
            {/* Silo */}
            <rect x="470" y="130" width="30" height="170" rx="5" style={fillableStyle('silo')} />
            <path d="M 470 130 A 15 10 0 0 1 500 130" style={fillableStyle('silo-top')} />
            {/* Hay bales */}
            <circle cx="100" cy="285" r="20" style={fillableStyle('hay1')} />
            <circle cx="150" cy="285" r="20" style={fillableStyle('hay2')} />
            <circle cx="125" cy="260" r="18" style={fillableStyle('hay3')} />
            <Child x={220} y={190} scale={0.7} />
        </Sky>
    );
}

export const outdoorScenes = {
    'zoo-visit': zooScene,
    'park-picnic': parkScene,
    'beach-day': beachScene,
    'garden-helpers': gardenPathScene,
    'forest-walk': forestScene,
    'mountain-hike': mountainScene,
    'desert-safari': desertScene,
    'jungle-trek': jungleScene,
    'winter-wonderland': winterScene,
    'farm-fun': farmScene,
};

// ========== IMAGINATION STORIES ==========

export function rocketScene(p) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" fill="#0f0f23" />
            {[40, 100, 180, 270, 350, 430, 60, 200, 320, 450].map((sx, i) => (
                <circle key={i} cx={sx} cy={15 + (i * 41) % 150} r={1 + i % 2} fill="#FFFFFF" />
            ))}
            {/* Rocket */}
            <path d="M 250 50 Q 280 100 280 200 L 220 200 Q 220 100 250 50" style={fillableStyle('rocket')} />
            <polygon points="220,200 200,230 220,190" style={fillableStyle('fin-l')} />
            <polygon points="280,200 300,230 280,190" style={fillableStyle('fin-r')} />
            <circle cx="250" cy="150" r="12" style={fillableStyle('window')} />
            {/* Fire */}
            <polygon points="230,200 250,260 270,200" style={fillableStyle('fire')} />
            {/* Launch pad */}
            <rect x="150" y="300" width="200" height="15" rx="3" style={fillableStyle('pad')} />
            <rect x="180" y="315" width="20" height="60" style={outlineStyle} />
            <rect x="300" y="315" width="20" height="60" style={outlineStyle} />
            <Child x={100} y={260} scale={0.6} />
        </svg>
    );
}

export function dinoScene(p) {
    return (
        <Sky groundY={310} groundColor="dino-ground">
            {/* Volcano */}
            <polygon points="350,310 420,100 490,310" style={fillableStyle('volcano')} />
            <ellipse cx="420" cy="100" rx="25" ry="10" style={fillableStyle('crater')} />
            {/* Simple dino */}
            <ellipse cx="200" cy="270" rx="40" ry="25" style={fillableStyle('dino-body')} />
            <circle cx="240" cy="250" r="18" style={fillableStyle('dino-head')} />
            <circle cx="248" cy="245" r="3" fill="#2D2147" />
            <rect x="185" y="290" width="10" height="20" rx="3" style={fillableStyle('dino-leg1')} />
            <rect x="210" y="290" width="10" height="20" rx="3" style={fillableStyle('dino-leg2')} />
            <path d="M 160 270 Q 140 260 130 275 Q 120 290 140 280" style={fillableStyle('dino-tail')} />
            {/* Palm tree */}
            <rect x="75" y="200" width="12" height="110" style={fillableStyle('palm-trunk')} />
            <path d="M 81 200 Q 40 180 30 210" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <path d="M 81 200 Q 120 175 130 205" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <Child x={320} y={200} scale={0.65} />
        </Sky>
    );
}

export function robotScene(p) {
    return (
        <Room>
            {/* Conveyor belt */}
            <rect x="50" y="270" width="400" height="20" rx="5" style={fillableStyle('conveyor')} />
            <circle cx="70" cy="280" r="10" style={fillableStyle('gear1')} />
            <circle cx="430" cy="280" r="10" style={fillableStyle('gear2')} />
            {/* Robot on conveyor */}
            <rect x="200" y="220" width="40" height="50" rx="5" style={fillableStyle('bot-body')} />
            <rect x="195" y="200" width="50" height="25" rx="5" style={fillableStyle('bot-head')} />
            <circle cx="210" cy="210" r="4" style={outlineStyle} />
            <circle cx="230" cy="210" r="4" style={outlineStyle} />
            <line x1="205" y1="220" x2="205" y2="225" style={outlineStyle} />
            <line x1="235" y1="220" x2="235" y2="225" style={outlineStyle} />
            <circle cx="220" cy="195" r="4" style={fillableStyle('antenna')} />
            <line x1="220" y1="200" x2="220" y2="190" style={outlineStyle} />
            {/* Control panel */}
            <rect x="380" y="100" width="80" height="120" rx="5" style={fillableStyle('panel')} />
            <circle cx="400" cy="130" r="6" style={fillableStyle('btn1')} />
            <circle cx="430" cy="130" r="6" style={fillableStyle('btn2')} />
            <rect x="395" y="150" width="50" height="20" rx="2" style={fillableStyle('screen')} />
            <Child x={120} y={170} scale={0.7} />
        </Room>
    );
}

export function fairyScene(p) {
    return (
        <Sky groundY={320} groundColor="meadow">
            {/* Magic mushrooms */}
            <rect x="80" y="290" width="12" height="30" style={fillableStyle('mush-stem1')} />
            <path d="M 65 290 Q 86 260 107 290" style={fillableStyle('mush-cap1')} />
            <rect x="350" y="295" width="10" height="25" style={fillableStyle('mush-stem2')} />
            <path d="M 338 295 Q 355 270 372 295" style={fillableStyle('mush-cap2')} />
            {/* Fairy wings (big) */}
            <path d="M 250 180 Q 310 130 310 180 Q 310 230 250 180" style={fillableStyle('wing-r')} />
            <path d="M 250 180 Q 190 130 190 180 Q 190 230 250 180" style={fillableStyle('wing-l')} />
            {/* Sparkles */}
            {[120, 200, 300, 400].map((sx, i) => (
                <text key={i} x={sx} y={80 + i * 20} fontSize="14" fill="#2D2147" opacity="0.4">✦</text>
            ))}
            {/* Flower arch */}
            <path d="M 150 320 Q 250 240 350 320" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <Child x={250} y={200} scale={0.7} />
        </Sky>
    );
}

export function pirateScene(p) {
    return (
        <Sky groundY={300} groundColor="ocean-water">
            {/* Pirate ship */}
            <path d="M 120 280 Q 250 320 380 280 L 370 300 L 130 300 Z" style={fillableStyle('ship-hull')} />
            {/* Mast */}
            <line x1="250" y1="280" x2="250" y2="100" style={{ ...outlineStyle, strokeWidth: 5 }} />
            {/* Sail */}
            <path d="M 250 120 L 350 160 L 250 200 Z" style={fillableStyle('sail')} />
            {/* Flag */}
            <rect x="250" y="95" width="40" height="25" style={fillableStyle('pirate-flag')} />
            <text x="258" y="115" fontSize="16" fill="#2D2147">☠</text>
            {/* Waves */}
            <path d="M 0 310 Q 50 290 100 310 Q 150 330 200 310 Q 250 290 300 310 Q 350 330 400 310 Q 450 290 500 310" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <Child x={230} y={185} scale={0.6} />
        </Sky>
    );
}

export function superheroScene(p) {
    return (
        <Sky groundY={350} groundColor="city-ground">
            {/* City buildings */}
            <rect x="30" y="150" width="60" height="200" style={fillableStyle('bldg1')} />
            <rect x="100" y="200" width="50" height="150" style={fillableStyle('bldg2')} />
            <rect x="160" y="170" width="70" height="180" style={fillableStyle('bldg3')} />
            <rect x="350" y="180" width="60" height="170" style={fillableStyle('bldg4')} />
            <rect x="420" y="140" width="50" height="210" style={fillableStyle('bldg5')} />
            {/* Windows */}
            {[45, 55, 65].map(wx => [170, 200, 230, 260].map(wy => (
                <rect key={`${wx}-${wy}`} x={wx} y={wy} width="8" height="10" rx="1" style={outlineStyle} />
            )))}
            {/* Cape/hero symbol */}
            <polygon points="250,60 240,90 260,90" style={fillableStyle('hero-symbol')} />
            <circle cx="250" cy="75" r="20" style={fillableStyle('hero-shield')} />
            <Child x={250} y={240} scale={0.75} />
        </Sky>
    );
}

export function castleScene(p) {
    return (
        <Sky groundY={330} groundColor="castle-ground">
            {/* Castle */}
            <rect x="150" y="130" width="200" height="200" style={fillableStyle('castle-wall')} />
            {/* Towers */}
            <rect x="130" y="80" width="40" height="250" style={fillableStyle('tower-l')} />
            <rect x="330" y="80" width="40" height="250" style={fillableStyle('tower-r')} />
            {/* Tower tops */}
            <polygon points="150,80 130,40 170,40" style={fillableStyle('spire-l')} />
            <polygon points="370,80 350,40 390,40" style={fillableStyle('spire-r')} />
            {/* Gate */}
            <path d="M 220 330 L 220 240 A 30 30 0 0 1 280 240 L 280 330 Z" style={fillableStyle('gate')} />
            {/* Flags */}
            <line x1="150" y1="40" x2="150" y2="20" style={outlineStyle} />
            <rect x="150" y="15" width="20" height="12" style={fillableStyle('flag-l')} />
            <line x1="370" y1="40" x2="370" y2="20" style={outlineStyle} />
            <rect x="370" y="15" width="20" height="12" style={fillableStyle('flag-r')} />
            <Child x={250} y={230} scale={0.65} />
        </Sky>
    );
}

export function timeScene(p) {
    return (
        <Room>
            {/* Giant clock */}
            <circle cx="250" cy="160" r="100" style={fillableStyle('clock-face')} />
            <circle cx="250" cy="160" r="95" style={outlineStyle} />
            <circle cx="250" cy="160" r="5" fill="#2D2147" />
            {/* Clock hands */}
            <line x1="250" y1="160" x2="250" y2="80" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="250" y1="160" x2={290 + p % 3 * 10} y2={140 + p % 4 * 5} style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Numbers */}
            <text x="242" y="82" fontSize="14" fill="#2D2147" fontWeight="bold">12</text>
            <text x="335" y="165" fontSize="14" fill="#2D2147" fontWeight="bold">3</text>
            <text x="245" y="252" fontSize="14" fill="#2D2147" fontWeight="bold">6</text>
            <text x="162" y="165" fontSize="14" fill="#2D2147" fontWeight="bold">9</text>
            {/* Swirling portal effect */}
            <ellipse cx="250" cy="160" rx="110" ry="110" style={{ ...outlineStyle, strokeWidth: 1, strokeDasharray: "5,10", opacity: 0.3 }} />
            <Child x={100} y={200} scale={0.7} />
        </Room>
    );
}

export function underwaterScene(p) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('deep-sea')} />
            {/* Seaweed */}
            <path d="M 50 400 Q 40 350 55 300 Q 60 250 45 200" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <path d="M 450 400 Q 460 340 445 280 Q 440 230 455 180" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Palace/ruins */}
            <rect x="180" y="250" width="140" height="100" rx="5" style={fillableStyle('palace-wall')} />
            <rect x="160" y="220" width="40" height="130" rx="3" style={fillableStyle('pillar-l')} />
            <rect x="300" y="220" width="40" height="130" rx="3" style={fillableStyle('pillar-r')} />
            <path d="M 160 220 Q 250 180 340 220" style={fillableStyle('arch')} />
            {/* Jellyfish */}
            <path d="M 350 100 A 20 15 0 0 1 390 100" style={fillableStyle('jelly-dome')} />
            <line x1="355" y1="100" x2="350" y2="130" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <line x1="370" y1="100" x2="370" y2="135" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <line x1="385" y1="100" x2="390" y2="130" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            {/* Bubbles */}
            <circle cx="100" cy={100 + p % 5 * 15} r="5" style={{ ...outlineStyle, strokeWidth: 1.5, opacity: 0.5 }} />
            <circle cx="110" cy={80 + p % 4 * 12} r="3" style={{ ...outlineStyle, strokeWidth: 1, opacity: 0.4 }} />
            <Child x={250} y={170} scale={0.6} />
        </svg>
    );
}

export function toyScene(p) {
    return (
        <Room>
            {/* Toy shelves */}
            <rect x="300" y="80" width="170" height="12" rx="2" style={fillableStyle('toy-shelf1')} />
            <rect x="300" y="180" width="170" height="12" rx="2" style={fillableStyle('toy-shelf2')} />
            {/* Toys on shelves */}
            <circle cx="340" cy="70" r="10" style={fillableStyle('ball')} />
            <rect x="380" y="55" width="20" height="25" rx="2" style={fillableStyle('box-toy')} />
            <polygon points="440,80 430,55 450,55" style={fillableStyle('cone-toy')} />
            {/* Teddy bear */}
            <circle cx="330" cy="165" r="12" style={fillableStyle('bear-head')} />
            <circle cx="330" cy="185" r="15" style={fillableStyle('bear-body')} />
            <circle cx="322" cy="160" r="5" style={fillableStyle('bear-ear-l')} />
            <circle cx="338" cy="160" r="5" style={fillableStyle('bear-ear-r')} />
            {/* Train set on floor */}
            <rect x="60" y="280" width="50" height="25" rx="5" style={fillableStyle('train-body')} />
            <rect x="110" y="285" width="35" height="20" rx="3" style={fillableStyle('train-car')} />
            <circle cx="75" cy="310" r="6" style={fillableStyle('train-w1')} />
            <circle cx="95" cy="310" r="6" style={fillableStyle('train-w2')} />
            <circle cx="125" cy="310" r="5" style={fillableStyle('train-w3')} />
            <Child x={200} y={170} scale={0.75} />
        </Room>
    );
}

export const imaginationScenes = {
    'space-adventure': rocketScene,
    'dinosaur-world': dinoScene,
    'robot-kingdom': robotScene,
    'fairy-garden': fairyScene,
    'pirate-treasure': pirateScene,
    'superhero-training': superheroScene,
    'castle-quest': castleScene,
    'time-travel': timeScene,
    'underwater-palace': underwaterScene,
    'toy-shop-mystery': toyScene,
};

// ========== MAIN ROUTER ==========

const allScenes = {
    ...skillScenes,
    ...familyScenes,
    ...learningScenes,
    ...outdoorScenes,
    ...imaginationScenes,
};

export function getStoryScene(illustrationId) {
    // Extract story theme ID and page number from the illustration ID
    // Format: "story-theme-id-pageNum" e.g. "desert-safari-15"
    const parts = illustrationId.split('-');
    const pageNum = parseInt(parts[parts.length - 1]) || 0;

    // Try to find a matching scene by progressively removing the last segment
    let themeId = illustrationId;
    for (let i = parts.length - 1; i >= 1; i--) {
        const candidate = parts.slice(0, i).join('-');
        if (allScenes[candidate]) {
            const scene = allScenes[candidate](pageNum);
            return <SceneRandomizer pageNum={pageNum}>{scene}</SceneRandomizer>;
        }
    }

    // Fallback: if no scene matched, return null (caller will use old fallback)
    return null;
}
