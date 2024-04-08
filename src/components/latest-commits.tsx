import { Card, Heading, Label } from '@nordcom/nordstar';
import { Octokit } from '@octokit/rest';
import Link from 'next/link';

import styles from './latest-commits.module.scss';

export default async function LatestCommits() {
    const octokit = new Octokit({});

    const commits = (
        await octokit.repos.listCommits({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            per_page: 10
        })
    ).data.map(({ commit, html_url, sha }) => ({
        sha,
        ...commit,
        html_url,
        title: commit.message.split('\n')[0],
        description: commit.message.split('\n').slice(1).join('\n')
    }));

    return (
        <Card color="foreground" className={styles.container}>
            <Label>Latest Commit</Label>
            <Heading
                level="h3"
                as={Link}
                href={commits[0].html_url}
                target="_blank"
                title="View on GitHub"
                className={styles.commit}
            >
                {commits[0].title} &mdash; #{commits[0].sha.slice(0, 7)}
            </Heading>

            {commits[0].description ? (
                <Heading level="h4" as="p">
                    {commits[0].description.split('\n').map((line) => (
                        <p
                            key={line}
                            style={{
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            {line}
                        </p>
                    ))}
                </Heading>
            ) : null}

            <Card.Divider />

            {[1, 2, 3].map((i) => (
                <div key={commits[i].sha}>
                    <Heading
                        level="h4"
                        as={Link}
                        href={commits[i].html_url}
                        target="_blank"
                        title="View on GitHub"
                        className={styles.commit}
                    >
                        {commits[i].title} &mdash; #{commits[i].sha.slice(0, 7)}
                    </Heading>
                </div>
            ))}
        </Card>
    );
}
