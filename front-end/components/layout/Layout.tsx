import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Nav from './Nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background`}>
            <Nav />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">{children}</main>
            <footer className="bg-background">
                <div className="text-text container mx-auto px-4 py-6 text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} TeamTrack. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
