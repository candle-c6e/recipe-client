import Link from "next/link";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { RecipeInfoFragment } from "../generated/graphql";
import { DividerVerticle } from "../styled";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: RecipeInfoFragment[];
}

const LastedRecipes: FunctionComponent<Props> = ({ recipes }) => {
  return (
    <Wrapper>
      <LastedWrapper>
        <LastedHeader>
          <h2>Lasted</h2>
          <Link href="/category/all/1">
            <a>
              <span>See All</span>
            </a>
          </Link>
        </LastedHeader>
        <Lasted>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Lasted>
      </LastedWrapper>
      <DividerVerticle className="divider-verticle" />
      <About>
        <h2>About</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime animi
          eaque officia quaerat reiciendis corrupti totam asperiores, illo
          provident in distinctio harum vitae nam mollitia deleniti, autem
          illum? Facilis delectus earum a sit ducimus nostrum, quisquam placeat
          atque architecto tempore dolorem esse ullam tempora commodi officiis
          laboriosam magni. Ab ad doloremque perspiciatis. Corporis voluptas
          voluptatum magni inventore, error voluptatibus modi.
        </p>
      </About>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 60% 0% 1fr;
  align-items: flex-start;

  h2 {
    color: var(--primary);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);

    .divider-verticle {
      display: none;
    }
  }
`;

const LastedWrapper = styled.div``;

const LastedHeader = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: var(--gray);
  }
`;

const Lasted = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  div {
    img {
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
  }
`;

const About = styled.div`
  p {
    margin-top: 2rem;
    line-height: 1.8;
  }
`;

export default LastedRecipes;
