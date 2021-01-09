import { ChangeEvent, FunctionComponent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth-context";
import { ResponseServer } from "../types";
import {
  MeDocument,
  useLogoutMutation,
  useUserRecipesQuery,
  useUpdateAvatarMutation,
} from "../generated/graphql";
import { client as apiClient } from "../utils/client";
import RecipeCard from "../components/RecipeCard";
import FullPageSpinner from "../components/fullPageSpinner";
import Paginate from "../components/Paginate";
import { NextSeo } from "next-seo";

const Profile: FunctionComponent<{}> = () => {
  const auth = useAuth();
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { data, loading, fetchMore } = useUserRecipesQuery({
    variables: {
      page,
    },
    fetchPolicy: "network-only",
  });
  const [updateAvatar] = useUpdateAvatarMutation();
  const [logout] = useLogoutMutation();

  if (!auth?.user.me) {
    router.push("/");
  }

  if (loading || auth.loading) {
    return <FullPageSpinner />;
  }

  const handleChangePage = ({ selected }: { selected: number }) => {
    if (fetchMore) {
      fetchMore({
        variables: {
          page: selected + 1,
        },
      });
    }
  };

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity && event.currentTarget.files.length) {
      const formData = new FormData();
      formData.append("path", "avatar");
      formData.append("image", event.currentTarget.files[0]);
      const { success, data } = await apiClient("uploads", formData);
      if (success) {
        await updateAvatar({
          variables: {
            avatar: data,
          },
          update: (cache, { data }) => {
            return cache.writeQuery({
              query: MeDocument,
              data: data.updateAvatar,
            });
          },
        });
      }
    }
  };

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.logout) {
      window.location.href = "/";
    }
  };

  return (
    <Layout>
      <NextSeo title="Profile" description="Sample recipe for your meal." />
      <Wrapper>
        <ProfileStyle>
          <ProfileAvatar>
            <label htmlFor="file">
              <EditWrapper>
                <FaPencilAlt color="white" />
              </EditWrapper>
            </label>
            <img
              src={
                auth?.user?.me?.avatar
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatar/${auth.user.me.avatar}`
                  : "/user-placeholder.svg"
              }
              alt="avatar"
            />
            <input
              type="file"
              id="file"
              onChange={handleChangeAvatar}
              style={{ display: "none" }}
            />
          </ProfileAvatar>
          <ProfileInfo>
            <h2>{auth.user.me && auth.user.me.name}</h2>
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </span>
            <AddRecipe>
              <Link href="/add-recipe">
                <a>
                  <Button variant="success" text="Add Your Recipe." />
                </a>
              </Link>
            </AddRecipe>
          </ProfileInfo>
        </ProfileStyle>
        <ProfileRecipe>
          <Recipes>
            {data.userRecipes.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} path="edit" />
            ))}
          </Recipes>
          <Paginate
            totalPages={data.userRecipes.totalPages}
            handleChangePage={handleChangePage}
          />
        </ProfileRecipe>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 1fr;
  align-items: flex-start;
  grid-gap: 50px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EditWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.6rem;
  margin: 0.2rem;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  min-height: 20rem;
`;

const ProfileAvatar = styled.div`
  margin-top: 1rem;
  position: relative;

  img {
    border-radius: 50%;
    width: 160px;
    height: 160px;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  * {
    margin: 0.5rem 0;
  }

  text-align: center;

  h2 {
    font-weight: lighter;
  }
`;

const ProfileRecipe = styled.div``;

const AddRecipe = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`;

const Recipes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  min-height: 650px;

  img {
    height: 200px;
    max-height: 200px;
  }

  h4 {
    padding: 0;
    margin: 0.3rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    min-height: auto;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.headers.cookie || null;
  const response = await fetch("https://jjams.co/api/recipe/me", {
    method: "GET",
    headers: {
      cookie: cookies,
    },
  });
  const result: ResponseServer = await response.json();

  if (!result.success) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  return {
    props: {},
  };
};

export default Profile;
