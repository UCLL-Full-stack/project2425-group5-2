import Head from 'next/head';
import Login from '../../components/auth/Login';
import Layout from '../../components/layout/Layout';

const LoginPage = () => {
    return (
        <Layout>
            <Head>
                <title>t('loginIndex.title')</title>
            </Head>
            <Login />
        </Layout>
    );
};

export const getServersideProps = async (context) => {
    const { locale } = context;

    return  {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        },
    };
};

export default LoginPage;
