import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  CategoriesWithTotalPagesDocument,
  CategoriesWithTotalPagesQuery,
  CategoryPageDocument,
  CategoryPageQuery,
  RecipesWithTotalPages,
} from "../../generated/graphql";
import Layout from "../../components/Layout";
import RecipeCard from "../../components/RecipeCard";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import Paginate from "../../components/Paginate";
import SEO from "../../components/SEO";

interface Props {
  recipes: RecipesWithTotalPages;
}

const Category: FunctionComponent<Props> = ({ recipes }) => {
  const router = useRouter();
  const query = router.query;

  const handleChangePage = ({ selected }: { selected: number }) => {
    router.push(`/category/${query.category[0]}/${selected + 1}`);
  };

  return (
    <Layout>
      <SEO
        currentURL={`https://jjams.co/recipe/category/${query.category[0]}/1`}
      />
      <Wrapper>
        <Recipe>
          {recipes.recipes && recipes.recipes.length ? (
            recipes.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div>Not found.</div>
          )}
        </Recipe>
        {recipes.recipes && recipes.recipes.length ? (
          <Paginate
            forcePage={query.category[1] - 1}
            totalPages={recipes.totalPages}
            handleChangePage={handleChangePage}
          />
        ) : null}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  div {
    h4 {
      padding: 0;
      margin: 0.3rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    img {
      height: 200px;
      max-height: 200px;
    }
  }
`;

const Recipe = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  min-height: 640px;

  @media (max-width: 600px) {
    min-height: auto;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: CategoriesWithTotalPagesDocument,
  });

  const result = data as CategoriesWithTotalPagesQuery;

  const paths = [];

  for (let category of result.categoriesWithTotalPages) {
    if (category.total_pages > 0) {
      for (let i = 1; i <= category.total_pages; i++) {
        paths.push({
          params: { category: [category.title, String(i)] },
        });
      }
    } else {
      paths.push({
        params: { category: [category.title, "0"] },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: CategoryPageDocument,
      variables: {
        title: params.category[0],
        page: String(params.category[1]),
      },
    });

    const { categoryPage } = data as CategoryPageQuery;

    return addApolloState(apolloClient, {
      props: {
        recipes: categoryPage,
      },
      revalidate: 1,
    });
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Category;
