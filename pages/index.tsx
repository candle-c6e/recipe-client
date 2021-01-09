import { GetStaticProps } from "next";
import { FunctionComponent } from "react";
import styled from "styled-components";
import Feature from "../components/FeatureRecipes";
import LastedRecipes from "../components/LastedRecipes";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { RecipesDocument, RecipesQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

interface Props {
  recipes: RecipesQuery;
}

const Home: FunctionComponent<Props> = ({ recipes }) => {
  return (
    <Layout>
      <SEO />
      <Wrapper>
        <FeatureWrapper>
          <Feature recipes={recipes.recipes.feature} />
        </FeatureWrapper>
        <LastedWrapper>
          <LastedRecipes recipes={recipes.recipes.lasted} />
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

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: RecipesDocument,
  });

  return addApolloState(apolloClient, {
    props: {
      recipes: data,
    },
    revalidate: 1,
  });
};

export default Home;
