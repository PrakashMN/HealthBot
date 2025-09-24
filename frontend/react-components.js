// React Components for HealthBot
const { useState, useEffect } = React;

// React Health Stats Component
function HealthStatsWidget() {
    const [stats, setStats] = useState({
        activeUsers: 12000,
        queriesProcessed: 24000,
        accuracy: 89
    });

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setStats(prev => ({
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
                queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 20),
                accuracy: Math.min(95, prev.accuracy + (Math.random() - 0.5))
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return React.createElement('div', {
        className: 'react-stats-widget',
        style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            margin: '1rem 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            fontSize: '0.9rem'
        }
    }, [
        React.createElement('div', { key: 'users', style: { textAlign: 'center' } }, [
            React.createElement('div', { key: 'label', style: { opacity: 0.8 } }, 'Active Users'),
            React.createElement('div', { key: 'value', style: { fontSize: '1.5rem', fontWeight: 'bold' } }, stats.activeUsers.toLocaleString())
        ]),
        React.createElement('div', { key: 'queries', style: { textAlign: 'center' } }, [
            React.createElement('div', { key: 'label', style: { opacity: 0.8 } }, 'Queries Today'),
            React.createElement('div', { key: 'value', style: { fontSize: '1.5rem', fontWeight: 'bold' } }, stats.queriesProcessed.toLocaleString())
        ]),
        React.createElement('div', { key: 'accuracy', style: { textAlign: 'center' } }, [
            React.createElement('div', { key: 'label', style: { opacity: 0.8 } }, 'AI Accuracy'),
            React.createElement('div', { key: 'value', style: { fontSize: '1.5rem', fontWeight: 'bold' } }, `${stats.accuracy.toFixed(1)}%`)
        ])
    ]);
}

// React Language Selector Component
function ReactLanguageSelector() {
    const [selectedLang, setSelectedLang] = useState('en');
    
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
    ];

    return React.createElement('div', {
        className: 'react-lang-selector',
        style: {
            background: 'white',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            margin: '1rem 0'
        }
    }, [
        React.createElement('h4', { key: 'title', style: { margin: '0 0 1rem 0', color: '#333' } }, '🌐 React Language Selector'),
        React.createElement('div', {
            key: 'buttons',
            style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }
        }, languages.map(lang => 
            React.createElement('button', {
                key: lang.code,
                onClick: () => {
                    setSelectedLang(lang.code);
                    if (window.switchLanguage) window.switchLanguage(lang.code);
                },
                style: {
                    padding: '0.5rem 1rem',
                    border: selectedLang === lang.code ? '2px solid #0066cc' : '1px solid #ddd',
                    borderRadius: '20px',
                    background: selectedLang === lang.code ? '#0066cc' : 'white',
                    color: selectedLang === lang.code ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }
            }, `${lang.flag} ${lang.name}`)
        ))
    ]);
}

// Initialize React Components
document.addEventListener('DOMContentLoaded', function() {
    // Add React stats widget after the header
    const header = document.querySelector('.header');
    if (header) {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'react-stats-container';
        header.appendChild(statsContainer);
        ReactDOM.render(React.createElement(HealthStatsWidget), statsContainer);
    }

    // Add React language selector to prototype section
    const prototypeSection = document.querySelector('.prototype-content');
    if (prototypeSection) {
        const langContainer = document.createElement('div');
        langContainer.id = 'react-lang-container';
        prototypeSection.insertBefore(langContainer, prototypeSection.firstChild);
        ReactDOM.render(React.createElement(ReactLanguageSelector), langContainer);
    }
});