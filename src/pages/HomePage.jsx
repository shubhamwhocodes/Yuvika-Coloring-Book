import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const floatingEmojis = ['🎨', '✏️', '🌈', '📖', '🖍️', '⭐', '🦋', '🌸', '🎪', '🧸'];

export default function HomePage() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className={`home-page ${loaded ? 'loaded' : ''}`}>
            {/* Floating decorations */}
            <div className="floating-decorations">
                {floatingEmojis.map((emoji, i) => (
                    <span
                        key={i}
                        className="floating-emoji"
                        style={{
                            left: `${8 + (i * 9)}%`,
                            animationDelay: `${i * 0.4}s`,
                            fontSize: `${1.5 + Math.random() * 1.5}rem`,
                        }}
                    >
                        {emoji}
                    </span>
                ))}
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">✨ A Magical Storybook Experience ✨</div>
                    <h1 className="hero-title">
                        <span className="title-line">My Family Story</span>
                        <span className="title-line gradient-text">Coloring Book</span>
                    </h1>
                    <p className="hero-subtitle">
                        Personalized stories where your child is the hero!<br />
                        Read, color, and learn together as a family.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-large" onClick={() => navigate('/create')}>
                            📚 Create Your Book
                        </button>
                        <button className="btn btn-secondary btn-large" onClick={() => navigate('/stories')}>
                            🎨 Start Reading
                        </button>
                    </div>
                </div>

                <div className="hero-illustration">
                    <div className="book-preview">
                        <div className="book-cover">
                            <div className="book-spine" />
                            <div className="book-front">
                                <span className="book-emoji">📖</span>
                                <span className="book-title-text">My Story Book</span>
                                <div className="book-stars">⭐⭐⭐</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2 className="section-title">How It Works</h2>
                <div className="features-grid">
                    <div className="feature-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="feature-icon">👨‍👩‍👧</div>
                        <h3>1. Add Your Family</h3>
                        <p>Enter your child's name and family members to personalize the story.</p>
                    </div>
                    <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="feature-icon">📖</div>
                        <h3>2. Choose a Story</h3>
                        <p>Pick from pottery class, zoo visit, puppy story, and more!</p>
                    </div>
                    <div className="feature-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="feature-icon">🎨</div>
                        <h3>3. Read & Color</h3>
                        <p>Read the story and color the beautiful illustrations!</p>
                    </div>
                    <div className="feature-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <div className="feature-icon">🖨️</div>
                        <h3>4. Print Your Book</h3>
                        <p>Download as a PDF and print your own coloring book!</p>
                    </div>
                </div>
            </section>

            {/* Story Themes Preview */}
            <section className="themes-preview">
                <h2 className="section-title">Story Themes</h2>
                <div className="themes-carousel">
                    {[
                        { emoji: '🏺', title: 'Pottery Class', color: '#FF9F43', lesson: 'Patience' },
                        { emoji: '🐶', title: 'Puppy Story', color: '#6BCB77', lesson: 'Kindness' },
                        { emoji: '🌈', title: 'Colors Adventure', color: '#4FC3F7', lesson: 'Curiosity' },
                        { emoji: '🦁', title: 'Zoo Visit', color: '#FF6B9D', lesson: 'Respect' },
                        { emoji: '🧺', title: 'Park Picnic', color: '#7C5CFC', lesson: 'Sharing' },
                    ].map((theme, i) => (
                        <div
                            key={i}
                            className="theme-preview-card"
                            style={{ '--theme-color': theme.color }}
                            onClick={() => navigate('/create')}
                        >
                            <div className="theme-emoji">{theme.emoji}</div>
                            <div className="theme-name">{theme.title}</div>
                            <div className="theme-lesson">Learn: {theme.lesson}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2>Ready to Create Magic? ✨</h2>
                    <p>Make your child the star of their own coloring book story!</p>
                    <button className="btn btn-primary btn-large" onClick={() => navigate('/create')}>
                        Start Now — It's Free! 🎉
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <p>Made with ❤️ for kids and families</p>
                <p className="footer-small">My Family Story Coloring Book © 2026</p>
            </footer>
        </div>
    );
}
