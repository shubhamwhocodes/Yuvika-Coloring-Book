import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storyThemes } from '../data/stories';
import { defaultFamily } from '../utils/personalize';
import './CreateBookPage.css';

export default function CreateBookPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [family, setFamily] = useState({
        childName: '',
        fatherName: '',
        motherName: '',
        siblingName: ''
    });
    const [familyPhoto, setFamilyPhoto] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);

    const categories = [
        { id: 'Skill Stories', label: 'Skill Stories', emoji: '🎨', color: '#FF9F43', desc: 'Discover new talents!' },
        { id: 'Family Stories', label: 'Family Stories', emoji: '👨‍👩‍👧‍👦', color: '#FF6B9D', desc: 'Heartwarming family moments.' },
        { id: 'Learning Stories', label: 'Learning Stories', emoji: '🌟', color: '#4FC3F7', desc: 'Learn numbers, colors & more!' },
        { id: 'Outdoor Stories', label: 'Outdoor Stories', emoji: '🌲', color: '#6BCB77', desc: 'Explore nature and parks.' },
        { id: 'Imagination Stories', label: 'Imagination Stories', emoji: '🚀', color: '#8E44AD', desc: 'Robots, dinosaurs & magic!' },
    ];

    const filteredThemes = storyThemes.filter(theme => theme.category === selectedCategory);

    const handleChange = (field, value) => {
        setFamily(prev => ({ ...prev, [field]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Resize image to max 500x500 to save localStorage space
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 500;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress as JPEG
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                setFamilyPhoto(compressedBase64);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleGenerate = () => {
        const familyData = {
            childName: family.childName || defaultFamily.childName,
            fatherName: family.fatherName || defaultFamily.fatherName,
            motherName: family.motherName || defaultFamily.motherName,
            siblingName: family.siblingName || defaultFamily.siblingName,
            photo: familyPhoto
        };

        // Store family data in localStorage for other pages to use
        localStorage.setItem('familyData', JSON.stringify(familyData));
        localStorage.setItem('selectedTheme', selectedTheme);

        navigate(`/read/${selectedTheme}`);
    };

    const isStep1Valid = family.childName.trim().length > 0;
    const isStep2Valid = selectedCategory !== null;
    const isStep3Valid = selectedTheme !== null;

    return (
        <div className="create-page">
            {/* Header */}
            <header className="create-header">
                <button className="btn btn-outline back-btn" onClick={() => navigate('/')}>
                    ← Back
                </button>
                <h1 className="create-title">Create Your Book ✨</h1>
                <div className="step-indicator">
                    <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
                    <div className="step-line" />
                    <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
                    <div className="step-line" />
                    <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
                </div>
            </header>

            {/* Step 1: Family Details */}
            {step === 1 && (
                <div className="create-step animate-slide-up">
                    <div className="step-header">
                        <span className="step-emoji">👨‍👩‍👧‍👦</span>
                        <h2>Tell Us About Your Family</h2>
                        <p>These names will appear in your story!</p>
                    </div>

                    <div className="form-container">
                        <div className="form-group">
                            <label className="form-label">👧 Child's Name *</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="e.g. Yuvika"
                                value={family.childName}
                                onChange={(e) => handleChange('childName', e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">👨 Father's Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g. Papa Sahil"
                                    value={family.fatherName}
                                    onChange={(e) => handleChange('fatherName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">👩 Mother's Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g. Mama Simran"
                                    value={family.motherName}
                                    onChange={(e) => handleChange('motherName', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">👶 Sibling's Name</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="e.g. Samaira"
                                value={family.siblingName}
                                onChange={(e) => handleChange('siblingName', e.target.value)}
                            />
                        </div>

                        <div className="photo-upload-section">
                            <label className="form-label">📸 Add a Family Photo (Optional)</label>
                            <p className="photo-hint">We'll feature this on your cover page!</p>

                            <input
                                type="file"
                                accept="image/*"
                                id="family-photo-upload"
                                className="hidden-upload"
                                onChange={handlePhotoUpload}
                            />

                            {!familyPhoto ? (
                                <label htmlFor="family-photo-upload" className="upload-btn">
                                    <span className="upload-icon">📷</span>
                                    <span>Choose a Photo</span>
                                </label>
                            ) : (
                                <div className="photo-preview-container">
                                    <img src={familyPhoto} alt="Family Preview" className="photo-preview" />
                                    <button
                                        className="btn btn-outline sm remove-photo-btn"
                                        onClick={() => setFamilyPhoto(null)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className="btn btn-primary btn-large full-width"
                            disabled={!isStep1Valid}
                            onClick={() => setStep(2)}
                        >
                            Next: Choose Category →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Category Selection */}
            {step === 2 && (
                <div className="create-step animate-slide-up">
                    <div className="step-header">
                        <span className="step-emoji">✨</span>
                        <h2>What kind of stories do you like?</h2>
                        <p>Pick a category to explore!</p>
                    </div>

                    <div className="themes-grid">
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                className={`theme-card ${selectedCategory === cat.id ? 'selected' : ''}`}
                                style={{ '--card-color': cat.color }}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <div className="theme-card-emoji">{cat.emoji}</div>
                                <div className="theme-card-label">{cat.label}</div>
                                <div className="theme-card-category">{cat.desc}</div>
                                {selectedCategory === cat.id && (
                                    <div className="theme-check">✓</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="step-actions">
                        <button className="btn btn-outline" onClick={() => setStep(1)}>
                            ← Back
                        </button>
                        <button
                            className="btn btn-primary btn-large"
                            disabled={!isStep2Valid}
                            onClick={() => {
                                setStep(3);
                                setSelectedTheme(null); // Reset story selection when category changes
                            }}
                        >
                            Next: Choose Story →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Theme Selection */}
            {step === 3 && (
                <div className="create-step animate-slide-up">
                    <div className="step-header">
                        <span className="step-emoji">📚</span>
                        <h2>Choose a {selectedCategory}</h2>
                        <p>Each story teaches a special lesson!</p>
                    </div>

                    <div className="themes-grid">
                        {filteredThemes.map(theme => (
                            <div
                                key={theme.id}
                                className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
                                style={{ '--card-color': theme.color }}
                                onClick={() => setSelectedTheme(theme.id)}
                            >
                                <div className="theme-card-emoji">{theme.emoji}</div>
                                <div className="theme-card-label">{theme.label}</div>
                                <div className="theme-card-category">{theme.category}</div>
                                {selectedTheme === theme.id && (
                                    <div className="theme-check">✓</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="step-actions">
                        <button className="btn btn-outline" onClick={() => setStep(2)}>
                            ← Back
                        </button>
                        <button
                            className="btn btn-primary btn-large"
                            disabled={!isStep3Valid}
                            onClick={handleGenerate}
                        >
                            Generate My Book! 🎉
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
