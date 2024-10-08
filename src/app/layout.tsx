import '@/styles/globals.scss';
import styles from '@/app/layout.module.scss';

import { Space_Grotesk, Space_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Header, NordstarProvider } from '@nordcom/nordstar';

import logo from '@/assets/logo.png';

import type { Metadata, Viewport } from 'next';

const font = Space_Grotesk({
    weight: 'variable',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-primary',
    preload: true
});

const fontMono = Space_Mono({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
    preload: true
});

export const metadata: Metadata = {
    title: {
        default: '',
        template: `%s | JSPrismarine`
    },
    description: 'a TypeScript Minecraft: Bedrock Edition Server',
    icons: {
        apple: '/favicon.png',
        icon: '/favicon.png'
    },
    robots: {
        follow: true,
        index: true
    },
    referrer: 'origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    }
};

export const viewport: Viewport = {
    initialScale: 1,
    userScalable: true,
    width: 'device-width',
    interactiveWidget: 'resizes-visual',
    themeColor: '#5CA48A',
    colorScheme: 'dark'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={`${font.variable}`}>
                <NordstarProvider
                    theme={{
                        accents: {
                            primary: '#5CA48A',
                            secondary: '#003829'
                        },
                        colors: {
                            background: '#1d201e',
                            highlight: '#191c1b'
                        },
                        fonts: {
                            heading: font.style.fontFamily,
                            body: font.style.fontFamily,
                            code: fontMono.style.fontFamily
                        },
                        border: {
                            radius: '28px'
                        }
                    }}
                >
                    <Header className={styles.header}>
                        <Header.Logo className={styles.logo}>
                            <Image src={logo} alt="JSPrismarine" className={styles.img} />
                        </Header.Logo>
                        <Header.Menu>
                            <Header.Menu.Link as={Link} href="/">
                                Home
                            </Header.Menu.Link>
                            <Header.Menu.Link as={Link} href="/docs/" prefetch={false}>
                                Docs
                            </Header.Menu.Link>
                            <Header.Menu.Link
                                as={Link}
                                href="https://github.com/JSPrismarine/JSPrismarine"
                                prefetch={false}
                                target="_blank"
                            >
                                GitHub
                            </Header.Menu.Link>
                        </Header.Menu>
                    </Header>

                    {children}

                    <footer className={styles.footer}>
                        Built with{' '}
                        <Link href="https://nordstar.dev/?utm_campaign=website&utm_source=jsprismarine" target="_blank">
                            Nordstar
                        </Link>
                        {' by '}
                        <Link href="https://nordcom.io/?utm_campaign=website&utm_source=jsprismarine" target="_blank">
                            Nordcom AB
                        </Link>
                        .
                    </footer>
                </NordstarProvider>
            </body>
        </html>
    );
}
