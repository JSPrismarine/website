import { Button, Card, Heading, View } from '@nordcom/nordstar';
import type { Metadata } from 'next';
import styles from '@/app/page.module.scss';
import Link from 'next/link';

export const metadata: Metadata = {
    title: {
        absolute: 'JSPrismarine'
    },
    description: 'a TypeScript Minecraft: Bedrock Edition Server',
    alternates: {
        canonical: 'https://prismarine.nordcom.io/'
    }
};

export default async function IndexPage() {
    return (
        <View className={styles.container}>
            <Card borderless={true} padding={false}>
                <Heading level="h2" as="h1">
                    a TypeScript Minecraft: Bedrock Edition Server
                </Heading>
            </Card>

            <div className={styles.downloads}>
                <Card className={styles.version}>
                    <Heading level="h2">Nightly</Heading>
                    <Heading level="h3">Highly unstable builds</Heading>
                    <Card.Divider />
                    <Button variant="outline" as={Link} href="https://github.com/JSPrismarine/JSPrismarine">
                        v0.0.0
                    </Button>
                </Card>
                <Card className={styles.version}>
                    <Heading level="h2">Beta</Heading>
                    <Heading level="h3">In-between builds</Heading>
                    <Card.Divider />
                    <Button variant="outline" disabled>
                        v0.0.0
                    </Button>
                </Card>
                <Card className={styles.version}>
                    <Heading level="h2">Release</Heading>
                    <Heading level="h3">Properly tested build</Heading>
                    <Card.Divider />
                    <Button color="secondary" variant="solid" disabled>
                        v0.0.0
                    </Button>
                </Card>
            </div>
        </View>
    );
}
