import { Accented, Button, Card, Heading, Label, View } from '@nordcom/nordstar';
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
            <header className={`${styles.block} ${styles.header}`}>
                <Card borderless={true} padding={false}>
                    <Heading level="h1" className={styles.heading}>
                        a <Accented>TypeScript</Accented> Minecraft: Bedrock Edition Server
                    </Heading>
                </Card>
            </header>

            <div className={`${styles.block} ${styles.downloads}`}>
                <Card className={styles.version}>
                    <Label>vX.Y.Z</Label>
                    <Heading level="h3" as="h2">
                        Nightly builds
                    </Heading>
                    <Card.Divider />
                    <Button variant="outline" as={Link} href="https://github.com/JSPrismarine/JSPrismarine">
                        Nightly
                    </Button>
                </Card>

                <Card className={styles.version}>
                    <Label>vX.Y.Z</Label>
                    <Heading level="h3" as="h2">
                        Testing builds
                    </Heading>
                    <Card.Divider />
                    <Button variant="outline">Beta</Button>
                </Card>

                <Card color="primary" className={styles.version}>
                    <Label>vX.Y.Z</Label>
                    <Heading level="h3" as="h2">
                        Release builds
                    </Heading>
                    <Card.Divider />
                    <Button>Release</Button>
                </Card>
            </div>
        </View>
    );
}
