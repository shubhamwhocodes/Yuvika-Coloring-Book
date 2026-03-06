import React from 'react';

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

export function getThemeSprite(themeId, x, y, scale = 1, rotation = 0) {
    const transform = `translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`;

    switch (themeId) {
        // ================= SKILL =================
        case 'pottery-class':
            return (
                <g transform={transform}>
                    <path d="M -20 20 Q 0 -20 20 20 L -20 20" style={fillableStyle(themeId + '-clay')} />
                    <ellipse cx="0" cy="25" rx="30" ry="10" style={fillableStyle(themeId + '-wheel')} />
                    <rect x="-15" y="30" width="30" height="20" style={fillableStyle(themeId + '-base')} />
                </g>
            );
        case 'baking-day':
            return (
                <g transform={transform}>
                    <path d="M -20 20 L -15 0 L 15 0 L 20 20 Z" style={fillableStyle(themeId + '-bowl')} />
                    <ellipse cx="0" cy="0" rx="15" ry="5" style={fillableStyle(themeId + '-bowl-top')} />
                    <line x1="0" y1="5" x2="15" y2="-20" style={outlineStyle} />
                    <circle cx="-10" cy="30" r="5" style={fillableStyle(themeId + '-cookie1')} />
                    <circle cx="10" cy="30" r="5" style={fillableStyle(themeId + '-cookie2')} />
                </g>
            );
        case 'dancing-dreams':
            return (
                <g transform={transform}>
                    <path d="M -20 -10 Q 0 -30 20 -10 Q 0 10 -20 -10" style={fillableStyle(themeId + '-shoe1')} />
                    <path d="M 0 0 Q 20 -20 40 0 Q 20 20 0 0" style={fillableStyle(themeId + '-shoe2')} />
                    <path d="M 0 -10 L 10 -40 M 20 -10 L 30 -40" style={outlineStyle} />
                </g>
            );
        case 'painting-party':
            return (
                <g transform={transform}>
                    <path d="M -30 10 A 30 30 0 1 1 30 10 A 30 30 0 1 1 -30 10" style={fillableStyle(themeId + '-palette')} />
                    <circle cx="15" cy="0" r="4" style={outlineStyle} />
                    <circle cx="-15" cy="-10" r="6" style={fillableStyle(themeId + '-paint1')} />
                    <circle cx="0" cy="-20" r="5" style={fillableStyle(themeId + '-paint2')} />
                </g>
            );
        case 'building-blocks':
            return (
                <g transform={transform}>
                    <rect x="-20" y="-10" width="40" height="20" style={fillableStyle(themeId + '-block1')} />
                    <circle cx="-10" cy="-15" r="4" style={fillableStyle(themeId + '-stud1')} />
                    <circle cx="10" cy="-15" r="4" style={fillableStyle(themeId + '-stud2')} />
                    <rect x="-10" y="10" width="20" height="20" style={fillableStyle(themeId + '-block2')} />
                </g>
            );
        case 'music-school':
            return (
                <g transform={transform}>
                    <circle cx="-10" cy="20" r="8" style={fillableStyle(themeId + '-note1')} />
                    <circle cx="20" cy="15" r="8" style={fillableStyle(themeId + '-note2')} />
                    <line x1="-2" y1="20" x2="-2" y2="-10" style={outlineStyle} />
                    <line x1="28" y1="15" x2="28" y2="-15" style={outlineStyle} />
                    <line x1="-2" y1="-10" x2="28" y2="-15" style={{ ...outlineStyle, strokeWidth: 5 }} />
                </g>
            );
        case 'little-scientist':
            return (
                <g transform={transform}>
                    <path d="M -10 -20 L 10 -20 L 15 20 L -15 20 Z" style={fillableStyle(themeId + '-flask')} />
                    <ellipse cx="0" cy="-20" rx="10" ry="3" style={fillableStyle(themeId + '-flask-top')} />
                    <circle cx="0" cy="-35" r="4" style={fillableStyle(themeId + '-bubble1')} />
                    <circle cx="10" cy="-45" r="3" style={fillableStyle(themeId + '-bubble2')} />
                </g>
            );
        case 'junior-chef':
            return (
                <g transform={transform}>
                    <path d="M -20 -10 Q 0 -40 20 -10 L 20 10 L -20 10 Z" style={fillableStyle(themeId + '-hat')} />
                    <rect x="-25" y="10" width="50" height="10" rx="3" style={fillableStyle(themeId + '-hat-band')} />
                </g>
            );
        case 'young-gardener':
            return (
                <g transform={transform}>
                    <path d="M -15 -10 L 15 -10 L 10 20 L -10 20 Z" style={fillableStyle(themeId + '-pot')} />
                    <line x1="0" y1="-10" x2="0" y2="-30" style={outlineStyle} />
                    <circle cx="0" cy="-40" r="10" style={fillableStyle(themeId + '-flower-center')} />
                    <path d="M 0 -40 Q 20 -60 0 -80 Q -20 -60 0 -40" style={fillableStyle(themeId + '-petal')} />
                </g>
            );
        case 'star-coder':
            return (
                <g transform={transform}>
                    <rect x="-30" y="-20" width="60" height="40" rx="5" style={fillableStyle(themeId + '-monitor')} />
                    <rect x="-20" y="-10" width="40" height="20" style={outlineStyle} />
                    <line x1="-5" y1="20" x2="-10" y2="35" style={outlineStyle} />
                    <line x1="5" y1="20" x2="10" y2="35" style={outlineStyle} />
                    <rect x="-20" y="35" width="40" height="5" style={fillableStyle(themeId + '-keyboard')} />
                </g>
            );

        // ================= FAMILY =================
        case 'puppy-story':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="0" r="20" style={fillableStyle(themeId + '-dog-head')} />
                    <ellipse cx="-20" cy="-5" rx="8" ry="15" transform="rotate(-30 -20 -5)" style={fillableStyle(themeId + '-ear-l')} />
                    <ellipse cx="20" cy="-5" rx="8" ry="15" transform="rotate(30 20 -5)" style={fillableStyle(themeId + '-ear-r')} />
                    <circle cx="-8" cy="-2" r="3" fill="#2D2147" />
                    <circle cx="8" cy="-2" r="3" fill="#2D2147" />
                    <ellipse cx="0" cy="8" rx="5" ry="3" fill="#2D2147" />
                </g>
            );
        case 'rainy-day':
            return (
                <g transform={transform}>
                    <path d="M -30 10 Q 0 -30 30 10 Z" style={fillableStyle(themeId + '-umbrella')} />
                    <line x1="0" y1="10" x2="0" y2="35" style={outlineStyle} />
                    <path d="M 0 35 Q 10 45 15 30" style={outlineStyle} />
                    <circle cx="-20" cy="25" r="3" style={fillableStyle(themeId + '-drop1')} />
                    <circle cx="20" cy="35" r="3" style={fillableStyle(themeId + '-drop2')} />
                </g>
            );
        case 'new-baby':
            return (
                <g transform={transform}>
                    <path d="M -25 0 A 25 25 0 0 0 25 0 Z" style={fillableStyle(themeId + '-pram-body')} />
                    <path d="M 0 0 A 25 25 0 0 0 25 0 L 0 0 Z" style={fillableStyle(themeId + '-pram-hood')} />
                    <circle cx="-15" cy="5" r="8" style={fillableStyle(themeId + '-wheel1')} />
                    <circle cx="15" cy="5" r="8" style={fillableStyle(themeId + '-wheel2')} />
                    <line x1="-25" y1="-10" x2="-40" y2="-20" style={outlineStyle} />
                </g>
            );
        case 'grandparents-visit':
            return (
                <g transform={transform}>
                    <rect x="-20" y="-15" width="40" height="30" rx="3" style={fillableStyle(themeId + '-frame')} />
                    <rect x="-15" y="-10" width="30" height="20" style={outlineStyle} />
                    <circle cx="0" cy="0" r="5" style={fillableStyle(themeId + '-photo-person')} />
                    <path d="M -10 10 Q 0 0 10 10" style={outlineStyle} />
                </g>
            );
        case 'birthday-party':
            return (
                <g transform={transform}>
                    <rect x="-20" y="-5" width="40" height="25" style={fillableStyle(themeId + '-cake-base')} />
                    <rect x="-15" y="-20" width="30" height="15" style={fillableStyle(themeId + '-cake-top')} />
                    <line x1="0" y1="-20" x2="0" y2="-35" style={outlineStyle} />
                    <path d="M -3 -35 Q 0 -45 3 -35 Z" style={fillableStyle(themeId + '-flame')} />
                </g>
            );
        case 'helping-hands':
            return (
                <g transform={transform}>
                    <rect x="-20" y="-10" width="40" height="30" rx="5" style={fillableStyle(themeId + '-basket')} />
                    <path d="M -10 -10 Q 0 -30 10 -10" style={outlineStyle} />
                    <circle cx="-10" cy="-5" r="8" style={fillableStyle(themeId + '-apple')} />
                    <rect x="5" y="-15" width="10" height="20" rx="2" style={fillableStyle(themeId + '-milk')} />
                </g>
            );
        case 'moving-house':
            return (
                <g transform={transform}>
                    <rect x="-25" y="-20" width="50" height="40" style={fillableStyle(themeId + '-box')} />
                    <path d="M -25 -20 L -10 -35 L 10 -35 L 25 -20" style={outlineStyle} />
                    <line x1="-25" y1="-5" x2="25" y2="-5" style={outlineStyle} />
                    <path d="M -10 -20 Q 0 -10 10 -20" style={outlineStyle} />
                </g>
            );
        case 'family-picnic':
            return (
                <g transform={transform}>
                    <path d="M -30 10 L 0 -10 L 30 10 L 0 30 Z" style={fillableStyle(themeId + '-blanket')} />
                    <rect x="-10" y="-5" width="20" height="15" style={fillableStyle(themeId + '-picnic-basket')} />
                    <path d="M -5 -5 Q 0 -15 5 -5" style={outlineStyle} />
                </g>
            );
        case 'bedtime-story':
            return (
                <g transform={transform}>
                    <path d="M -20 -10 A 20 20 0 1 0 10 -30 A 25 25 0 1 1 -20 -10 Z" style={fillableStyle(themeId + '-moon')} />
                    <circle cx="20" cy="-10" r="3" style={fillableStyle(themeId + '-star1')} />
                    <circle cx="0" cy="-40" r="2" style={fillableStyle(themeId + '-star2')} />
                </g>
            );
        case 'morning-routine':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="0" r="20" style={fillableStyle(themeId + '-clock')} />
                    <circle cx="0" cy="0" r="2" fill="#2D2147" />
                    <line x1="0" y1="0" x2="0" y2="-12" style={outlineStyle} />
                    <line x1="0" y1="0" x2="10" y2="5" style={outlineStyle} />
                    <path d="M -15 -15 L -25 -25 M 15 -15 L 25 -25" style={outlineStyle} />
                </g>
            );

        // ================= LEARNING =================
        case 'colors-adventure':
            return (
                <g transform={transform}>
                    <path d="M -30 20 A 30 30 0 0 1 30 20" style={{ ...outlineStyle, strokeWidth: 8 }} />
                    <path d="M -20 20 A 20 20 0 0 1 20 20" style={{ ...outlineStyle, strokeWidth: 8 }} />
                    <path d="M -10 20 A 10 10 0 0 1 10 20" style={{ ...outlineStyle, strokeWidth: 8 }} />
                </g>
            );
        case 'number-magic':
            return (
                <g transform={transform} style={{ fontSize: '40px', fontWeight: 'bold', fill: '#FFFFFF', stroke: '#2D2147', strokeWidth: 2 }}>
                    <text x="-15" y="15">1</text>
                    <text x="5" y="-5" style={{ fontSize: '20px' }}>2</text>
                    <text x="15" y="25" style={{ fontSize: '30px' }}>3</text>
                </g>
            );
        case 'shape-hunters':
            return (
                <g transform={transform}>
                    <rect x="-30" y="-10" width="20" height="20" style={fillableStyle(themeId + '-square')} />
                    <circle cx="0" cy="15" r="12" style={fillableStyle(themeId + '-circle')} />
                    <polygon points="15,0 35,20 15,20" style={fillableStyle(themeId + '-triangle')} />
                </g>
            );
        case 'animal-friends':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="0" r="15" style={fillableStyle(themeId + '-paw-pad')} />
                    <circle cx="-15" cy="-20" r="6" style={fillableStyle(themeId + '-toe1')} />
                    <circle cx="0" cy="-25" r="6" style={fillableStyle(themeId + '-toe2')} />
                    <circle cx="15" cy="-20" r="6" style={fillableStyle(themeId + '-toe3')} />
                </g>
            );
        case 'seasons-change':
            return (
                <g transform={transform}>
                    <path d="M 0 -20 Q 20 0 0 20 Q -20 0 0 -20" style={fillableStyle(themeId + '-leaf')} />
                    <line x1="0" y1="-15" x2="0" y2="25" style={outlineStyle} />
                </g>
            );
        case 'weather-wonders':
            return (
                <g transform={transform}>
                    <path d="M -20 0 Q -20 -20 0 -20 Q 20 -20 20 0 Q 30 0 30 15 L -30 15 Q -30 0 -20 0" style={fillableStyle(themeId + '-cloud')} />
                    <polygon points="0,15 -10,35 5,30 -5,50 15,25 5,30 20,15" style={fillableStyle(themeId + '-lightning')} />
                </g>
            );
        case 'planet-explorer':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="0" r="20" style={fillableStyle(themeId + '-planet')} />
                    <ellipse cx="0" cy="0" rx="35" ry="8" transform="rotate(-20)" style={outlineStyle} />
                    <circle cx="-10" cy="-5" r="3" style={outlineStyle} />
                    <circle cx="8" cy="10" r="4" style={outlineStyle} />
                </g>
            );
        case 'fruit-garden':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="5" r="20" style={fillableStyle(themeId + '-apple')} />
                    <path d="M 0 -15 Q 15 -25 20 -10 Q 5 0 0 -15" style={fillableStyle(themeId + '-leaf')} />
                    <line x1="0" y1="-15" x2="5" y2="-5" style={outlineStyle} />
                </g>
            );
        case 'vegetable-patch':
            return (
                <g transform={transform}>
                    <polygon points="-10,0 10,0 0,30" style={fillableStyle(themeId + '-carrot')} />
                    <path d="M -5 0 Q -15 -15 -5 -25 M 5 0 Q 15 -15 5 -25" style={outlineStyle} />
                    <line x1="-5" y1="10" x2="5" y2="10" style={outlineStyle} />
                    <line x1="-3" y1="20" x2="3" y2="20" style={outlineStyle} />
                </g>
            );
        case 'ocean-life':
            return (
                <g transform={transform}>
                    <ellipse cx="0" cy="0" rx="20" ry="12" style={fillableStyle(themeId + '-fish')} />
                    <polygon points="-20,0 -35,-10 -30,0 -35,10" style={fillableStyle(themeId + '-tail')} />
                    <circle cx="10" cy="-3" r="2" fill="#2D2147" />
                    <path d="M 5 5 Q 10 10 15 5" style={outlineStyle} />
                </g>
            );

        // ================= OUTDOOR =================
        case 'zoo-visit':
            return (
                <g transform={transform}>
                    <rect x="-20" y="-15" width="40" height="30" rx="2" style={fillableStyle(themeId + '-sign')} />
                    <line x1="-10" y1="15" x2="-10" y2="35" style={outlineStyle} />
                    <line x1="10" y1="15" x2="10" y2="35" style={outlineStyle} />
                    <circle cx="0" cy="0" r="8" style={outlineStyle} />
                    <line x1="-15" y1="-8" x2="15" y2="-8" style={outlineStyle} />
                </g>
            );
        case 'park-picnic':
            return (
                <g transform={transform}>
                    <line x1="-20" y1="-30" x2="-20" y2="30" style={outlineStyle} />
                    <line x1="20" y1="-30" x2="20" y2="30" style={outlineStyle} />
                    <line x1="-20" y1="-30" x2="20" y2="-30" style={outlineStyle} />
                    <path d="M -20 -10 Q 0 10 20 -10" style={{ ...outlineStyle, strokeWidth: 5 }} />
                </g>
            );
        case 'beach-day':
            return (
                <g transform={transform}>
                    <path d="M -20 20 L -10 0 L 10 0 L 20 20 Z" style={fillableStyle(themeId + '-bucket')} />
                    <path d="M -10 0 Q 0 -15 10 0" style={outlineStyle} />
                    <rect x="-5" y="-15" width="20" height="5" transform="rotate(30)" style={fillableStyle(themeId + '-shovel')} />
                </g>
            );
        case 'garden-helpers':
            return (
                <g transform={transform}>
                    <path d="M -20 10 A 20 20 0 0 0 20 10 L 10 -10 L -10 -10 Z" style={fillableStyle(themeId + '-watering-can')} />
                    <path d="M -20 0 Q -35 0 -35 15 Q -35 25 -20 25" style={outlineStyle} />
                    <line x1="15" y1="0" x2="35" y2="-15" style={outlineStyle} />
                    <circle cx="35" cy="-15" r="3" style={fillableStyle(themeId + '-spout')} />
                </g>
            );
        case 'forest-walk':
            return (
                <g transform={transform}>
                    <polygon points="0,-30 -20,10 20,10" style={fillableStyle(themeId + '-tree-top')} />
                    <polygon points="0,-10 -25,30 25,30" style={fillableStyle(themeId + '-tree-bottom')} />
                    <rect x="-5" y="30" width="10" height="15" style={fillableStyle(themeId + '-trunk')} />
                </g>
            );
        case 'mountain-hike':
            return (
                <g transform={transform}>
                    <polygon points="-30,30 0,-20 30,30" style={fillableStyle(themeId + '-mountain1')} />
                    <polygon points="5,30 25,0 45,30" style={fillableStyle(themeId + '-mountain2')} />
                    <path d="M -10 -3 L 0 -20 L 10 -3 0 5 Z" style={outlineStyle} />
                </g>
            );
        case 'desert-safari':
            return (
                <g transform={transform}>
                    <path d="M -30 20 Q -10 -10 10 20 Q 30 -5 50 20 A 40 10 0 0 1 -30 20" style={fillableStyle(themeId + '-dune')} />
                    <circle cx="-10" cy="-10" r="15" style={outlineStyle} />
                    <line x1="-10" y1="-25" x2="-10" y2="-32" style={outlineStyle} />
                    <line x1="-25" y1="-10" x2="-32" y2="-10" style={outlineStyle} />
                </g>
            );
        case 'jungle-trek':
            return (
                <g transform={transform}>
                    <path d="M 0 -20 Q 20 -30 30 0 Q 30 30 0 20 Q -30 30 -30 0 Q -20 -30 0 -20" style={fillableStyle(themeId + '-jungle-leaf')} />
                    <path d="M 0 -20 L 0 20 M -15 0 L 15 0" style={outlineStyle} />
                </g>
            );
        case 'winter-wonderland':
            return (
                <g transform={transform}>
                    <circle cx="0" cy="15" r="20" style={fillableStyle(themeId + '-snowman-base')} />
                    <circle cx="0" cy="-15" r="14" style={fillableStyle(themeId + '-snowman-head')} />
                    <circle cx="-5" cy="-20" r="2" fill="#2D2147" />
                    <circle cx="5" cy="-20" r="2" fill="#2D2147" />
                    <polygon points="0,-15 15,-10 0,-10" style={fillableStyle(themeId + '-carrot')} />
                </g>
            );
        case 'farm-fun':
            return (
                <g transform={transform}>
                    <rect x="-25" y="-15" width="50" height="35" style={fillableStyle(themeId + '-barn')} />
                    <polygon points="-30,-15 0,-40 30,-15" style={fillableStyle(themeId + '-barn-roof')} />
                    <rect x="-10" y="5" width="20" height="15" style={outlineStyle} />
                    <line x1="-10" y1="5" x2="10" y2="20" style={outlineStyle} />
                    <line x1="10" y1="5" x2="-10" y2="20" style={outlineStyle} />
                </g>
            );

        // ================= IMAGINATION =================
        case 'space-adventure':
            return (
                <g transform={transform}>
                    <path d="M 0 -30 Q 15 -10 15 10 L -15 10 Q -15 -10 0 -30" style={fillableStyle(themeId + '-rocket')} />
                    <polygon points="-15,10 -25,20 -15,0" style={fillableStyle(themeId + '-fin1')} />
                    <polygon points="15,10 25,20 15,0" style={fillableStyle(themeId + '-fin2')} />
                    <circle cx="0" cy="-5" r="5" style={outlineStyle} />
                    <polygon points="-10,10 0,30 10,10" style={fillableStyle(themeId + '-fire')} />
                </g>
            );
        case 'dinosaur-world':
            return (
                <g transform={transform}>
                    <path d="M -10 20 L -10 0 Q -10 -20 10 -20 Q 25 -20 25 -10 L 15 -10 Q 0 -5 0 5 L 0 20 Z" style={fillableStyle(themeId + '-dino')} />
                    <polygon points="-5,-15 -15,-20 -10,-10" style={fillableStyle(themeId + '-spike1')} />
                    <polygon points="-5,-5 -15,-10 -10,0" style={fillableStyle(themeId + '-spike2')} />
                    <circle cx="15" cy="-15" r="1.5" fill="#2D2147" />
                </g>
            );
        case 'robot-kingdom':
            return (
                <g transform={transform}>
                    <rect x="-15" y="-20" width="30" height="25" rx="3" style={fillableStyle(themeId + '-bot-head')} />
                    <circle cx="-5" cy="-10" r="4" style={outlineStyle} />
                    <circle cx="5" cy="-10" r="4" style={outlineStyle} />
                    <line x1="-8" y1="0" x2="8" y2="0" style={outlineStyle} />
                    <line x1="0" y1="-20" x2="0" y2="-30" style={outlineStyle} />
                    <circle cx="0" cy="-33" r="3" style={fillableStyle(themeId + '-bot-antenna')} />
                </g>
            );
        case 'fairy-garden':
            return (
                <g transform={transform}>
                    <path d="M 0 0 Q 30 -30 30 0 Q 30 30 0 0" style={fillableStyle(themeId + '-wing1')} />
                    <path d="M 0 0 Q -30 -30 -30 0 Q -30 30 0 0" style={fillableStyle(themeId + '-wing2')} />
                    <circle cx="0" cy="0" r="5" style={fillableStyle(themeId + '-fairy-body')} />
                    <path d="M 5 -15 L 15 -25 L 12 -28 L 2 -18" style={fillableStyle(themeId + '-wand')} />
                    <circle cx="15" cy="-25" r="3" style={fillableStyle(themeId + '-magic')} />
                </g>
            );
        case 'pirate-treasure':
            return (
                <g transform={transform}>
                    <rect x="-20" y="0" width="40" height="25" rx="2" style={fillableStyle(themeId + '-chest')} />
                    <path d="M -20 0 A 20 15 0 0 1 20 0 Z" style={fillableStyle(themeId + '-chest-lid')} />
                    <circle cx="0" cy="5" r="3" style={outlineStyle} />
                    <line x1="-20" y1="0" x2="20" y2="0" style={{ ...outlineStyle, strokeWidth: 4 }} />
                </g>
            );
        case 'superhero-training':
            return (
                <g transform={transform}>
                    <path d="M -20 -10 L 20 -10 L 0 25 Z" style={fillableStyle(themeId + '-shield')} />
                    <polygon points="0,-5 5,5 15,5 7,12 10,20 0,15 -10,20 -7,12 -15,5 -5,5" style={outlineStyle} />
                </g>
            );
        case 'castle-quest':
            return (
                <g transform={transform}>
                    <rect x="-25" y="-10" width="50" height="40" style={fillableStyle(themeId + '-castle')} />
                    <rect x="-30" y="-30" width="15" height="20" style={fillableStyle(themeId + '-tower1')} />
                    <rect x="15" y="-30" width="15" height="20" style={fillableStyle(themeId + '-tower2')} />
                    <polygon points="-35,-30 -22,-50 -10,-30" style={fillableStyle(themeId + '-spire1')} />
                    <polygon points="10,-30 22,-50 35,-30" style={fillableStyle(themeId + '-spire2')} />
                    <path d="M -10 30 L -10 10 A 10 10 0 0 1 10 10 L 10 30 Z" style={outlineStyle} />
                </g>
            );
        case 'time-travel':
            return (
                <g transform={transform}>
                    <polygon points="-15,-20 15,-20 -15,20 15,20" style={fillableStyle(themeId + '-hourglass')} />
                    <line x1="-20" y1="-20" x2="20" y2="-20" style={outlineStyle} />
                    <line x1="-20" y1="20" x2="20" y2="20" style={outlineStyle} />
                    <path d="M -10 -20 L 10 -20 L 0 0 Z" style={{ fill: '#2D2147', opacity: 0.2 }} />
                    <path d="M -10 20 L 10 20 L 0 5 Z" style={{ fill: '#2D2147', opacity: 0.2 }} />
                </g>
            );
        case 'underwater-palace':
            return (
                <g transform={transform}>
                    <path d="M -10 20 Q 0 0 10 20 Q 20 -10 0 -25 Q -20 -10 -10 20" style={fillableStyle(themeId + '-shell')} />
                    <line x1="0" y1="-25" x2="0" y2="10" style={outlineStyle} />
                    <line x1="0" y1="-25" x2="-8" y2="5" style={outlineStyle} />
                    <line x1="0" y1="-25" x2="8" y2="5" style={outlineStyle} />
                </g>
            );
        case 'toy-shop-mystery':
            return (
                <g transform={transform}>
                    <polygon points="0,-15 -20,15 20,15" style={fillableStyle(themeId + '-top')} />
                    <circle cx="0" cy="15" r="20" style={fillableStyle(themeId + '-top-base')} />
                    <line x1="0" y1="-15" x2="0" y2="-25" style={outlineStyle} />
                    <line x1="-15" y1="5" x2="15" y2="5" style={outlineStyle} />
                    <line x1="-18" y1="20" x2="18" y2="20" style={outlineStyle} />
                </g>
            );

        // Fallback for any unknown theme
        default:
            return (
                <g transform={transform}>
                    <circle cx="0" cy="0" r="20" style={fillableStyle(themeId + '-generic')} />
                    <path d="M -10 -10 L 10 10 M 10 -10 L -10 10" style={outlineStyle} />
                </g>
            );
    }
}
