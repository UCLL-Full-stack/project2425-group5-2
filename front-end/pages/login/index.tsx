import Head from 'next/head';
import Login from '../../components/auth/Login';
import Layout from '../../components/layout/Layout';

const LoginPage = () => {
    return (
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <Login/>
      </Layout>
    );
  };
  
  export default LoginPage;