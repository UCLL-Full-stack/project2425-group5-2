import Header from '@/components/header';
import Head from 'next/head';
import TeamCreator from '@/components/teams/TeamCreator';
import { useRouter } from 'next/router';

const TeamCreatePage: React.FC = () => {
    const router = useRouter();

    const handleTeamCreated = async () => {
        router.push('/teams');
    };

    return (
        <>
            <Head>
                <title>Create Team - TeamTrack</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <TeamCreator onTeamCreated={handleTeamCreated} />
            </main>
        </>
    );
};

export default TeamCreatePage;
