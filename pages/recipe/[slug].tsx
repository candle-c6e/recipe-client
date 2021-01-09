import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import {
  RecipeBySlugDocument,
  RecipeSlugsQuery,
  RecipeSlugsDocument,
  RecipeBySlugQuery,
} from "../../generated/graphql";
import parse from "html-react-parser";
import Layout from "../../components/Layout";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import styled from "styled-components";
import RecipeCard from "../../components/RecipeCard";
import { FunctionComponent } from "react";
import SEO from "../../components/SEO";

interface Props {
  recipe: RecipeBySlugQuery;
}

const Recipe: FunctionComponent<Props> = ({ recipe }) => {
  return (
    <Layout>
      <SEO
        currentURL={`https://jjams.co/recipe/recipe/${recipe.recipeBySlug.recipe.title}`}
        previewImage={`${process.env.NEXT_PUBLIC_API_URL}/uploads/recipe/${recipe.recipeBySlug.recipe.thumbnail}`}
        description={recipe.recipeBySlug.recipe.title}
        pageTitle={recipe.recipeBySlug.recipe.title}
      />
      <Wrapper>
        <RecipeStyle>
          <Thumbnail>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/recipe/${recipe.recipeBySlug.recipe.thumbnail}`}
              alt={recipe.recipeBySlug.recipe.title}
            />
          </Thumbnail>
          <Header>
            <h2>{recipe.recipeBySlug.recipe.title}</h2>
            <Link
              href={`/category/${recipe.recipeBySlug.recipe.category.title}/1`}
            >
              <a>
                <p>{recipe.recipeBySlug.recipe.category.title.toUpperCase()}</p>
              </a>
            </Link>
          </Header>
          <Description>
            {parse(recipe.recipeBySlug.recipe.description)}
          </Description>
        </RecipeStyle>
        <Relate>
          {recipe.recipeBySlug.relate.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Relate>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Description = styled.div`
  p {
    margin: 1rem 0;
    line-height: 1.8;
  }
`;

const Thumbnail = styled.div`
  margin-bottom: 1rem;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const RecipeStyle = styled.div`
  padding-right: 2rem;
  border-right: 1px solid var(--light-gray);

  img {
    max-width: 100%;
    object-fit: cover;
  }

  ol,
  li {
    margin: 1rem;
  }

  @media (max-width: 600px) {
    padding: 0;
    border: none;
  }
`;

const Header = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 1rem;

  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--primary);
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;

const Relate = styled.div`
  div {
    padding: 0;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 30%;
    min-height: 100px;

    div:nth-child(2) {
      flex: 1;
      margin-left: 1rem;
    }
  }

  a {
    display: flex;
    align-items: center;

    h4 {
      padding: 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  img {
    border-radius: 10px;
    height: 100px;
    width: 100px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: RecipeSlugsDocument,
  });

  const result = data as RecipeSlugsQuery;

  const paths = result.recipeSlugs.map((item) => {
    return { params: { slug: item.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: RecipeBySlugDocument,
    variables: {
      slug: params.slug,
    },
  });

  const result = data as RecipeBySlugQuery;

  return addApolloState(apolloClient, {
    props: {
      recipe: result,
    },
    revalidate: 1,
  });
};

export default Recipe;
