import { Button, Card, Heading, Label } from '@nordcom/nordstar';
import { Octokit } from '@octokit/rest';
import Link from 'next/link';
import Markdown from 'react-markdown';

import styles from './release.module.scss';

export default async function Release() {
    const octokit = new Octokit({});

    const release = (
        await octokit.repos.listReleases({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            per_page: 10
        })
    ).data.find((release) => release.prerelease === false && release.name?.includes('/prismarine'));

    if (!release) return null;

    return (
        <Card color="primary" className={styles.container}>
            <Label as="h2">Release build</Label>
            <Heading level="h3" as="label" className={styles.title}>
                v{release?.tag_name.split('@').at(-1) ?? 'x.x.x'}.
            </Heading>

            <Card.Divider />

            <Markdown className={styles.body}>{release?.body}</Markdown>

            <Card.Divider />

            <Button as={Link} href={release?.html_url} target="_blank">
                Learn More
            </Button>
        </Card>
    );
}
