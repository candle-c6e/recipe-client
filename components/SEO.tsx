import { FunctionComponent } from "react";
import Head from "next/head";

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
  siteName = "jjams",
  pageTitle = "Recipe",
  description = "Sample Recipe for your meal.",
}) => {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>
      </Head>
    </>
  );
};

export default SEO;
