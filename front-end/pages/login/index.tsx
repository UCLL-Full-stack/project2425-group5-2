import Head from 'next/head';
import Login from '../../components/auth/Login';
import Layout from '../../components/layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const LoginPage = () => {
    const { t } = useTranslation('common');
    return (
        <Layout>
            <Head>
                <title>{t('loginIndex.title')}</title>
            </Head>
            <Login />
        </Layout>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    };
};

export default LoginPage;
