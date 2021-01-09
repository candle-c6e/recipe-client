import { FunctionComponent } from "react";

interface Props {
  currentURL?: string;
  previewImage?: string;
  siteName?: string;
  pageTitle?: string;
  description?: string;
}

const SEO: FunctionComponent<Props> = ({
  currentURL = "https://jjams.co/recipe",
  previewImage = "https://jjams.co/recipe/recipe.jpg",
  siteName = "jjams.co",
  pageTitle = "https://jjams.co/recipe",
  description = "https://jjams.co/recipe",
}) => {
  return (
    <>
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </>
  );
};

export default SEO;
