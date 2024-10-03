"use client";

import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import './globals.css';
import '../../i18n';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, i18n } = useTranslation('common');

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language); // Зберегти вибрану мову
    };

    useEffect(() => {
        // Перевірити, чи є збережена мова в localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <html lang={i18n.language}>
        <body style={{
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
        <header style={{
            padding: '20px',
            textAlign: 'center',
            background: '#f4f4f4',
            color: '#000',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
        }}>
            <h1>{t('newProject')}</h1>
            <div className={'language-switcher'}>
                <button onClick={() => changeLanguage('en')} style={{ marginRight: '10px' }}>
                    {t('en')}
                </button>
                <button onClick={() => changeLanguage('uk')}>
                    {t('uk')}
                </button>
            </div>
        </header>
        <main style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
        }}>
            <div style={{ maxWidth: '1200px', width: '100%' }}>
                <h1 style={{textAlign: "center"}}>{t('categories')}</h1>
                {children}
            </div>
        </main>
        <footer style={{
            padding: '20px',
            textAlign: 'center',
            background: '#f4f4f4',
            color: '#000',
        }}>
            <p>&copy; 2024 {t('newProject')}</p>
        </footer>
        </body>
        </html>
    );
};

export default Layout;
