import React from 'react';
import './globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
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
            }}>
                <h1>Новий проект</h1>
            </header>
            <main style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
            }}>
                <div style={{ maxWidth: '1200px', width: '100%' }}>
                    {children}
                </div>
            </main>
            <footer style={{
                padding: '20px',
                textAlign: 'center',
                background: '#f4f4f4',
                color: '#000',
            }}>
                <p>&copy; 2024 Новий проект</p>
            </footer>
        </body>
        </html>
    );
};

export default Layout;
