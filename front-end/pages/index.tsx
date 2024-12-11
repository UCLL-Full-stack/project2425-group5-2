import Head from 'next/head';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Home - TeamTrack</title>
                <meta
                    name="description"
                    content="TeamTrack app for tracking your team's performance, games, and players"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center space-y-8 py-12">
                <h1 className="text-8xl text-center font-bold text-text border-b border-primary pb-5">
                    Welcome to TeamTrack
                </h1>
                <p className="text-l text-center text-secondary max-w-2xl">
                    TeamTrack is a simple app to help you monitor your team's performance, manage
                    games, and keep track of players. Start organizing your team data today!
                </p>
            </div>
        </Layout>
    );
};

export default Home;
