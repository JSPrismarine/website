/* eslint-disable simple-import-sort/imports */
import styles from './nightly.module.scss';

import Link from 'next/link';

import { Button, Card, Heading, Label } from '@nordcom/nordstar';

import { Octokit } from '@octokit/rest';
import prettyBytes from 'pretty-bytes';
import Markdown from 'react-markdown';

export default async function Nightly() {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    const run = (
        await octokit.actions.listWorkflowRuns({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            workflow_id: 'nightly.yml',
            per_page: 1
        })
    ).data.workflow_runs[0];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!run) {
        return null;
    }

    const artifacts = (
        await octokit.actions.listWorkflowRunArtifacts({
            owner: 'JSPrismarine',
            repo: 'JSPrismarine',
            run_id: run.id
        })
    ).data.artifacts.map((artifact) => {
        let name = artifact.name;
        if (name.includes('windows')) {
            name = 'win32';
        } else if (name.includes('macos')) {
            name = 'macOS';
        } else {
            name = 'linux';
        }

        return {
            ...artifact,
            name
        };
    });
    if (artifacts.length <= 0) {
        return null;
    }

    const ready = run.status === 'completed';
    return (
        <Card color="foreground" className={styles.container}>
            <Label as="h2">Nightly build</Label>
            <Heading level="h3" as="label" className={styles.title}>
                <Link href={`${run.repository.html_url}/commit/${run.head_sha}`}>#{run.head_sha.slice(0, 7)}</Link>
            </Heading>

            <Card.Divider />

            <Link href={run.html_url}>
                <Markdown className={styles.body}>{run.head_commit?.message}</Markdown>
            </Link>

            <Card.Divider />

            <div className={styles.actions}>
                {artifacts.map(({ id, name, archive_download_url, size_in_bytes }) => (
                    <Button
                        key={id}
                        variant="outline"
                        color="default"
                        as={Link}
                        href={archive_download_url}
                        target="_blank"
                        disabled={!ready}
                    >
                        {name} <span>[{prettyBytes(size_in_bytes)}]</span>
                    </Button>
                ))}
            </div>
        </Card>
    );
}
