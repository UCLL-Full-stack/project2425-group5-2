import Head from 'next/head';
import GameCreator from '@components/games/GameCreator';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';

const GameCreatePage: React.FC = () => {
    const router = useRouter();

    const handleGameCreated = async () => {
        router.push('/games');
    };

    return (
        <Layout>
            <Head>
                <title>Create Team - TeamTrack</title>
            </Head>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <GameCreator onGameCreated={handleGameCreated} />
            </main>
        </Layout>
    );
};

export default GameCreatePage;