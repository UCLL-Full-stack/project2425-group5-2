import Head from 'next/head';
import TeamCreator from '@components/teams/TeamCreator';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';

const TeamCreatePage: React.FC = () => {
    const router = useRouter();

    const handleTeamCreated = async () => {
        router.push('/teams');
    };

    return (
        <Layout>
            <Head>
                <title>Create Team - TeamTrack</title>
            </Head>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <TeamCreator onTeamCreated={handleTeamCreated} />
            </main>
        </Layout>
    );
};

export default TeamCreatePage;
