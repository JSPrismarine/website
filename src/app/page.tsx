import { Accented, Button, Card, Heading, Label, View } from '@nordcom/nordstar';
import type { Metadata } from 'next';
import styles from '@/app/page.module.scss';
import Link from 'next/link';
import { Octokit } from '@octokit/rest';

export const metadata: Metadata = {
    title: {
        absolute: 'JSPrismarine'
    },
    description: 'a TypeScript Minecraft: Bedrock Edition Server',
    alternates: {
        canonical: 'https://prismarine.nordcom.io/'
    },
    icons: {
        apple: '/favicon.png',
        icon: '/favicon.png'
    }
};

export default async function IndexPage() {
    const octokit = new Octokit({});

    const releases = (
        await octokit.repos.listReleases({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            per_page: 10
        })
    ).data;

    const nightly = (
        await octokit.repos.listCommits({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            per_page: 10
        })
    ).data[0]!;

    const release = releases.find((release) => release.prerelease === false && release.name?.includes('/prismarine'));

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
                <Card color="primary">
                    <Label>Latest Commit</Label>
                    <Heading level="h3" as={Link} href={nightly.html_url} target="_blank">
                        {nightly.commit.message.split('\n')[0]}
                    </Heading>
                    <Heading level="h4" as="p">
                        {nightly.commit.message.split('\n').slice(1, 0).join('\n')}
                    </Heading>
                </Card>
            </div>

            <div className={`${styles.block} ${styles.downloads}`}>
                <Card className={styles.version}>
                    <Label as="h2">Nightly builds</Label>
                    <Heading level="h3" as="label">
                        #{nightly.sha.slice(0, 7)}
                    </Heading>
                    <div className={styles.body}>{nightly.commit.message}</div>
                    <Card.Divider />
                    <Button variant="outline" as={Link} href={nightly.html_url} target="_blank">
                        Nightly
                    </Button>
                </Card>

                <Card className={styles.version}>
                    <Label as="h2">Testing builds</Label>
                    <Heading level="h3" as="label">
                        N/A
                    </Heading>
                    <div className={styles.body}></div>
                    <Card.Divider />
                    <Button variant="outline" disabled={true}>
                        Not Available
                    </Button>
                </Card>

                <Card color="primary" className={styles.version}>
                    <Label as="h2">Release builds</Label>
                    <Heading level="h3" as="label">
                        v{release?.tag_name.split('@').at(-1) ?? 'x.x.x'}
                    </Heading>
                    <div className={styles.body}>{release?.body}</div>
                    <Card.Divider />
                    <Button as={Link} href={release?.html_url} target="_blank">
                        Release
                    </Button>
                </Card>
            </div>

            <footer className={`${styles.block} ${styles.footer}`}></footer>
        </View>
    );
}
