import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoryById } from '../data/stories';
import { personalizeStory, defaultFamily } from '../utils/personalize';
import { getIllustration } from '../assets/illustrations';
import './ColoringPage.css';

const COLORS = [
    { name: 'Red', hex: '#E74C3C' },
    { name: 'Blue', hex: '#3498DB' },
    { name: 'Yellow', hex: '#F1C40F' },
    { name: 'Green', hex: '#27AE60' },
    { name: 'Pink', hex: '#E84393' },
    { name: 'Purple', hex: '#8E44AD' },
    { name: 'Brown', hex: '#A0522D' },
    { name: 'Orange', hex: '#FF9F43' },
    { name: 'Light Blue', hex: '#74B9FF' },
    { name: 'Light Green', hex: '#55EFC4' },
    { name: 'Peach', hex: '#FFEAA7' },
    { name: 'White', hex: '#FFFFFF' },
];

const BRUSH_SIZES = [
    { id: 'small', label: 'S', size: 8 },
    { id: 'medium', label: 'M', size: 16 },
    { id: 'large', label: 'L', size: 28 },
];

export default function ColoringPage() {
    const { storyId, pageIndex } = useParams();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
    const [activeTool, setActiveTool] = useState('brush');
    const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasHistory, setCanvasHistory] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const bgImageRef = useRef(null);

    const familyData = useMemo(() => {
        const stored = localStorage.getItem('familyData');
        return stored ? JSON.parse(stored) : defaultFamily;
    }, []);

    const rawStory = getStoryById(storyId);
    const story = useMemo(() => {
        if (!rawStory) return null;
        return personalizeStory(rawStory, familyData);
    }, [rawStory, familyData]);

    const page = story?.pages?.[parseInt(pageIndex)];

    useEffect(() => {
        if (!story || !page) {
            navigate('/stories');
        }
    }, [story, page, navigate]);

    // Determine if this is an image-based illustration
    const illustrationElement = page ? getIllustration(page.illustrationId) : null;
    const isImageBased = illustrationElement?.type === 'img';
    const imageSrc = isImageBased ? illustrationElement.props.src : null;

    // Initialize canvas for image-based coloring
    useEffect(() => {
        if (!isImageBased || !imageSrc || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!container) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            bgImageRef.current = img;
            // Scale canvas to fill the container while maintaining aspect ratio
            const rect = container.getBoundingClientRect();
            const containerW = rect.width - 32; // padding
            const containerH = rect.height || 500;

            // Use large canvas for crisp rendering, scale down via CSS
            const targetSize = Math.max(containerW, 600);
            const scale = targetSize / img.width;
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setImageLoaded(true);

            // Save initial state
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setCanvasHistory([imageData]);
        };
        img.src = imageSrc;
    }, [isImageBased, imageSrc]);

    // Canvas drawing functions
    const getCanvasPos = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }, []);

    const startDrawing = useCallback((e) => {
        e.preventDefault();
        if (!canvasRef.current || !imageLoaded) return;

        setIsDrawing(true);
        const ctx = canvasRef.current.getContext('2d');
        const pos = getCanvasPos(e);

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineWidth = brushSize.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : selectedColor;
        ctx.globalAlpha = activeTool === 'eraser' ? 1 : 0.7;
        ctx.globalCompositeOperation = activeTool === 'eraser' ? 'destination-out' : 'source-over';
    }, [imageLoaded, brushSize, selectedColor, activeTool, getCanvasPos]);

    const draw = useCallback((e) => {
        e.preventDefault();
        if (!isDrawing || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        const pos = getCanvasPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }, [isDrawing, getCanvasPos]);

    const stopDrawing = useCallback((e) => {
        if (e) e.preventDefault();
        if (!isDrawing || !canvasRef.current) return;

        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // Save to history for undo
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        setCanvasHistory(prev => [...prev, imageData]);
    }, [isDrawing]);

    const handleUndo = useCallback(() => {
        if (canvasHistory.length <= 1 || !canvasRef.current) return;
        const newHistory = canvasHistory.slice(0, -1);
        const lastState = newHistory[newHistory.length - 1];
        const ctx = canvasRef.current.getContext('2d');
        ctx.putImageData(lastState, 0, 0);
        setCanvasHistory(newHistory);
    }, [canvasHistory]);

    // SVG click-to-fill handlers (for non-image illustrations)
    const [svgColorHistory, setSvgColorHistory] = useState([]);

    const handleSvgClick = useCallback((e) => {
        const target = e.target;
        if (target.tagName === 'circle' || target.tagName === 'ellipse' ||
            target.tagName === 'rect' || target.tagName === 'path' ||
            target.tagName === 'polygon') {
            const currentFill = target.style.fill || target.getAttribute('fill');
            if (currentFill === 'none' || currentFill === '#2D2147') return;

            if (activeTool === 'brush' || activeTool === 'fill') {
                const prevFill = target.style.fill || '#FFFFFF';
                setSvgColorHistory(prev => [...prev, { element: target, prevFill }]);
                target.style.fill = selectedColor;
                target.style.transition = 'fill 0.15s ease';
            } else if (activeTool === 'eraser') {
                const prevFill = target.style.fill || '#FFFFFF';
                setSvgColorHistory(prev => [...prev, { element: target, prevFill }]);
                target.style.fill = '#FFFFFF';
            }
        }
    }, [selectedColor, activeTool]);

    const handleSvgUndo = useCallback(() => {
        if (svgColorHistory.length === 0) return;
        const last = svgColorHistory[svgColorHistory.length - 1];
        last.element.style.fill = last.prevFill;
        setSvgColorHistory(prev => prev.slice(0, -1));
    }, [svgColorHistory]);

    const handleToolClick = (toolId) => {
        if (toolId === 'undo') {
            if (isImageBased) handleUndo();
            else handleSvgUndo();
        } else {
            setActiveTool(toolId);
        }
    };

    if (!story || !page) return null;

    const pageIdx = parseInt(pageIndex);
    const totalPages = story.pages.length;
    const hasPrev = pageIdx > 0;
    const hasNext = pageIdx < totalPages - 1;

    return (
        <div className="coloring-page">
            {/* Header */}
            <header className="coloring-header">
                <button className="btn btn-outline coloring-back" onClick={() => navigate(`/read/${storyId}`)}>
                    ← Back to Story
                </button>
                <h1 className="coloring-title">🎨 Color This Page!</h1>
                <div className="coloring-nav">
                    <button
                        className="btn btn-icon coloring-nav-btn"
                        onClick={() => navigate(`/color/${storyId}/${pageIdx - 1}`)}
                        disabled={!hasPrev}
                        title="Previous page"
                    >
                        ◀
                    </button>
                    <span className="coloring-page-info">Page {pageIdx + 1} / {totalPages}</span>
                    <button
                        className="btn btn-icon coloring-nav-btn"
                        onClick={() => navigate(`/color/${storyId}/${pageIdx + 1}`)}
                        disabled={!hasNext}
                        title="Next page"
                    >
                        ▶
                    </button>
                </div>
            </header>

            {/* Story text */}
            <div className="coloring-text">
                {page.text.map((line, i) => (
                    <span key={i} className="coloring-text-line">{line} </span>
                ))}
            </div>

            {/* Main canvas area */}
            <div className="coloring-workspace">
                <div className="coloring-canvas" ref={containerRef}>
                    {isImageBased ? (
                        <canvas
                            ref={canvasRef}
                            className="coloring-canvas-element"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                    ) : (
                        <div className="svg-coloring-area" onClick={handleSvgClick}>
                            {illustrationElement}
                        </div>
                    )}
                </div>
            </div>

            {/* Toolbar */}
            <div className="coloring-toolbar">
                {/* Tools */}
                <div className="toolbar-tools">
                    <button
                        className={`tool-btn ${activeTool === 'brush' ? 'active' : ''}`}
                        onClick={() => handleToolClick('brush')}
                        title={isImageBased ? 'Brush' : 'Fill'}
                    >
                        <span className="tool-icon">{isImageBased ? '🖌️' : '🪣'}</span>
                        <span className="tool-label">{isImageBased ? 'Brush' : 'Fill'}</span>
                    </button>
                    <button
                        className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`}
                        onClick={() => handleToolClick('eraser')}
                        title="Eraser"
                    >
                        <span className="tool-icon">🧹</span>
                        <span className="tool-label">Eraser</span>
                    </button>
                    <button
                        className="tool-btn undo-btn"
                        onClick={() => handleToolClick('undo')}
                        title="Undo"
                    >
                        <span className="tool-icon">↩️</span>
                        <span className="tool-label">Undo</span>
                    </button>
                </div>

                {/* Brush Size (only for image-based) */}
                {isImageBased && (
                    <div className="brush-sizes">
                        {BRUSH_SIZES.map(bs => (
                            <button
                                key={bs.id}
                                className={`brush-size-btn ${brushSize.id === bs.id ? 'active' : ''}`}
                                onClick={() => setBrushSize(bs)}
                                title={`${bs.id} brush`}
                            >
                                <span
                                    className="brush-dot"
                                    style={{ width: bs.size * 0.6, height: bs.size * 0.6 }}
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* Color Palette */}
                <div className="color-palette">
                    {COLORS.map(color => (
                        <button
                            key={color.hex}
                            className={`color-swatch ${selectedColor === color.hex ? 'selected' : ''}`}
                            style={{ '--swatch-color': color.hex }}
                            onClick={() => {
                                setSelectedColor(color.hex);
                                if (activeTool === 'eraser') setActiveTool('brush');
                            }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
