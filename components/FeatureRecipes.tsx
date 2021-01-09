import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { RecipeInfoFragment } from "../generated/graphql";
import { DividerVerticle } from "../styled";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: RecipeInfoFragment[];
}

const Feature: FunctionComponent<Props> = ({ recipes }) => {
  const duplicateFeature = [...recipes];
  const heroCard = duplicateFeature.splice(0, 1)[0];

  return (
    <Wrapper>
      <Hero>
        <RecipeCard recipe={heroCard} />
      </Hero>
      <DividerVerticle className="divider-verticle" />
      <SubHero>
        {recipes.map((recipe, index) => {
          return index > 0 && <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </SubHero>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 60% 0% 1fr;
  align-items: flex-start;

  @media (max-width: 600px) {
    grid-gap: 0;
    grid-template-columns: repeat(1, 1fr);

    .divider-verticle {
      display: none;
    }
  }
`;

const Hero = styled.div`
  & div:nth-child(1) {
    position: relative;
    min-height: 450px;
  }

  @media (max-width: 600px) {
    & div:nth-child(1) {
      min-height: 200px;
    }
  }
`;

const SubHero = styled.div`
  > div {
    border-bottom: 1px solid var(--light-gray);
  }

  & div:nth-child(1) img {
    max-height: 200px;
  }

  & div:nth-child(2) div:nth-child(1),
  div:nth-child(3) div:nth-child(1) {
    display: none;
  }

  @media (max-width: 600px) {
    & div:nth-child(2) div:nth-child(1),
    div:nth-child(3) div:nth-child(1) {
      display: block;
    }
  }
`;

export default Feature;
