import { NextSeo } from "next-seo";
import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <NextSeo title="Recipe" description="Sample recipe for your meal." />
      <h1>Not Found.</h1>
    </Layout>
  );
};

export default NotFoundPage;
