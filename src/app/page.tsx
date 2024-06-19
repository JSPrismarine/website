import styles from '@/app/page.module.scss';

import Image from 'next/image';

import { Accented, Card, Heading, View } from '@nordcom/nordstar';

import LatestCommits from '@/components/latest-commits';
import Nightly from '@/components/nightly';
import Release from '@/components/release';

import type { Metadata } from 'next';

export const revalidate = 1800; // 30 minutes.

export const metadata: Metadata = {
    title: {
        absolute: 'JSPrismarine'
    },
    description: 'a TypeScript Minecraft: Bedrock Edition Server',
    alternates: {
        canonical: 'https://jsprismarine.org/'
    }
};

export default async function IndexPage() {
    return (
        <View className={styles.container}>
            <header className={`${styles.block} ${styles.header}`}>
                <Card borderless={true} padding={false}>
                    <Heading level="h1" className={styles.heading}>
                        JSPrismarine
                    </Heading>
                    <Heading level="h2">
                        a <Accented>TypeScript</Accented> Minecraft: <Accented>Bedrock Edition</Accented> Server
                    </Heading>
                </Card>
            </header>

            <div className={`${styles.block} ${styles.commit}`}>
                <LatestCommits />
            </div>

            <div className={`${styles.block} ${styles.downloads}`}>
                <Nightly />
                <Release />
            </div>

            <footer className={`${styles.block} ${styles.footer}`}>
                <Card className={styles.badges}>
                    <Image
                        alt="Code Coverage"
                        title="Code Coverage"
                        src="https://img.shields.io/codecov/c/github/JSPrismarine/JSPrismarine?token=WLXLSJOGN3&color=63A375"
                        width={65}
                        height={15}
                        className={styles.badge}
                    />
                    <Image
                        alt="Contributors"
                        title="Contributors"
                        src="https://img.shields.io/github/contributors/JSPrismarine/JSPrismarine?color=%23E30B5D"
                        width={65}
                        height={15}
                        className={styles.badge}
                    />
                    <Image
                        alt="npm"
                        title="npm"
                        src="https://img.shields.io/npm/dt/@jsprismarine/prismarine"
                        width={65}
                        height={15}
                        className={styles.badge}
                    />
                </Card>
            </footer>
        </View>
    );
}
