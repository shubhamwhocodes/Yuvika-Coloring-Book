/**
 * SVG Illustration components for coloring pages
 * Each illustration is a black-outline SVG designed for coloring
 * Image-based illustrations are served for stories that have AI-generated art
 */
import React from 'react';
import { getThemeSprite } from './ThemeSprites';
import { getStoryScene } from './StoryScenes';

// ========== IMAGE-BASED ILLUSTRATION MAP ==========
// Maps illustration IDs to their image file paths in /public/illustrations/
const imageIllustrations = {
    // Pottery Class Story — 11 AI-generated coloring book pages
    'child-waking': '/illustrations/pottery-class/page1.png',
    'wearing-apron': '/illustrations/pottery-class/page2.png',
    'car-ride': '/illustrations/pottery-class/page3.png',
    'pottery-studio': '/illustrations/pottery-class/page4.png',
    'teacher-cup': '/illustrations/pottery-class/page5.png',
    'touching-clay': '/illustrations/pottery-class/page6.png',
    'making-cup': '/illustrations/pottery-class/page7.png',
    'proud-cup': '/illustrations/pottery-class/page8.png',
    'teacher-lesson': '/illustrations/pottery-class/page9.png',
    'flowers-cup': '/illustrations/pottery-class/page10.png',
    // Puppy Story — 5 AI-generated coloring book pages (+cover)
    'garden-puppy': '/illustrations/puppy-story/page1.png',
    'petting-puppy': '/illustrations/puppy-story/page2.png',
    'puppy-milk': '/illustrations/puppy-story/page3.png',
    'cozy-puppy': '/illustrations/puppy-story/page4.png',
    'playing-catch': '/illustrations/puppy-story/page5.png',
};

// Cover images for stories
export const coverImages = {
    'pottery-class': '/illustrations/pottery-class/cover.png',
    'puppy-story': '/illustrations/puppy-story/cover.png',
};

// ========== SHARED STYLES ==========
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

// ========== CHILD CHARACTER ==========
export function ChildCharacter({ x = 0, y = 0, scale = 1, facing = 'right' }) {
    const transform = `translate(${x}, ${y}) scale(${facing === 'left' ? -scale : scale}, ${scale})`;
    return (
        <g transform={transform}>
            {/* Head */}
            <circle cx="50" cy="45" r="30" style={fillableStyle('child-head')} />
            {/* Hair */}
            <path d="M 20 40 Q 15 15 50 12 Q 85 15 80 40" style={fillableStyle('child-hair')} />
            <path d="M 22 40 Q 18 32 25 25" style={outlineStyle} />
            <path d="M 78 40 Q 82 32 75 25" style={outlineStyle} />
            {/* Eyes */}
            <circle cx="38" cy="42" r="5" fill="#2D2147" />
            <circle cx="62" cy="42" r="5" fill="#2D2147" />
            <circle cx="36" cy="40" r="2" fill="#FFFFFF" />
            <circle cx="60" cy="40" r="2" fill="#FFFFFF" />
            {/* Smile */}
            <path d="M 38 56 Q 50 66 62 56" style={{ ...outlineStyle, strokeWidth: 2.5 }} />
            {/* Body */}
            <path d="M 30 72 L 30 130 L 70 130 L 70 72" style={fillableStyle('child-body')} />
            {/* Arms */}
            <path d="M 30 85 L 8 105" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <path d="M 70 85 L 92 105" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Legs */}
            <path d="M 38 130 L 38 165" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <path d="M 62 130 L 62 165" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Shoes */}
            <ellipse cx="38" cy="170" rx="12" ry="6" style={fillableStyle('child-shoes')} />
            <ellipse cx="62" cy="170" rx="12" ry="6" style={fillableStyle('child-shoes-r')} />
        </g>
    );
}

// ========== PARENT CHARACTER ==========
export function ParentCharacter({ x = 0, y = 0, scale = 1, gender = 'father' }) {
    const transform = `translate(${x}, ${y}) scale(${scale})`;
    return (
        <g transform={transform}>
            {/* Head */}
            <circle cx="50" cy="40" r="28" style={fillableStyle('parent-head')} />
            {/* Hair */}
            {gender === 'father' ? (
                <path d="M 22 35 Q 20 12 50 8 Q 80 12 78 35" style={fillableStyle('parent-hair')} />
            ) : (
                <>
                    <path d="M 18 40 Q 14 8 50 5 Q 86 8 82 40" style={fillableStyle('parent-hair')} />
                    <path d="M 18 40 Q 12 70 18 90" style={{ ...outlineStyle, strokeWidth: 4 }} />
                    <path d="M 82 40 Q 88 70 82 90" style={{ ...outlineStyle, strokeWidth: 4 }} />
                </>
            )}
            {/* Eyes */}
            <circle cx="38" cy="38" r="4" fill="#2D2147" />
            <circle cx="62" cy="38" r="4" fill="#2D2147" />
            <circle cx="36.5" cy="36.5" r="1.5" fill="#FFFFFF" />
            <circle cx="60.5" cy="36.5" r="1.5" fill="#FFFFFF" />
            {/* Smile */}
            <path d="M 38 52 Q 50 60 62 52" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {/* Body */}
            <path d="M 25 65 L 25 145 L 75 145 L 75 65" style={fillableStyle('parent-body')} />
            {/* Arms */}
            <path d="M 25 80 L 5 110" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <path d="M 75 80 L 95 110" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Legs */}
            <path d="M 35 145 L 35 185" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <path d="M 65 145 L 65 185" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Shoes */}
            <ellipse cx="35" cy="190" rx="12" ry="6" style={fillableStyle('parent-shoes')} />
            <ellipse cx="65" cy="190" rx="12" ry="6" style={fillableStyle('parent-shoes-r')} />
        </g>
    );
}

// ========== SCENE ILLUSTRATIONS ==========

export function SunScene({ children }) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            {/* Sun */}
            <circle cx="420" cy="60" r="35" style={fillableStyle('sun')} />
            <line x1="420" y1="15" x2="420" y2="5" style={outlineStyle} />
            <line x1="420" y1="105" x2="420" y2="115" style={outlineStyle} />
            <line x1="375" y1="60" x2="365" y2="60" style={outlineStyle} />
            <line x1="465" y1="60" x2="475" y2="60" style={outlineStyle} />
            <line x1="395" y1="35" x2="388" y2="28" style={outlineStyle} />
            <line x1="445" y1="35" x2="452" y2="28" style={outlineStyle} />
            <line x1="395" y1="85" x2="388" y2="92" style={outlineStyle} />
            <line x1="445" y1="85" x2="452" y2="92" style={outlineStyle} />
            {/* Clouds */}
            <ellipse cx="100" cy="50" rx="40" ry="20" style={fillableStyle('cloud1')} />
            <ellipse cx="130" cy="45" rx="30" ry="15" style={fillableStyle('cloud1b')} />
            <ellipse cx="300" cy="35" rx="35" ry="18" style={fillableStyle('cloud2')} />
            {/* Ground */}
            <path d="M 0 350 Q 125 330 250 350 Q 375 370 500 350 L 500 400 L 0 400 Z" style={fillableStyle('ground')} />
            {/* Flowers */}
            <circle cx="50" cy="345" r="8" style={fillableStyle('flower1')} />
            <circle cx="50" cy="345" r="3" fill="#2D2147" />
            <line x1="50" y1="353" x2="50" y2="375" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="450" cy="340" r="8" style={fillableStyle('flower2')} />
            <circle cx="450" cy="340" r="3" fill="#2D2147" />
            <line x1="450" y1="348" x2="450" y2="370" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {children}
        </svg>
    );
}

export function IndoorScene({ children }) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            {/* Room walls */}
            <rect x="20" y="20" width="460" height="360" rx="10" style={fillableStyle('wall')} />
            {/* Window */}
            <rect x="350" y="50" width="100" height="80" rx="5" style={fillableStyle('window')} />
            <line x1="400" y1="50" x2="400" y2="130" style={outlineStyle} />
            <line x1="350" y1="90" x2="450" y2="90" style={outlineStyle} />
            {/* Curtains */}
            <path d="M 345 48 Q 355 90 345 132" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <path d="M 455 48 Q 445 90 455 132" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {/* Floor line */}
            <line x1="20" y1="340" x2="480" y2="340" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            {children}
        </svg>
    );
}

// ========== OBJECTS ==========

export function PotteryWheel({ x = 0, y = 0 }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Table */}
            <rect x="0" y="60" width="100" height="10" rx="3" style={fillableStyle('wheel-table')} />
            <line x1="15" y1="70" x2="15" y2="110" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <line x1="85" y1="70" x2="85" y2="110" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Wheel */}
            <ellipse cx="50" cy="55" rx="35" ry="10" style={fillableStyle('wheel')} />
            {/* Clay */}
            <path d="M 35 35 Q 35 20 50 18 Q 65 20 65 35 L 65 55 L 35 55 Z" style={fillableStyle('clay')} />
        </g>
    );
}

export function Puppy({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <ellipse cx="50" cy="60" rx="35" ry="25" style={fillableStyle('puppy-body')} />
            {/* Head */}
            <circle cx="85" cy="40" r="22" style={fillableStyle('puppy-head')} />
            {/* Ears */}
            <ellipse cx="72" cy="22" rx="8" ry="14" style={fillableStyle('puppy-ear-l')} transform="rotate(-15, 72, 22)" />
            <ellipse cx="98" cy="22" rx="8" ry="14" style={fillableStyle('puppy-ear-r')} transform="rotate(15, 98, 22)" />
            {/* Eyes */}
            <circle cx="78" cy="36" r="4" fill="#2D2147" />
            <circle cx="92" cy="36" r="4" fill="#2D2147" />
            <circle cx="77" cy="34.5" r="1.5" fill="#FFFFFF" />
            <circle cx="91" cy="34.5" r="1.5" fill="#FFFFFF" />
            {/* Nose */}
            <ellipse cx="87" cy="46" rx="4" ry="3" fill="#2D2147" />
            {/* Mouth */}
            <path d="M 83 49 Q 87 53 91 49" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            {/* Tail */}
            <path d="M 15 50 Q 0 30 10 20" style={{ ...outlineStyle, strokeWidth: 3 }} />
            {/* Legs */}
            <line x1="30" y1="80" x2="30" y2="100" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="50" y1="82" x2="50" y2="100" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="65" y1="82" x2="65" y2="100" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="78" y1="78" x2="78" y2="100" style={{ ...outlineStyle, strokeWidth: 4 }} />
        </g>
    );
}

export function Tree({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Trunk */}
            <rect x="40" y="80" width="20" height="60" rx="3" style={fillableStyle('tree-trunk')} />
            {/* Leaves */}
            <circle cx="50" cy="50" r="40" style={fillableStyle('tree-leaves')} />
            <circle cx="30" cy="60" r="25" style={fillableStyle('tree-leaves-l')} />
            <circle cx="70" cy="60" r="25" style={fillableStyle('tree-leaves-r')} />
        </g>
    );
}

export function House({ x = 0, y = 0 }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Walls */}
            <rect x="10" y="60" width="100" height="80" style={fillableStyle('house-wall')} />
            {/* Roof */}
            <polygon points="0,65 60,10 120,65" style={fillableStyle('house-roof')} />
            {/* Door */}
            <rect x="42" y="95" width="30" height="45" rx="15" style={fillableStyle('house-door')} />
            <circle cx="65" cy="120" r="3" fill="#2D2147" />
            {/* Window */}
            <rect x="20" y="80" width="18" height="18" rx="2" style={fillableStyle('house-window')} />
            <line x1="29" y1="80" x2="29" y2="98" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <line x1="20" y1="89" x2="38" y2="89" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
        </g>
    );
}

export function Giraffe({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <ellipse cx="60" cy="100" rx="35" ry="22" style={fillableStyle('giraffe-body')} />
            {/* Neck */}
            <rect x="78" y="30" width="16" height="65" rx="8" style={fillableStyle('giraffe-neck')} />
            {/* Head */}
            <ellipse cx="90" cy="25" rx="18" ry="14" style={fillableStyle('giraffe-head')} />
            {/* Horns */}
            <line x1="82" y1="12" x2="80" y2="3" style={{ ...outlineStyle, strokeWidth: 2.5 }} />
            <circle cx="80" cy="2" r="3" style={fillableStyle('giraffe-horn-l')} />
            <line x1="98" y1="12" x2="100" y2="3" style={{ ...outlineStyle, strokeWidth: 2.5 }} />
            <circle cx="100" cy="2" r="3" style={fillableStyle('giraffe-horn-r')} />
            {/* Eyes */}
            <circle cx="84" cy="22" r="3" fill="#2D2147" />
            <circle cx="96" cy="22" r="3" fill="#2D2147" />
            {/* Spots */}
            <circle cx="85" cy="55" r="5" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <circle cx="82" cy="75" r="4" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <circle cx="50" cy="92" r="5" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            <circle cx="70" cy="95" r="4" style={{ ...outlineStyle, strokeWidth: 1.5 }} />
            {/* Legs */}
            <line x1="35" y1="118" x2="35" y2="155" style={{ ...outlineStyle, strokeWidth: 3.5 }} />
            <line x1="50" y1="120" x2="50" y2="155" style={{ ...outlineStyle, strokeWidth: 3.5 }} />
            <line x1="70" y1="120" x2="70" y2="155" style={{ ...outlineStyle, strokeWidth: 3.5 }} />
            <line x1="85" y1="118" x2="85" y2="155" style={{ ...outlineStyle, strokeWidth: 3.5 }} />
            {/* Tail */}
            <path d="M 25 98 Q 10 85 15 75" style={{ ...outlineStyle, strokeWidth: 2 }} />
        </g>
    );
}

export function Lion({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Mane */}
            <circle cx="50" cy="45" r="35" style={fillableStyle('lion-mane')} />
            {/* Face */}
            <circle cx="50" cy="45" r="22" style={fillableStyle('lion-face')} />
            {/* Eyes */}
            <circle cx="42" cy="40" r="4" fill="#2D2147" />
            <circle cx="58" cy="40" r="4" fill="#2D2147" />
            <circle cx="41" cy="38.5" r="1.5" fill="#FFFFFF" />
            <circle cx="57" cy="38.5" r="1.5" fill="#FFFFFF" />
            {/* Nose */}
            <path d="M 46 50 L 50 53 L 54 50" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <ellipse cx="50" cy="49" rx="4" ry="3" fill="#2D2147" />
            {/* Mouth */}
            <path d="M 43 55 Q 50 62 57 55" style={{ ...outlineStyle, strokeWidth: 2 }} />
            {/* Body */}
            <ellipse cx="50" cy="100" rx="30" ry="20" style={fillableStyle('lion-body')} />
            {/* Legs */}
            <rect x="25" y="115" width="10" height="30" rx="5" style={fillableStyle('lion-leg-1')} />
            <rect x="65" y="115" width="10" height="30" rx="5" style={fillableStyle('lion-leg-2')} />
            {/* Tail */}
            <path d="M 80 95 Q 100 80 95 65" style={{ ...outlineStyle, strokeWidth: 2.5 }} />
            <circle cx="95" cy="63" r="5" style={fillableStyle('lion-tail-tip')} />
        </g>
    );
}

export function Elephant({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <ellipse cx="60" cy="75" rx="45" ry="32" style={fillableStyle('elephant-body')} />
            {/* Head */}
            <circle cx="100" cy="50" r="28" style={fillableStyle('elephant-head')} />
            {/* Ears */}
            <ellipse cx="120" cy="45" rx="18" ry="22" style={fillableStyle('elephant-ear')} />
            {/* Trunk */}
            <path d="M 105 68 Q 115 85 108 100 Q 100 110 95 105" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Eyes */}
            <circle cx="92" cy="42" r="4" fill="#2D2147" />
            <circle cx="91" cy="40.5" r="1.5" fill="#FFFFFF" />
            {/* Tusks */}
            <path d="M 98 62 Q 92 72 95 78" style={{ stroke: '#2D2147', strokeWidth: 2.5, fill: 'none' }} />
            {/* Legs */}
            <rect x="25" y="100" width="14" height="35" rx="7" style={fillableStyle('elephant-leg-1')} />
            <rect x="45" y="102" width="14" height="35" rx="7" style={fillableStyle('elephant-leg-2')} />
            <rect x="65" y="102" width="14" height="35" rx="7" style={fillableStyle('elephant-leg-3')} />
            <rect x="85" y="100" width="14" height="35" rx="7" style={fillableStyle('elephant-leg-4')} />
            {/* Tail */}
            <path d="M 15 70 Q 5 60 8 50" style={{ ...outlineStyle, strokeWidth: 2 }} />
        </g>
    );
}

export function Rainbow({ x = 0, y = 0 }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <path d="M 20 200 Q 20 20 250 20 Q 480 20 480 200" style={{ stroke: '#E74C3C', strokeWidth: 8, fill: 'none' }} />
            <path d="M 35 200 Q 35 40 250 40 Q 465 40 465 200" style={{ stroke: '#F39C12', strokeWidth: 8, fill: 'none' }} />
            <path d="M 50 200 Q 50 60 250 60 Q 450 60 450 200" style={{ stroke: '#F1C40F', strokeWidth: 8, fill: 'none' }} />
            <path d="M 65 200 Q 65 80 250 80 Q 435 80 435 200" style={{ stroke: '#27AE60', strokeWidth: 8, fill: 'none' }} />
            <path d="M 80 200 Q 80 100 250 100 Q 420 100 420 200" style={{ stroke: '#3498DB', strokeWidth: 8, fill: 'none' }} />
            <path d="M 95 200 Q 95 120 250 120 Q 405 120 405 200" style={{ stroke: '#8E44AD', strokeWidth: 8, fill: 'none' }} />
        </g>
    );
}

// ========== SCENE COMPOSITIONS ==========

const illustrations = {
    // Pottery Story
    'child-waking': () => (
        <IndoorScene>
            <rect x="60" y="200" width="180" height="100" rx="8" style={fillableStyle('bed')} />
            <rect x="55" y="190" width="190" height="20" rx="3" style={fillableStyle('pillow')} />
            <ChildCharacter x={100} y={170} scale={0.7} />
            <circle cx="400" cy="85" r="15" style={fillableStyle('sun-window')} />
        </IndoorScene>
    ),
    'wearing-apron': () => (
        <IndoorScene>
            <ChildCharacter x={160} y={150} scale={0.9} />
            <ParentCharacter x={280} y={120} scale={0.85} gender="mother" />
        </IndoorScene>
    ),
    'car-ride': () => (
        <SunScene>
            <rect x="130" y="240" width="220" height="80" rx="20" style={fillableStyle('car-body')} />
            <rect x="170" y="210" width="140" height="50" rx="10" style={fillableStyle('car-top')} />
            <circle cx="185" cy="330" r="22" style={fillableStyle('car-wheel-l')} />
            <circle cx="300" cy="330" r="22" style={fillableStyle('car-wheel-r')} />
            <circle cx="185" cy="330" r="8" fill="#2D2147" />
            <circle cx="300" cy="330" r="8" fill="#2D2147" />
        </SunScene>
    ),
    'pottery-studio': () => (
        <IndoorScene>
            <PotteryWheel x={60} y={220} />
            <PotteryWheel x={200} y={220} />
            <PotteryWheel x={340} y={220} />
            <ChildCharacter x={140} y={150} scale={0.8} />
            <rect x="40" y="140" width="120" height="8" rx="2" style={fillableStyle('shelf-1')} />
            <rect x="340" y="140" width="120" height="8" rx="2" style={fillableStyle('shelf-2')} />
        </IndoorScene>
    ),
    'teacher-cup': () => (
        <IndoorScene>
            <ParentCharacter x={100} y={120} scale={0.9} gender="mother" />
            <ChildCharacter x={280} y={160} scale={0.85} />
            <path d="M 140 195 L 130 220 L 170 220 L 160 195" style={fillableStyle('cup-teacher')} />
        </IndoorScene>
    ),
    'touching-clay': () => (
        <IndoorScene>
            <PotteryWheel x={160} y={210} />
            <ChildCharacter x={130} y={130} scale={0.8} />
            <ParentCharacter x={300} y={110} scale={0.8} gender="father" />
        </IndoorScene>
    ),
    'making-cup': () => (
        <IndoorScene>
            <PotteryWheel x={180} y={210} />
            <ChildCharacter x={155} y={130} scale={0.85} />
        </IndoorScene>
    ),
    'proud-cup': () => (
        <IndoorScene>
            <ChildCharacter x={140} y={140} scale={0.85} />
            <ParentCharacter x={280} y={120} scale={0.85} gender="father" />
            <path d="M 190 210 L 180 240 L 220 240 L 210 210" style={fillableStyle('cup-proud')} />
        </IndoorScene>
    ),
    'teacher-lesson': () => (
        <IndoorScene>
            <ParentCharacter x={100} y={120} scale={0.85} gender="mother" />
            <ChildCharacter x={260} y={150} scale={0.85} />
            <path d="M 360 280 L 350 310 L 390 310 L 380 280" style={fillableStyle('cup-1')} />
            <path d="M 400 280 L 390 310 L 430 310 L 420 280" style={fillableStyle('cup-2')} />
        </IndoorScene>
    ),
    'flowers-cup': () => (
        <IndoorScene>
            <rect x="180" y="240" width="140" height="8" rx="2" style={fillableStyle('table')} />
            <path d="M 230 200 L 220 240 L 280 240 L 270 200" style={fillableStyle('cup-final')} />
            <circle cx="240" cy="190" r="8" style={fillableStyle('flower-a')} />
            <circle cx="255" cy="185" r="8" style={fillableStyle('flower-b')} />
            <circle cx="270" cy="190" r="8" style={fillableStyle('flower-c')} />
            <ChildCharacter x={60} y={140} scale={0.7} />
            <ParentCharacter x={340} y={120} scale={0.7} gender="mother" />
        </IndoorScene>
    ),

    // Puppy Story
    'garden-puppy': () => (
        <SunScene>
            <Tree x={30} y={180} scale={0.8} />
            <ChildCharacter x={200} y={170} scale={0.9} />
            <Puppy x={330} y={270} scale={0.9} />
        </SunScene>
    ),
    'petting-puppy': () => (
        <SunScene>
            <ChildCharacter x={180} y={180} scale={0.85} />
            <Puppy x={270} y={280} scale={0.8} />
        </SunScene>
    ),
    'puppy-milk': () => (
        <IndoorScene>
            <ParentCharacter x={100} y={120} scale={0.85} gender="mother" />
            <Puppy x={250} y={260} scale={0.8} />
            <ellipse cx="290" cy="310" rx="20" ry="8" style={fillableStyle('milk-bowl')} />
        </IndoorScene>
    ),
    'cozy-puppy': () => (
        <IndoorScene>
            <rect x="200" y="280" width="120" height="60" rx="10" style={fillableStyle('blanket')} />
            <Puppy x={210} y={240} scale={0.7} />
            <ChildCharacter x={100} y={170} scale={0.8} />
        </IndoorScene>
    ),
    'playing-catch': () => (
        <SunScene>
            <ChildCharacter x={120} y={170} scale={0.85} />
            <Puppy x={310} y={270} scale={0.9} />
            <circle cx="350" cy="250" r="12" style={fillableStyle('ball')} />
        </SunScene>
    ),
    'father-meets-puppy': () => (
        <IndoorScene>
            <rect x="350" y="120" width="80" height="160" rx="5" style={fillableStyle('door')} />
            <ParentCharacter x={340} y={130} scale={0.8} gender="father" />
            <ChildCharacter x={160} y={160} scale={0.8} />
            <Puppy x={200} y={280} scale={0.6} />
        </IndoorScene>
    ),
    'everyone-plays': () => (
        <SunScene>
            <ChildCharacter x={100} y={170} scale={0.8} />
            <ChildCharacter x={250} y={175} scale={0.7} />
            <Puppy x={180} y={280} scale={0.8} />
        </SunScene>
    ),
    'puppy-bath': () => (
        <IndoorScene>
            <ellipse cx="250" cy="290" rx="60" ry="30" style={fillableStyle('tub')} />
            <Puppy x={210} y={240} scale={0.6} />
            <ChildCharacter x={120} y={160} scale={0.8} />
            {/* Splash drops */}
            <circle cx="300" cy="240" r="4" style={fillableStyle('splash-1')} />
            <circle cx="320" cy="260" r="3" style={fillableStyle('splash-2')} />
            <circle cx="190" cy="250" r="3" style={fillableStyle('splash-3')} />
        </IndoorScene>
    ),
    'kindness-lesson': () => (
        <IndoorScene>
            <ParentCharacter x={100} y={120} scale={0.85} gender="mother" />
            <ChildCharacter x={250} y={160} scale={0.85} />
            <Puppy x={290} y={280} scale={0.6} />
        </IndoorScene>
    ),
    'best-friends': () => (
        <SunScene>
            <ChildCharacter x={180} y={170} scale={0.9} />
            <Puppy x={280} y={270} scale={0.9} />
            {/* Hearts */}
            <text x="220" y="160" fontSize="24">♥</text>
            <text x="300" y="150" fontSize="18">♥</text>
            <text x="260" y="140" fontSize="20">♥</text>
        </SunScene>
    ),

    // Colors Adventure
    'breakfast-colors': () => (
        <IndoorScene>
            <rect x="120" y="230" width="260" height="10" rx="2" style={fillableStyle('table')} />
            <rect x="100" y="240" width="10" height="80" style={fillableStyle('table-leg-l')} />
            <rect x="390" y="240" width="10" height="80" style={fillableStyle('table-leg-r')} />
            <ParentCharacter x={130} y={110} scale={0.75} gender="mother" />
            <ChildCharacter x={280} y={130} scale={0.75} />
            <circle cx="220" cy="220" r="10" style={fillableStyle('apple')} />
            <circle cx="260" cy="218" r="8" style={fillableStyle('orange-fruit')} />
            <circle cx="300" cy="220" r="7" style={fillableStyle('grape')} />
        </IndoorScene>
    ),
    'red-apple': () => (
        <SunScene>
            <ChildCharacter x={190} y={170} scale={0.95} />
            <circle cx="240" cy="230" r="25" style={fillableStyle('big-apple')} />
            <line x1="240" y1="205" x2="245" y2="195" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <ellipse cx="250" cy="198" rx="8" ry="5" style={fillableStyle('apple-leaf')} />
        </SunScene>
    ),
    'blue-sky': () => (
        <SunScene>
            <ChildCharacter x={190} y={220} scale={0.8} />
            <ellipse cx="150" cy="80" rx="50" ry="25" style={fillableStyle('big-cloud-1')} />
            <ellipse cx="350" cy="60" rx="45" ry="22" style={fillableStyle('big-cloud-2')} />
            <ellipse cx="250" cy="100" rx="40" ry="20" style={fillableStyle('big-cloud-3')} />
        </SunScene>
    ),
    'yellow-sunflower': () => (
        <SunScene>
            <ParentCharacter x={120} y={140} scale={0.85} gender="father" />
            <ChildCharacter x={260} y={170} scale={0.85} />
            {/* Sunflower */}
            <line x1="380" y1="250" x2="380" y2="350" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <circle cx="380" cy="220" r="25" style={fillableStyle('sunflower-center')} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse key={i} cx={380 + 35 * Math.cos(angle * Math.PI / 180)} cy={220 + 35 * Math.sin(angle * Math.PI / 180)} rx="12" ry="6" transform={`rotate(${angle}, ${380 + 35 * Math.cos(angle * Math.PI / 180)}, ${220 + 35 * Math.sin(angle * Math.PI / 180)})`} style={fillableStyle(`petal-${i}`)} />
            ))}
        </SunScene>
    ),
    'green-grass': () => (
        <SunScene>
            <ChildCharacter x={140} y={200} scale={0.8} />
            <ChildCharacter x={260} y={205} scale={0.7} />
        </SunScene>
    ),
    'orange-scarf': () => (
        <IndoorScene>
            <ParentCharacter x={120} y={120} scale={0.85} gender="mother" />
            <ChildCharacter x={280} y={150} scale={0.85} />
        </IndoorScene>
    ),
    'purple-butterfly': () => (
        <SunScene>
            <ChildCharacter x={170} y={170} scale={0.85} />
            {/* Butterfly */}
            <ellipse cx="340" cy="200" rx="5" ry="12" style={fillableStyle('butterfly-body')} />
            <ellipse cx="325" cy="195" rx="15" ry="10" style={fillableStyle('butterfly-wing-l')} />
            <ellipse cx="355" cy="195" rx="15" ry="10" style={fillableStyle('butterfly-wing-r')} />
            <ellipse cx="325" cy="208" rx="12" ry="8" style={fillableStyle('butterfly-wing-lb')} />
            <ellipse cx="355" cy="208" rx="12" ry="8" style={fillableStyle('butterfly-wing-rb')} />
        </SunScene>
    ),
    'pink-flower': () => (
        <SunScene>
            <ChildCharacter x={160} y={170} scale={0.85} />
            <ParentCharacter x={290} y={140} scale={0.85} gender="mother" />
            {/* Big flower */}
            <line x1="240" y1="290" x2="240" y2="350" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <circle cx="240" cy="270" r="20" style={fillableStyle('big-pink-flower')} />
            <circle cx="240" cy="270" r="8" style={fillableStyle('flower-center')} />
        </SunScene>
    ),
    'rainbow': () => (
        <SunScene>
            <Rainbow x={50} y={30} />
            <ChildCharacter x={200} y={200} scale={0.9} />
        </SunScene>
    ),
    'drawing-rainbow': () => (
        <IndoorScene>
            <ChildCharacter x={150} y={140} scale={0.85} />
            <rect x="260" y="200" width="150" height="110" rx="5" style={fillableStyle('paper')} />
            <Rainbow x={235} y={175} />
        </IndoorScene>
    ),

    // Zoo Visit
    'zoo-announcement': () => (
        <IndoorScene>
            <ParentCharacter x={80} y={120} scale={0.85} gender="father" />
            <ChildCharacter x={220} y={155} scale={0.8} />
            <ChildCharacter x={320} y={160} scale={0.7} />
        </IndoorScene>
    ),
    'zoo-gate': () => (
        <SunScene>
            <rect x="180" y="120" width="20" height="220" style={fillableStyle('gate-post-l')} />
            <rect x="300" y="120" width="20" height="220" style={fillableStyle('gate-post-r')} />
            <path d="M 180 120 Q 250 80 320 120" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <text x="215" y="110" fontSize="18" fill="#2D2147" fontWeight="bold">ZOO</text>
            <ChildCharacter x={100} y={200} scale={0.6} />
            <ParentCharacter x={340} y={180} scale={0.6} gender="mother" />
        </SunScene>
    ),
    'giraffe': () => (
        <SunScene>
            <Giraffe x={280} y={170} scale={1.1} />
            <ChildCharacter x={130} y={190} scale={0.8} />
            <Tree x={400} y={180} scale={0.7} />
        </SunScene>
    ),
    'monkeys': () => (
        <SunScene>
            <Tree x={100} y={140} scale={1} />
            <Tree x={300} y={150} scale={0.9} />
            <ChildCharacter x={200} y={200} scale={0.8} />
        </SunScene>
    ),
    'lion': () => (
        <SunScene>
            <Lion x={280} y={210} scale={1.2} />
            <ChildCharacter x={120} y={190} scale={0.85} />
        </SunScene>
    ),
    'elephant-splash': () => (
        <SunScene>
            <Elephant x={250} y={190} scale={1.2} />
            <ChildCharacter x={100} y={190} scale={0.8} />
            <circle cx="200" cy="230" r="4" style={fillableStyle('water-1')} />
            <circle cx="180" cy="250" r="3" style={fillableStyle('water-2')} />
            <circle cx="210" cy="260" r="5" style={fillableStyle('water-3')} />
        </SunScene>
    ),
    'penguins': () => (
        <SunScene>
            {/* Simple penguin shapes */}
            <ellipse cx="300" cy="290" rx="15" ry="25" style={fillableStyle('penguin-1')} />
            <circle cx="300" cy="268" r="10" style={fillableStyle('penguin-1-head')} />
            <ellipse cx="340" cy="295" rx="12" ry="22" style={fillableStyle('penguin-2')} />
            <circle cx="340" cy="275" r="9" style={fillableStyle('penguin-2-head')} />
            <ChildCharacter x={140} y={190} scale={0.85} />
        </SunScene>
    ),
    'feeding-deer': () => (
        <SunScene>
            <ChildCharacter x={150} y={180} scale={0.85} />
            {/* Simple deer */}
            <ellipse cx="330" cy="280" rx="30" ry="20" style={fillableStyle('deer-body')} />
            <circle cx="365" cy="255" r="15" style={fillableStyle('deer-head')} />
            <line x1="360" y1="242" x2="355" y2="225" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <line x1="370" y1="242" x2="375" y2="225" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <circle cx="360" cy="253" r="2.5" fill="#2D2147" />
            <ParentCharacter x={40} y={150} scale={0.7} gender="mother" />
        </SunScene>
    ),
    'gift-shop': () => (
        <IndoorScene>
            <ChildCharacter x={190} y={150} scale={0.9} />
            <Elephant x={250} y={240} scale={0.4} />
            <rect x="50" y="150" width="100" height="100" rx="5" style={fillableStyle('shelf-box')} />
        </IndoorScene>
    ),
    'going-home': () => (
        <SunScene>
            <rect x="130" y="240" width="220" height="80" rx="20" style={fillableStyle('car-body-2')} />
            <rect x="170" y="210" width="140" height="50" rx="10" style={fillableStyle('car-top-2')} />
            <circle cx="185" cy="330" r="22" style={fillableStyle('car-wheel-l-2')} />
            <circle cx="300" cy="330" r="22" style={fillableStyle('car-wheel-r-2')} />
            <circle cx="185" cy="330" r="8" fill="#2D2147" />
            <circle cx="300" cy="330" r="8" fill="#2D2147" />
        </SunScene>
    ),

    // Park Picnic
    'packing-picnic': () => (
        <IndoorScene>
            <ChildCharacter x={140} y={140} scale={0.8} />
            <ParentCharacter x={280} y={120} scale={0.8} gender="mother" />
            <rect x="200" y="270" width="80" height="50" rx="5" style={fillableStyle('basket')} />
            <path d="M 200 270 Q 240 250 280 270" style={{ ...outlineStyle, strokeWidth: 3 }} />
        </IndoorScene>
    ),
    'walking-to-park': () => (
        <SunScene>
            <ParentCharacter x={80} y={150} scale={0.8} gender="father" />
            <ParentCharacter x={180} y={150} scale={0.8} gender="mother" />
            <ChildCharacter x={300} y={180} scale={0.8} />
            <Tree x={420} y={200} scale={0.7} />
        </SunScene>
    ),
    'picnic-blanket': () => (
        <SunScene>
            <rect x="140" y="270" width="220" height="80" rx="5" style={fillableStyle('blanket-picnic')} />
            <ParentCharacter x={60} y={130} scale={0.8} gender="father" />
            <ChildCharacter x={200} y={175} scale={0.8} />
            <Tree x={400} y={180} scale={0.7} />
        </SunScene>
    ),
    'sharing-food': () => (
        <SunScene>
            <rect x="140" y="270" width="220" height="80" rx="5" style={fillableStyle('blanket-share')} />
            <ChildCharacter x={170} y={175} scale={0.75} />
            <ChildCharacter x={280} y={180} scale={0.65} />
        </SunScene>
    ),
    'butterfly': () => (
        <SunScene>
            <ChildCharacter x={190} y={180} scale={0.85} />
            <ParentCharacter x={60} y={150} scale={0.8} gender="father" />
            <ellipse cx="250" cy="240" rx="4" ry="10" style={fillableStyle('bf-body')} />
            <ellipse cx="240" cy="235" rx="12" ry="8" style={fillableStyle('bf-wl')} />
            <ellipse cx="260" cy="235" rx="12" ry="8" style={fillableStyle('bf-wr')} />
        </SunScene>
    ),
    'swings': () => (
        <SunScene>
            {/* Swing set */}
            <line x1="150" y1="120" x2="150" y2="340" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="350" y1="120" x2="350" y2="340" style={{ ...outlineStyle, strokeWidth: 4 }} />
            <line x1="140" y1="120" x2="360" y2="120" style={{ ...outlineStyle, strokeWidth: 4 }} />
            {/* Chains & seats */}
            <line x1="210" y1="120" x2="200" y2="250" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <line x1="230" y1="120" x2="240" y2="250" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <rect x="195" y="250" width="50" height="8" rx="2" style={fillableStyle('swing-seat')} />
            <line x1="290" y1="120" x2="280" y2="260" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <line x1="310" y1="120" x2="320" y2="260" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <rect x="275" y="260" width="50" height="8" rx="2" style={fillableStyle('swing-seat-2')} />
        </SunScene>
    ),
    'flower-crown': () => (
        <SunScene>
            <ChildCharacter x={190} y={170} scale={0.9} />
            <circle cx="130" cy="310" r="10" style={fillableStyle('fc-1')} />
            <circle cx="160" cy="300" r="8" style={fillableStyle('fc-2')} />
            <circle cx="380" cy="305" r="9" style={fillableStyle('fc-3')} />
            <circle cx="350" cy="315" r="7" style={fillableStyle('fc-4')} />
        </SunScene>
    ),
    'queen-crown': () => (
        <SunScene>
            <ChildCharacter x={130} y={180} scale={0.8} />
            <ParentCharacter x={270} y={140} scale={0.85} gender="mother" />
        </SunScene>
    ),
    'cleaning-park': () => (
        <SunScene>
            <ChildCharacter x={180} y={170} scale={0.85} />
            <rect x="330" y="260" width="50" height="70" rx="5" style={fillableStyle('trash-bin')} />
            <rect x="325" y="255" width="60" height="10" rx="3" style={fillableStyle('bin-lid')} />
            <Tree x={400} y={200} scale={0.6} />
        </SunScene>
    ),
    'family-walk-home': () => (
        <SunScene>
            {/* Sunset effect */}
            <circle cx="250" cy="380" r="80" style={{ fill: 'none', stroke: '#FF9F43', strokeWidth: 2 }} />
            <circle cx="250" cy="380" r="100" style={{ fill: 'none', stroke: '#FF9F43', strokeWidth: 1.5, opacity: 0.5 }} />
            <ParentCharacter x={60} y={150} scale={0.75} gender="father" />
            <ChildCharacter x={170} y={180} scale={0.75} />
            <ChildCharacter x={250} y={185} scale={0.65} />
            <ParentCharacter x={320} y={150} scale={0.75} gender="mother" />
        </SunScene>
    ),

    // ========== BAKING DAY ==========
    'baking-start': () => (
        <IndoorScene>
            <ParentCharacter x={120} y={130} scale={0.8} gender="mother" />
            <ChildCharacter x={280} y={170} scale={0.8} />
            <rect x="180" y="280" width="120" height="60" rx="5" style={fillableStyle('counter')} />
        </IndoorScene>
    ),
    'chef-hat': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={170} scale={0.9} />
            <ParentCharacter x={340} y={130} scale={0.75} gender="mother" />
        </IndoorScene>
    ),
    'flour-cloud': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={170} scale={0.85} />
            <ellipse cx="280" cy="230" rx="60" ry="40" style={fillableStyle('flour')} />
            <rect x="230" y="270" width="60" height="50" rx="5" style={fillableStyle('flour-bowl')} />
        </IndoorScene>
    ),
    'cracking-eggs': () => (
        <IndoorScene>
            <ParentCharacter x={120} y={130} scale={0.8} gender="father" />
            <ChildCharacter x={280} y={170} scale={0.8} />
            <rect x="190" y="280" width="80" height="50" rx="20" style={fillableStyle('mix-bowl')} />
        </IndoorScene>
    ),
    'mixing-together': () => (
        <IndoorScene>
            <ChildCharacter x={150} y={175} scale={0.75} />
            <ChildCharacter x={280} y={180} scale={0.65} />
            <rect x="200" y="280" width="80" height="50" rx="20" style={fillableStyle('bowl-mix')} />
        </IndoorScene>
    ),
    'filling-cups': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="280" y="290" width="100" height="30" rx="3" style={fillableStyle('tray')} />
            <circle cx="300" cy="285" r="10" style={fillableStyle('cup1')} />
            <circle cx="330" cy="285" r="10" style={fillableStyle('cup2')} />
            <circle cx="360" cy="285" r="10" style={fillableStyle('cup3')} />
        </IndoorScene>
    ),
    'watching-oven': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={180} scale={0.8} />
            <rect x="300" y="220" width="100" height="100" rx="5" style={fillableStyle('oven')} />
            <rect x="310" y="230" width="80" height="50" rx="3" style={fillableStyle('oven-window')} />
        </IndoorScene>
    ),
    'cupcakes-ready': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="290" y="280" width="100" height="25" rx="3" style={fillableStyle('tray-done')} />
            <circle cx="310" cy="270" r="12" style={fillableStyle('cake1')} />
            <circle cx="340" cy="270" r="12" style={fillableStyle('cake2')} />
            <circle cx="370" cy="270" r="12" style={fillableStyle('cake3')} />
        </IndoorScene>
    ),
    'decorating-cupcakes': () => (
        <IndoorScene>
            <ChildCharacter x={180} y={175} scale={0.85} />
            <circle cx="310" cy="280" r="14" style={fillableStyle('deco1')} />
            <circle cx="350" cy="280" r="14" style={fillableStyle('deco2')} />
            <circle cx="390" cy="280" r="14" style={fillableStyle('deco3')} />
        </IndoorScene>
    ),
    'family-cupcakes': () => (
        <IndoorScene>
            <ParentCharacter x={60} y={130} scale={0.7} gender="father" />
            <ParentCharacter x={350} y={130} scale={0.7} gender="mother" />
            <ChildCharacter x={150} y={175} scale={0.7} />
            <ChildCharacter x={260} y={180} scale={0.6} />
        </IndoorScene>
    ),

    // ========== RAINY DAY ==========
    'rainy-window': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={170} scale={0.85} />
            <rect x="300" y="120" width="100" height="120" rx="5" style={fillableStyle('window-rain')} />
            <line x1="350" y1="120" x2="350" y2="240" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <line x1="300" y1="180" x2="400" y2="180" style={{ ...outlineStyle, strokeWidth: 2 }} />
        </IndoorScene>
    ),
    'art-supplies': () => (
        <IndoorScene>
            <ParentCharacter x={130} y={130} scale={0.8} gender="mother" />
            <ChildCharacter x={290} y={170} scale={0.8} />
            <rect x="200" y="290" width="60" height="8" rx="2" style={fillableStyle('crayon1')} />
            <rect x="210" y="300" width="55" height="8" rx="2" style={fillableStyle('crayon2')} />
        </IndoorScene>
    ),
    'drawing-sun': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="300" y="250" width="80" height="60" rx="3" style={fillableStyle('paper-draw')} />
            <circle cx="340" cy="270" r="15" style={fillableStyle('drawn-sun')} />
        </IndoorScene>
    ),
    'blanket-fort': () => (
        <IndoorScene>
            <ParentCharacter x={100} y={130} scale={0.8} gender="father" />
            <ChildCharacter x={260} y={180} scale={0.8} />
            <path d="M 180 150 L 250 100 L 320 150 L 320 300 L 180 300 Z" style={fillableStyle('fort')} />
        </IndoorScene>
    ),
    'reading-fort': () => (
        <IndoorScene>
            <ChildCharacter x={180} y={180} scale={0.7} />
            <ChildCharacter x={280} y={185} scale={0.6} />
            <rect x="220" y="280" width="40" height="30" rx="2" style={fillableStyle('book-fort')} />
        </IndoorScene>
    ),
    'hot-chocolate': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={170} scale={0.85} />
            <rect x="300" y="260" width="40" height="40" rx="5" style={fillableStyle('mug')} />
            <rect x="340" y="270" width="15" height="20" rx="3" style={fillableStyle('handle')} />
        </IndoorScene>
    ),
    'puppet-show': () => (
        <IndoorScene>
            <ChildCharacter x={150} y={175} scale={0.7} />
            <ChildCharacter x={260} y={180} scale={0.6} />
            <ParentCharacter x={370} y={140} scale={0.7} gender="father" />
        </IndoorScene>
    ),
    'rain-dance': () => (
        <IndoorScene>
            <ChildCharacter x={220} y={170} scale={0.9} />
            <circle cx="130" cy="300" r="6" style={fillableStyle('note1')} />
            <circle cx="350" cy="260" r="5" style={fillableStyle('note2')} />
            <circle cx="380" cy="300" r="7" style={fillableStyle('note3')} />
        </IndoorScene>
    ),
    'rainbow-window': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="310" y="130" width="90" height="100" rx="5" style={fillableStyle('rain-win')} />
            <path d="M 320 200 Q 355 160 390 200" style={{ fill: 'none', stroke: '#FF6347', strokeWidth: 3 }} />
            <path d="M 325 205 Q 355 170 385 205" style={{ fill: 'none', stroke: '#FFA500', strokeWidth: 3 }} />
        </IndoorScene>
    ),
    'rainy-family': () => (
        <IndoorScene>
            <ParentCharacter x={60} y={130} scale={0.7} gender="father" />
            <ParentCharacter x={350} y={130} scale={0.7} gender="mother" />
            <ChildCharacter x={150} y={175} scale={0.7} />
            <ChildCharacter x={260} y={180} scale={0.6} />
        </IndoorScene>
    ),

    // ========== GARDEN HELPERS ==========
    'garden-start': () => (
        <SunScene>
            <ParentCharacter x={100} y={150} scale={0.8} gender="father" />
            <ChildCharacter x={280} y={180} scale={0.8} />
            <Tree x={400} y={200} scale={0.6} />
        </SunScene>
    ),
    'digging-soil': () => (
        <SunScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="280" y="300" width="150" height="40" rx="3" style={fillableStyle('soil')} />
        </SunScene>
    ),
    'planting-seeds': () => (
        <SunScene>
            <ChildCharacter x={200} y={180} scale={0.85} />
            <rect x="280" y="300" width="150" height="40" rx="3" style={fillableStyle('soil-plant')} />
            <circle cx="310" cy="300" r="3" style={fillableStyle('seed1')} />
            <circle cx="350" cy="300" r="3" style={fillableStyle('seed2')} />
            <circle cx="390" cy="300" r="3" style={fillableStyle('seed3')} />
        </SunScene>
    ),
    'watering-seeds': () => (
        <SunScene>
            <ParentCharacter x={100} y={150} scale={0.8} gender="mother" />
            <ChildCharacter x={280} y={180} scale={0.8} />
            <rect x="300" y="300" width="120" height="30" rx="3" style={fillableStyle('soil-water')} />
        </SunScene>
    ),
    'checking-garden': () => (
        <SunScene>
            <ChildCharacter x={200} y={180} scale={0.85} />
            <rect x="290" y="290" width="120" height="40" rx="3" style={fillableStyle('garden-bed')} />
        </SunScene>
    ),
    'first-sprout': () => (
        <SunScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="290" y="300" width="120" height="40" rx="3" style={fillableStyle('soil-sprout')} />
            <line x1="350" y1="300" x2="350" y2="270" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <ellipse cx="340" cy="268" rx="10" ry="6" style={fillableStyle('leaf-l')} />
            <ellipse cx="360" cy="268" rx="10" ry="6" style={fillableStyle('leaf-r')} />
        </SunScene>
    ),
    'garden-care': () => (
        <SunScene>
            <ChildCharacter x={150} y={175} scale={0.75} />
            <ChildCharacter x={300} y={180} scale={0.65} />
            <rect x="220" y="300" width="120" height="30" rx="3" style={fillableStyle('garden-soil')} />
        </SunScene>
    ),
    'growing-plants': () => (
        <SunScene>
            <ChildCharacter x={180} y={180} scale={0.8} />
            <line x1="320" y1="310" x2="320" y2="250" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <ellipse cx="310" cy="248" rx="10" ry="7" style={fillableStyle('plant-leaf1')} />
            <ellipse cx="330" cy="248" rx="10" ry="7" style={fillableStyle('plant-leaf2')} />
            <line x1="380" y1="310" x2="380" y2="260" style={{ ...outlineStyle, strokeWidth: 3 }} />
            <ellipse cx="370" cy="258" rx="8" ry="5" style={fillableStyle('plant-leaf3')} />
            <ellipse cx="390" cy="258" rx="8" ry="5" style={fillableStyle('plant-leaf4')} />
        </SunScene>
    ),
    'flowers-bloom': () => (
        <SunScene>
            <Tree x={400} y={200} scale={0.6} />
            <circle cx="160" cy="270" r="12" style={fillableStyle('bloom1')} />
            <circle cx="220" cy="280" r="10" style={fillableStyle('bloom2')} />
            <circle cx="300" cy="275" r="11" style={fillableStyle('bloom3')} />
            <circle cx="360" cy="285" r="9" style={fillableStyle('bloom4')} />
        </SunScene>
    ),
    'garden-bouquet': () => (
        <SunScene>
            <ChildCharacter x={150} y={175} scale={0.8} />
            <ParentCharacter x={310} y={140} scale={0.8} gender="mother" />
            <circle cx="230" cy="260" r="8" style={fillableStyle('bq1')} />
            <circle cx="245" cy="255" r="8" style={fillableStyle('bq2')} />
            <circle cx="237" cy="248" r="8" style={fillableStyle('bq3')} />
        </SunScene>
    ),

    // ========== SPACE ADVENTURE ==========
    'starry-night': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('night-bg')} />
            <ChildCharacter x={200} y={180} scale={0.85} />
            <rect x="310" y="130" width="90" height="100" rx="5" style={fillableStyle('night-win')} />
            <circle cx="340" cy="155" r="4" style={fillableStyle('star-1')} />
            <circle cx="370" cy="170" r="3" style={fillableStyle('star-2')} />
            <circle cx="350" cy="200" r="3" style={fillableStyle('star-3')} />
            <circle cx="420" cy="100" r="20" style={fillableStyle('moon')} />
        </svg>
    ),
    'rocket-imagine': () => (
        <SunScene>
            <ChildCharacter x={140} y={175} scale={0.85} />
            <polygon points="340,120 320,220 360,220" style={fillableStyle('rocket-body')} />
            <polygon points="340,100 330,120 350,120" style={fillableStyle('rocket-nose')} />
            <circle cx="340" cy="160" r="10" style={fillableStyle('rocket-window')} />
        </SunScene>
    ),
    'space-helmets': () => (
        <IndoorScene>
            <ChildCharacter x={170} y={175} scale={0.8} />
            <ChildCharacter x={300} y={180} scale={0.7} />
            <circle cx="200" cy="195" r="30" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 2.5 }} />
            <circle cx="330" cy="200" r="25" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 2.5 }} />
        </IndoorScene>
    ),
    'blast-off': () => (
        <SunScene>
            <polygon points="250,60 220,200 280,200" style={fillableStyle('rocket-blast')} />
            <polygon points="250,40 235,60 265,60" style={fillableStyle('rocket-tip')} />
            <circle cx="250" cy="120" r="12" style={fillableStyle('porthole')} />
            <polygon points="220,200 200,230 230,200" style={fillableStyle('fin-l')} />
            <polygon points="280,200 300,230 270,200" style={fillableStyle('fin-r')} />
            <ellipse cx="250" cy="240" rx="20" ry="30" style={fillableStyle('flame')} />
        </SunScene>
    ),
    'floating-space': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('space-bg')} />
            <ChildCharacter x={200} y={170} scale={0.85} />
            <circle cx="400" cy="300" r="40" style={fillableStyle('earth')} />
            <circle cx="120" cy="100" r="4" style={fillableStyle('s-star1')} />
            <circle cx="380" cy="80" r="3" style={fillableStyle('s-star2')} />
        </svg>
    ),
    'flying-moon': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('space-bg2')} />
            <circle cx="350" cy="200" r="60" style={fillableStyle('moon-big')} />
            <circle cx="330" cy="180" r="10" style={fillableStyle('crater1')} />
            <circle cx="370" cy="210" r="8" style={fillableStyle('crater2')} />
            <polygon points="150,150 130,220 170,220" style={fillableStyle('rocket-fly')} />
            <circle cx="150" cy="180" r="8" style={fillableStyle('port-fly')} />
        </svg>
    ),
    'colorful-planets': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('space-bg3')} />
            <circle cx="120" cy="150" r="35" style={fillableStyle('planet1')} />
            <circle cx="280" cy="200" r="50" style={fillableStyle('planet2')} />
            <circle cx="400" cy="130" r="30" style={fillableStyle('planet3')} />
            <ellipse cx="400" cy="130" rx="50" ry="10" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 2 }} />
        </svg>
    ),
    'friendly-alien': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('space-bg4')} />
            <ellipse cx="250" cy="280" rx="40" ry="25" style={fillableStyle('alien-body')} />
            <circle cx="250" cy="240" r="25" style={fillableStyle('alien-head')} />
            <circle cx="240" cy="235" r="8" style={fillableStyle('alien-eye1')} />
            <circle cx="260" cy="235" r="8" style={fillableStyle('alien-eye2')} />
            <ellipse cx="250" cy="330" rx="50" ry="15" style={fillableStyle('ufo')} />
        </svg>
    ),
    'standing-star': () => (
        <svg viewBox="0 0 500 400" style={{ background: 'white' }}>
            <rect x="0" y="0" width="500" height="400" style={fillableStyle('space-bg5')} />
            <polygon points="250,120 270,200 350,200 285,250 310,330 250,280 190,330 215,250 150,200 230,200" style={fillableStyle('big-star')} />
            <ChildCharacter x={200} y={175} scale={0.6} />
        </svg>
    ),
    'space-dream': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={190} scale={0.85} />
            <circle cx="300" cy="120" r="15" style={fillableStyle('dream-star')} />
            <circle cx="360" cy="140" r="20" style={fillableStyle('dream-planet')} />
            <ellipse cx="360" cy="140" rx="30" ry="6" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 1.5 }} />
        </IndoorScene>
    ),

    // ========== BEACH DAY ==========
    'beach-packing': () => (
        <IndoorScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="300" y="260" width="70" height="60" rx="5" style={fillableStyle('beach-bag')} />
            <rect x="310" y="250" width="50" height="15" rx="3" style={fillableStyle('bag-handle')} />
        </IndoorScene>
    ),
    'sandy-toes': () => (
        <SunScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="0" y="310" width="500" height="90" rx="0" style={fillableStyle('sand')} />
            <path d="M 0 310 Q 125 290 250 310 Q 375 330 500 310" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 2 }} />
        </SunScene>
    ),
    'sandcastle': () => (
        <SunScene>
            <ChildCharacter x={100} y={180} scale={0.7} />
            <ChildCharacter x={340} y={185} scale={0.6} />
            <rect x="200" y="270" width="100" height="60" rx="3" style={fillableStyle('castle-base')} />
            <rect x="210" y="245" width="30" height="30" rx="2" style={fillableStyle('tower1')} />
            <rect x="260" y="245" width="30" height="30" rx="2" style={fillableStyle('tower2')} />
            <polygon points="225,245 210,230 240,230" style={fillableStyle('roof1')} />
            <polygon points="275,245 260,230 290,230" style={fillableStyle('roof2')} />
        </SunScene>
    ),
    'seashells': () => (
        <SunScene>
            <ChildCharacter x={200} y={175} scale={0.85} />
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('beach-sand')} />
            <ellipse cx="310" cy="310" rx="10" ry="7" style={fillableStyle('shell1')} />
            <ellipse cx="350" cy="315" rx="8" ry="6" style={fillableStyle('shell2')} />
            <ellipse cx="390" cy="310" rx="9" ry="7" style={fillableStyle('shell3')} />
        </SunScene>
    ),
    'beach-picnic': () => (
        <SunScene>
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('picnic-sand')} />
            <rect x="140" y="275" width="200" height="70" rx="3" style={fillableStyle('beach-blanket')} />
            <ParentCharacter x={60} y={140} scale={0.7} gender="mother" />
            <ChildCharacter x={200} y={180} scale={0.7} />
        </SunScene>
    ),
    'beach-sharing': () => (
        <SunScene>
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('share-sand')} />
            <ChildCharacter x={170} y={180} scale={0.75} />
            <ChildCharacter x={290} y={185} scale={0.7} />
        </SunScene>
    ),
    'playing-waves': () => (
        <SunScene>
            <rect x="0" y="290" width="500" height="110" style={fillableStyle('ocean')} />
            <path d="M 0 290 Q 60 270 120 290 Q 180 310 240 290 Q 300 270 360 290 Q 420 310 500 290" style={{ fill: 'none', stroke: '#2D2147', strokeWidth: 2.5 }} />
            <ParentCharacter x={100} y={150} scale={0.7} gender="father" />
            <ChildCharacter x={260} y={180} scale={0.75} />
        </SunScene>
    ),
    'beach-crab': () => (
        <SunScene>
            <ChildCharacter x={170} y={180} scale={0.8} />
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('crab-sand')} />
            <ellipse cx="340" cy="300" rx="18" ry="12" style={fillableStyle('crab-body')} />
            <circle cx="330" cy="288" r="4" style={fillableStyle('crab-eye-l')} />
            <circle cx="350" cy="288" r="4" style={fillableStyle('crab-eye-r')} />
        </SunScene>
    ),
    'beach-sunset': () => (
        <SunScene>
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('sunset-sand')} />
            <circle cx="250" cy="310" r="60" style={fillableStyle('sunset-sun')} />
            <ParentCharacter x={60} y={160} scale={0.6} gender="father" />
            <ChildCharacter x={150} y={190} scale={0.6} />
            <ChildCharacter x={220} y={195} scale={0.5} />
            <ParentCharacter x={290} y={160} scale={0.6} gender="mother" />
        </SunScene>
    ),
    'sharing-shells': () => (
        <SunScene>
            <rect x="0" y="310" width="500" height="90" style={fillableStyle('final-sand')} />
            <ChildCharacter x={180} y={175} scale={0.8} />
            <ParentCharacter x={60} y={140} scale={0.7} gender="father" />
            <ParentCharacter x={340} y={140} scale={0.7} gender="mother" />
        </SunScene>
    ),
};

function getCategoryFromId(id) {
    const skillList = ['pottery', 'baking', 'dancing', 'painting', 'building', 'music', 'science', 'cooking', 'gardening', 'coding'];
    const familyList = ['puppy', 'rainy', 'baby', 'grandparents', 'birthday', 'helping', 'moving', 'picnic', 'bedtime', 'morning'];
    const learningList = ['colors', 'number', 'shape', 'animal', 'seasons', 'weather', 'planet', 'fruit', 'vegetable', 'ocean'];
    const outdoorList = ['zoo', 'park', 'beach', 'garden', 'forest', 'mountain', 'desert', 'jungle', 'winter', 'farm'];
    const imaginationList = ['space', 'dinosaur', 'robot', 'fairy', 'pirate', 'superhero', 'castle', 'time', 'underwater', 'toys'];

    if (skillList.some(s => id.includes(s))) return 'skill';
    if (familyList.some(s => id.includes(s))) return 'family';
    if (learningList.some(s => id.includes(s))) return 'learning';
    if (outdoorList.some(s => id.includes(s))) return 'outdoor';
    if (imaginationList.some(s => id.includes(s))) return 'imagination';
    return 'outdoor';
}

function Decoration({ x, y, type, rotation = 0 }) {
    const style = { fill: 'none', stroke: '#2D2147', strokeWidth: 1.5, opacity: 0.6 };
    switch (type) {
        case 'skill': // Floating bubbles/gears
            return <circle cx={x} cy={y} r={10} style={style} transform={`rotate(${rotation} ${x} ${y})`} />;
        case 'family': // Floating hearts/shapes
            return <path d={`M ${x} ${y} q 5 -10 10 0 q 5 10 -10 10 q -15 0 -10 -10 q 5 -10 10 0`} style={style} transform={`rotate(${rotation} ${x} ${y})`} />;
        case 'learning': // Floating stars
            return <path d={`M ${x} ${y} l 5 15 l 15 5 l -15 5 l -5 15 l -5 -15 l -15 -5 z`} style={style} transform={`rotate(${rotation} ${x} ${y})`} />;
        case 'outdoor': // Floating leaves/trees
            return <path d={`M ${x} ${y} l 10 20 h -20 z`} style={style} transform={`rotate(${rotation} ${x} ${y})`} />;
        case 'imagination': // Floating stars/moons (crescent moon)
            return <path d={`M ${x} ${y} A 10 10 0 1 0 ${x + 10} ${y} A 10 10 0 1 1 ${x} ${y}`} style={style} transform={`rotate(${rotation} ${x} ${y})`} />;
        default:
            return <circle cx={x} cy={y} r={5} style={style} />;
    }
}

export function NightScene({ children }) {
    return (
        <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
            {/* Dark Sky Background */}
            <rect x="0" y="0" width="500" height="400" fill="#2d3436" />

            {/* Moon */}
            <path d="M 400 80 A 30 30 0 1 0 440 60 A 40 40 0 1 1 400 80 Z" style={fillableStyle('moon')} />

            {/* Stars */}
            <circle cx="100" cy="50" r="2" fill="#FFFFFF" />
            <circle cx="200" cy="120" r="3" fill="#FFFFFF" />
            <circle cx="300" cy="70" r="1.5" fill="#FFFFFF" />
            <circle cx="50" cy="180" r="2.5" fill="#FFFFFF" />

            {/* Room / Bed Base */}
            <rect x="0" y="250" width="500" height="150" fill="#636e72" />
            <line x1="0" y1="250" x2="500" y2="250" style={{ ...outlineStyle, strokeWidth: 4, stroke: '#FFFFFF' }} />

            {children}
        </svg>
    );
}

export function SetupLayout({ pageNum, category, id }) {
    const isEven = pageNum % 2 === 0;
    return (
        <IndoorScene>
            <rect x="100" y="250" width="300" height="20" rx="5" style={fillableStyle(id + '-table')} />
            <line x1="120" y1="270" x2="120" y2="350" style={{ ...outlineStyle, strokeWidth: 8 }} />
            <line x1="380" y1="270" x2="380" y2="350" style={{ ...outlineStyle, strokeWidth: 8 }} />

            <ChildCharacter x={150} y={150} scale={0.8} facing={isEven ? "right" : "left"} />
            <ParentCharacter x={300} y={120} scale={0.7} gender={isEven ? "mother" : "father"} />

            {/* Thematic Centerpiece! */}
            {getThemeSprite(id, 250, 220, 1.8)}

            <Decoration x={50} y={50} type={category} rotation={pageNum * 10} />
            <Decoration x={450} y={80} type={category} rotation={pageNum * 20} />
        </IndoorScene>
    );
}

export function DiscoveryLayout({ pageNum, category, id }) {
    const isEven = pageNum % 2 === 0;
    return (
        <SunScene>
            <path d="M 0 350 Q 50 250 150 350 Z" style={fillableStyle(id + '-bush1')} />
            <path d="M 350 350 Q 450 200 500 350 Z" style={fillableStyle(id + '-bush2')} />

            <ChildCharacter x={200 + (pageNum % 3) * 20} y={180} scale={0.75} />
            {isEven && <ParentCharacter x={50} y={140} scale={0.65} />}

            {/* Thematic Sprite integrated with discovery! */}
            {getThemeSprite(id, 350, 310, 1.5, Math.sin(pageNum) * 10)}

            <circle cx={270} cy={220} r={18} style={fillableStyle(id + '-glass')} />
            <line x1="255" y1="235" x2="230" y2="280" style={{ ...outlineStyle, strokeWidth: 4 }} />

            <Decoration x={250} y={100} type={category} rotation={pageNum * 15} />
        </SunScene>
    );
}

export function ChallengeLayout({ pageNum, category, id }) {
    return (
        <SunScene>
            <path d="M 250 400 L 350 150 L 500 400 Z" style={fillableStyle(id + '-obstacle')} />
            <path d="M 150 400 L 250 250 L 320 400 Z" style={fillableStyle(id + '-obstacle2')} />

            <ChildCharacter x={100 + (pageNum % 20)} y={220} scale={0.65} />
            <ParentCharacter x={30} y={180} scale={0.65} gender="father" />

            <line x1="160" y1="290" x2="250" y2="250" style={{ ...outlineStyle, strokeWidth: 3, strokeDasharray: "10,10" }} />

            {/* Thematic Sprite right on top of the mountain/obstacle */}
            {getThemeSprite(id, 350, 130, 2, pageNum * 5)}

            <Decoration x={250} y={80} type={category} rotation={pageNum * 25} />
        </SunScene>
    );
}

export function SuccessLayout({ pageNum, category, id }) {
    return (
        <IndoorScene>
            <path d="M 50 50 Q 250 100 450 50" style={{ ...outlineStyle, strokeWidth: 2 }} />
            <polygon points="100,60 110,80 120,60" style={fillableStyle(id + '-flag1')} />
            <polygon points="200,75 210,95 220,75" style={fillableStyle(id + '-flag2')} />
            <polygon points="300,75 310,95 320,75" style={fillableStyle(id + '-flag3')} />
            <polygon points="400,60 410,80 420,60" style={fillableStyle(id + '-flag4')} />

            <ChildCharacter x={220} y={160} scale={0.9} />

            <rect x="350" y="240" width="60" height="80" rx="10" style={fillableStyle(id + '-pedestal')} />

            {/* Thematic Sprite right on the trophy pedestal! */}
            {getThemeSprite(id, 380, 210, 2.5)}

            <Decoration x={100} y={150} type={category} rotation={20 + pageNum * 10} />
            <Decoration x={150} y={250} type={category} rotation={40 + pageNum * 10} />
            <Decoration x={400} y={100} type={category} rotation={60 + pageNum * 10} />
            <Decoration x={350} y={320} type={category} rotation={80 + pageNum * 10} />
        </IndoorScene>
    );
}

export function ClosingLayout({ pageNum, category, id }) {
    return (
        <NightScene>
            <rect x="350" y="40" width="100" height="120" rx="10" style={{ ...outlineStyle, strokeWidth: 8, stroke: '#FFFFFF' }} />
            <line x1="400" y1="40" x2="400" y2="160" style={{ ...outlineStyle, strokeWidth: 4, stroke: '#FFFFFF' }} />
            <line x1="350" y1="100" x2="450" y2="100" style={{ ...outlineStyle, strokeWidth: 4, stroke: '#FFFFFF' }} />

            <rect x="50" y="280" width="250" height="40" rx="5" style={fillableStyle(id + '-bed')} />
            <rect x="30" y="240" width="30" height="100" rx="5" style={fillableStyle(id + '-headboard')} />

            <g transform="translate(240, 240) rotate(90) scale(0.65)">
                <ChildCharacter x={0} y={0} scale={1} />
            </g>

            <path d="M 100 270 Q 200 250 300 270 L 300 320 L 100 320 Z" style={fillableStyle(id + '-blanket')} />

            <ParentCharacter x={330} y={120} scale={0.75} gender="mother" />

            {/* Thematic Sprite dreaming floating above the bed! */}
            {getThemeSprite(id, 150, 150, 2, Math.sin(pageNum) * 15)}
            <ellipse cx="150" cy="150" rx="45" ry="35" style={{ ...outlineStyle, strokeDasharray: "5,5" }} />
        </NightScene>
    );
}

function getDynamicFallback(id) {
    const category = getCategoryFromId(id);
    const parts = id.split('-');
    const pageNum = parseInt(parts[parts.length - 1]) || 0;

    if (pageNum <= 10) return <SetupLayout pageNum={pageNum} category={category} id={id} />;
    if (pageNum <= 20) return <DiscoveryLayout pageNum={pageNum} category={category} id={id} />;
    if (pageNum <= 35) return <ChallengeLayout pageNum={pageNum} category={category} id={id} />;
    if (pageNum <= 45) return <SuccessLayout pageNum={pageNum} category={category} id={id} />;
    return <ClosingLayout pageNum={pageNum} category={category} id={id} />;
}

export function getIllustration(id) {
    // Check for AI-generated image first
    const imagePath = imageIllustrations[id];
    if (imagePath) {
        return (
            <img
                src={imagePath}
                alt="Story illustration"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px'
                }}
            />
        );
    }

    // Fall back to manual SVG illustration if exists
    const IllustrationComponent = illustrations[id];
    if (IllustrationComponent) {
        return <IllustrationComponent />;
    }

    // Try unique per-story scene (50 unique backgrounds)
    const storyScene = getStoryScene(id);
    if (storyScene) {
        return storyScene;
    }

    // Final generic fallback for any unmapped content
    return getDynamicFallback(id);
}

export default illustrations;
