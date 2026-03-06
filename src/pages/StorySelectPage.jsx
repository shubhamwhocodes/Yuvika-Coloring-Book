import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storyThemes } from '../data/stories';
import { defaultFamily } from '../utils/personalize';
import './StorySelectPage.css';

export default function StorySelectPage() {
    const navigate = useNavigate();
    const [familyData, setFamilyData] = useState(defaultFamily);

    useEffect(() => {
        const stored = localStorage.getItem('familyData');
        if (stored) {
            setFamilyData(JSON.parse(stored));
        }
    }, []);

    return (
        <div className="story-select-page">
            <header className="select-header">
                <button className="btn btn-outline back-btn" onClick={() => navigate('/')}>
                    ← Home
                </button>
                <div className="select-header-center">
                    <h1>Choose a Story 📚</h1>
                    <p className="greeting">Hi {familyData.childName}! Pick a story to read!</p>
                </div>
                <div style={{ width: 80 }} />
            </header>

            <div className="stories-grid">
                {storyThemes.map((theme, i) => (
                    <button
                        key={theme.id}
                        className="story-card animate-bounce-in"
                        style={{
                            '--card-color': theme.color,
                            animationDelay: `${i * 0.1}s`
                        }}
                        onClick={() => navigate(`/read/${theme.id}`)}
                    >
                        <div className="story-card-bg" />
                        <div className="story-card-content">
                            <span className="story-card-emoji">{theme.emoji}</span>
                            <span className="story-card-title">{theme.label}</span>
                            <span className="story-card-category">{theme.category}</span>
                            <span className="story-card-play">▶ Read Now</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
