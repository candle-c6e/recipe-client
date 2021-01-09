import {
  ChangeEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { FormGroup } from "../../styled";
import { client } from "../../utils/client";
import {
  useCategoriesQuery,
  useRecipeBySlugQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "../../generated/graphql";
import Layout from "../../components/Layout";
import FileInput from "../../components/FileInput";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import FullPageSpinner from "../../components/fullPageSpinner";
import { GetServerSideProps } from "next";
import { ResponseServer } from "../../types";

interface Input {
  title: string;
  category_id: number;
}

const UpdateRecipe: FunctionComponent<{}> = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { data, loading } = useCategoriesQuery();
  const { data: recipe, loading: loadingRecipe } = useRecipeBySlugQuery({
    variables: {
      slug,
    },
  });
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const { register, handleSubmit, errors, setValue } = useForm<Input>();

  useEffect(() => {
    if (recipe) {
      setId(+recipe.recipeBySlug.recipe.id);
      setThumbnail(recipe.recipeBySlug.recipe.thumbnail);
      setDescription(recipe.recipeBySlug.recipe.description);
      setValue("title", recipe.recipeBySlug.recipe.title);
      setValue("category_id", recipe.recipeBySlug.recipe.category.id);
    }
  }, [recipe, loadingRecipe]);

  const handleEditorChange = (content: string) => {
    setDescription(content);
  };

  const handleThumbnail = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.currentTarget.validity && event.currentTarget.files.length) {
      const formData = new FormData();
      formData.append("path", "recipe");
      formData.append("image", event.currentTarget.files[0]);
      const result = await client("uploads", formData);
      if (result.success) {
        setThumbnail(result.data);
      }
    }
  };

  const handleDelete = async (filename: string) => {
    const result = await client(
      "delete-image",
      { path: "recipe", filename },
      { method: "DELETE" }
    );
    if (result.success) {
      setThumbnail(null);
    }
  };

  const handleDeleteRecipe = async () => {
    if (window.confirm("You are want to delete?")) {
      const { data } = await deleteRecipe({
        variables: {
          id: +recipe.recipeBySlug.recipe.id,
        },
      });

      if (data.deleteRecipe) {
        router.push("/profile");
      }
    }
  };

  const onSubmit = async ({ title, category_id }: Input) => {
    if (!thumbnail) {
      return alert("Recipe must have thumbnail.");
    }

    const { data } = await updateRecipe({
      variables: {
        updateRecipeInput: {
          id,
          title,
          category_id: +category_id,
          description,
          thumbnail,
        },
      },
    });

    if (data.updateRecipe) {
      router.push("/profile");
    }
  };

  if (loading || loadingRecipe) {
    return <FullPageSpinner />;
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FileInput
            file={thumbnail}
            onChange={handleThumbnail}
            onDelete={handleDelete}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="title"
            placeholder="Title"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.title && errors.title.type === "required" && (
            <ErrorMessage error="Title is required." />
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <ErrorMessage error="Title is should be at least 3 characters." />
          )}
        </FormGroup>
        <FormGroup>
          <select name="category_id" ref={register({ required: true })}>
            {data?.categories &&
              data.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
          {errors.category_id && <ErrorMessage error="Category is required." />}
        </FormGroup>
        <FormGroup>
          <Editor
            value={description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor image | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat table | help",
              file_picker_types: "image",
              images_upload_url: `${process.env.NEXT_PUBLIC_API_URL}`,
              images_upload_handler: async (blobInfo, success) => {
                const formData = new FormData();
                formData.append("path", "recipe");
                formData.append("image", blobInfo.blob(), blobInfo.filename());
                const result = await client("uploads", formData);
                success(
                  `${process.env.NEXT_PUBLIC_API_URL}/uploads/recipe/${result.data}`
                );
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </FormGroup>
        <FormGroup>
          <Button variant="success" text="Save" />
          <Button
            style={{ marginLeft: "1rem" }}
            variant="primary"
            text="Delete"
            type="button"
            onClick={handleDeleteRecipe}
          />
        </FormGroup>
      </form>
    </Layout>
  );
};

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

export default UpdateRecipe;
