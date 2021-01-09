import { GetStaticProps } from "next";
import styled from "styled-components";
import { NextSeo } from "next-seo";
import Feature from "../components/FeatureRecipes";
import LastedRecipes from "../components/LastedRecipes";
import Layout from "../components/Layout";
import { RecipesDocument, useRecipesQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const Home = () => {
  const { data } = useRecipesQuery();

  return (
    <Layout>
      <NextSeo title="Recipe" description="Sample recipe for your meal." />
      <Wrapper>
        <FeatureWrapper>
          <Feature recipes={data.recipes.feature} />
        </FeatureWrapper>
        <LastedWrapper>
          <LastedRecipes recipes={data.recipes.lasted} />
        </LastedWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div``;

const FeatureWrapper = styled.div`
  margin-bottom: 5rem;

  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
`;

const LastedWrapper = styled.div``;

export async function getStaticProps(): Promise<GetStaticProps> {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RecipesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Home;
