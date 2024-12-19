import Head from 'next/head';
import Register from '../../components/auth/Register';
import Layout from '../../components/layout/Layout';

const RegisterPage = () => {
    return (
        <Layout>
            <Head>
                <title>t('registerIndex.title')</title>
            </Head>
            <Register />
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

export default RegisterPage;
