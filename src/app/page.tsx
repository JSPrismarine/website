import { Accented, Button, Card, Heading, Label, View } from '@nordcom/nordstar';
import type { Metadata } from 'next';
import styles from '@/app/page.module.scss';
import Link from 'next/link';
import { Octokit } from '@octokit/rest';
import LatestCommits from '@/components/latest-commits';
import Image from 'next/image';
import Release from '@/components/release';

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
    const octokit = new Octokit({});

    const nightly = (
        await octokit.repos.listCommits({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            per_page: 10
        })
    ).data[0]!;

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
                <Card color="foreground" className={styles.version}>
                    <Label as="h2">Nightly build</Label>
                    <Heading level="h3" as="label" className={styles.title}>
                        #{nightly.sha.slice(0, 7)}.
                    </Heading>

                    <Card.Divider />

                    <div className={styles.body}>
                        {nightly.commit.message?.split('\n').map((line) => (
                            <p
                                key={line}
                                style={{
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    <Card.Divider />

                    <Button variant="outline" as={Link} href={nightly.html_url} target="_blank">
                        Nightly
                    </Button>
                </Card>

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
