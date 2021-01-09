import { FunctionComponent, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";

type Recipe = {
  slug: string;
  thumbnail: string;
  title: string;
  category?: {
    title: string;
  };
  user?: {
    name: string;
  };
};

interface Props {
  recipe: Recipe;
  path?: string;
}

const RecipeCard: FunctionComponent<Props> = ({ recipe, path }) => {
  return (
    <Wrapper>
      <Thumbnail>
        {path && (
          <Link href={`/edit-recipe/${recipe.slug}`}>
            <a>
              <EditWrapper>
                <FaPencilAlt color="white" />
              </EditWrapper>
            </a>
          </Link>
        )}
        <Link href={`/recipe/${recipe.slug}`}>
          <a>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/recipe/${recipe.thumbnail}`}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              quality={50}
            />
          </a>
        </Link>
      </Thumbnail>
      <Detail>
        {recipe?.category?.title && (
          <Link href={`/category/${recipe.category.title}/1`}>
            <a>
              <p>{recipe.category.title.toUpperCase()}</p>
            </a>
          </Link>
        )}
        <Link href={`/recipe/${recipe.slug}`}>
          <a>
            <h4>{recipe.title}</h4>
            {recipe?.user?.name && <span>by {recipe.user.name}</span>}
          </a>
        </Link>
      </Detail>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  p {
    color: var(--primary);
  }

  h4 {
    padding: 0.4rem 0;
  }

  span {
    color: var(--gray);
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
`;

const Thumbnail = styled.div`
  position: relative;
  min-height: 200px;

  img {
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Detail = styled.div`
  padding: 1rem 0;
`;

export default RecipeCard;
