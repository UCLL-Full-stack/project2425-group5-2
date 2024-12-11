import Head from 'next/head';
import Register from '../../components/auth/Register';
import Layout from '../../components/layout/Layout';

const RegisterPage = () => {
    return (
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <Register/>
      </Layout>
    );
  };
  
  export default RegisterPage;