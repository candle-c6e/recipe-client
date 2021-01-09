import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  CategoriesWithTotalPagesDocument,
  CategoriesWithTotalPagesQuery,
  CategoryPageDocument,
  CategoryPageQuery,
  RecipeInfoFragment,
} from "../../generated/graphql";
import Layout from "../../components/Layout";
import RecipeCard from "../../components/RecipeCard";
import { initializeApollo } from "../../lib/apolloClient";
import Paginate from "../../components/Paginate";
import { NextSeo } from "next-seo";

interface Props {
  recipes: RecipeInfoFragment[];
  totalPages: number;
}

const Category: FunctionComponent<Props> = ({ recipes, totalPages }) => {
  const router = useRouter();

  const handleChangePage = ({ selected }: { selected: number }) => {
    router.push(`/category/${router.query.category[0]}/${selected + 1}`);
  };

  return (
    <Layout>
      <NextSeo title="Recipe" description="Sample recipe for your meal." />
      <Wrapper>
        <Recipe>
          {recipes && recipes.length ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div>Not found.</div>
          )}
        </Recipe>
        {recipes && recipes.length ? (
          <Paginate
            totalPages={totalPages}
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
    fallback: true,
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

    return {
      props: {
        recipes: categoryPage.recipes,
        totalPages: categoryPage.totalPages,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Category;
