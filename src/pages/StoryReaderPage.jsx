import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoryById } from '../data/stories';
import { personalizeStory, defaultFamily } from '../utils/personalize';
import { exportStoryToPDF } from '../utils/pdfExport';
import { getIllustration, coverImages } from '../assets/illustrations';
import './StoryReaderPage.css';

export default function StoryReaderPage() {
    const { storyId } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(-1); // -1 = cover
    const [isAnimating, setIsAnimating] = useState(false);

    const familyData = useMemo(() => {
        const stored = localStorage.getItem('familyData');
        return stored ? JSON.parse(stored) : defaultFamily;
    }, []);

    const rawStory = getStoryById(storyId);
    const story = useMemo(() => {
        if (!rawStory) return null;
        return personalizeStory(rawStory, familyData);
    }, [rawStory, familyData]);

    useEffect(() => {
        if (!story) {
            navigate('/stories');
        }
    }, [story, navigate]);

    if (!story) return null;

    const totalPages = story.pages.length;
    const page = currentPage >= 0 ? story.pages[currentPage] : null;

    const goToPage = (newPage) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setIsAnimating(false);
        }, 300);
    };

    const handlePrev = () => {
        if (currentPage > -1) goToPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) goToPage(currentPage + 1);
    };

    const handleDownloadPDF = () => {
        exportStoryToPDF(story, familyData);
    };

    const handleColorPage = () => {
        navigate(`/color/${storyId}/${currentPage}`);
    };

    return (
        <div className="reader-page">
            {/* Top Bar */}
            <header className="reader-header">
                <button className="btn btn-outline reader-back" onClick={() => navigate('/stories')}>
                    ← Stories
                </button>
                <div className="reader-title-area">
                    <span className="reader-story-emoji">{story.emoji}</span>
                    <h1 className="reader-title">{story.title}</h1>
                </div>
                <button className="btn btn-outline reader-pdf" onClick={handleDownloadPDF}>
                    📥 PDF
                </button>
            </header>

            {/* Page Content */}
            <div className={`reader-content ${isAnimating ? 'page-exit' : 'page-enter'}`}>
                {currentPage === -1 ? (
                    /* Cover Page */
                    <div className="story-cover">
                        <div className="cover-card" style={{ '--story-color': story.coverColor }}>
                            {coverImages[storyId] ? (
                                <img
                                    className="cover-illustration"
                                    src={coverImages[storyId]}
                                    alt={`${story.title} cover`}
                                />
                            ) : (
                                <div className="cover-emoji">{story.emoji}</div>
                            )}
                            <h2 className="cover-title">{story.title}</h2>
                            <p className="cover-subtitle">{story.description}</p>
                            <div className="cover-lesson">
                                <span className="lesson-label">✨ Lesson:</span>
                                <span className="lesson-value">{story.lesson}</span>
                            </div>

                            {familyData.photo && (
                                <div className="cover-family-photo">
                                    <img src={familyData.photo} alt="The Family" />
                                    <div className="photo-caption">Meet the Stars!</div>
                                </div>
                            )}

                            <p className="cover-starring">
                                Starring: <strong>{familyData.childName}</strong>
                            </p>
                            <button className="btn btn-primary btn-large" onClick={() => goToPage(0)}>
                                Start Reading →
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Story Page */
                    <div className="story-page-layout">
                        {/* Text Section */}
                        <div className="story-text-section">
                            <div className="page-number">Page {currentPage + 1} of {totalPages}</div>
                            <div className="story-text-content">
                                {page.text.map((line, i) => (
                                    <p key={i} className="story-line">{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Illustration Section */}
                        <div className="story-illustration-section">
                            <div className="illustration-frame">
                                {getIllustration(page.illustrationId)}
                            </div>
                            <button className="btn btn-secondary color-btn" onClick={handleColorPage}>
                                🎨 Color This Page
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="reader-nav">
                <button
                    className="btn btn-icon nav-btn"
                    onClick={handlePrev}
                    disabled={currentPage <= -1}
                >
                    ◀
                </button>

                <div className="page-dots">
                    <div
                        className={`page-dot ${currentPage === -1 ? 'active' : ''}`}
                        onClick={() => goToPage(-1)}
                    />
                    {story.pages.map((_, i) => (
                        <div
                            key={i}
                            className={`page-dot ${currentPage === i ? 'active' : ''}`}
                            onClick={() => goToPage(i)}
                        />
                    ))}
                </div>

                <button
                    className="btn btn-icon nav-btn"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
