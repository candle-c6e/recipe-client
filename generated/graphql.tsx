import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Users>;
  userRecipes: RecipesWithTotalPages;
  categories: Array<Categories>;
  categoriesWithTotalPages: Array<CategoryTotalPages>;
  categoryPage: RecipesWithTotalPages;
  recipeSlugs: Array<RecipeSlugs>;
  recipes: RecipesHome;
  recipeById: Recipes;
  recipeBySlug: RecipeRelateTypes;
};


export type QueryUserRecipesArgs = {
  page: Scalars['Float'];
};


export type QueryCategoryPageArgs = {
  page: Scalars['String'];
  title: Scalars['String'];
};


export type QueryRecipeByIdArgs = {
  id: Scalars['Float'];
};


export type QueryRecipeBySlugArgs = {
  slug: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  recipes: Array<Recipes>;
};


export type Recipes = {
  __typename?: 'Recipes';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  thumbnail: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  category: Categories;
  user: Users;
};

export type Categories = {
  __typename?: 'Categories';
  id: Scalars['ID'];
  title: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  recipes: Array<Recipes>;
};

export type RecipesWithTotalPages = {
  __typename?: 'RecipesWithTotalPages';
  recipes: Array<Recipes>;
  totalPages: Scalars['Float'];
};

export type CategoryTotalPages = {
  __typename?: 'CategoryTotalPages';
  title: Scalars['String'];
  total_pages: Scalars['Float'];
};

export type RecipeSlugs = {
  __typename?: 'RecipeSlugs';
  slug: Scalars['String'];
};

export type RecipesHome = {
  __typename?: 'RecipesHome';
  feature: Array<Recipes>;
  lasted: Array<Recipes>;
};

export type RecipeRelateTypes = {
  __typename?: 'RecipeRelateTypes';
  recipe: Recipes;
  relate: Array<Recipes>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Users;
  login: Users;
  logout: Scalars['Boolean'];
  updateAvatar: Users;
  addCategory: Categories;
  updateCategory: Categories;
  addRecipe: Recipes;
  updateRecipe: Recipes;
  deleteRecipe: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateAvatarArgs = {
  avatar: Scalars['String'];
};


export type MutationAddCategoryArgs = {
  title: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationAddRecipeArgs = {
  recipeInput: RecipeInput;
};


export type MutationUpdateRecipeArgs = {
  recipeInput: UpdateRecipeInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RecipeInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  thumbnail: Scalars['String'];
  category_id: Scalars['Float'];
};

export type UpdateRecipeInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  thumbnail: Scalars['String'];
  category_id: Scalars['Float'];
  id: Scalars['Float'];
};

export type RecipeInfoFragment = (
  { __typename?: 'Recipes' }
  & Pick<Recipes, 'id' | 'title' | 'slug' | 'thumbnail'>
  & { category: (
    { __typename?: 'Categories' }
    & Pick<Categories, 'title'>
  ), user: (
    { __typename?: 'Users' }
    & Pick<Users, 'name'>
  ) }
);

export type AddRecipeMutationVariables = Exact<{
  recipeInput: RecipeInput;
}>;


export type AddRecipeMutation = (
  { __typename?: 'Mutation' }
  & { addRecipe: (
    { __typename?: 'Recipes' }
    & Pick<Recipes, 'id' | 'title' | 'description' | 'thumbnail'>
  ) }
);

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRecipeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRecipe'>
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  ) }
);

export type UpdateAvatarMutationVariables = Exact<{
  avatar: Scalars['String'];
}>;


export type UpdateAvatarMutation = (
  { __typename?: 'Mutation' }
  & { updateAvatar: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  ) }
);

export type UpdateRecipeMutationVariables = Exact<{
  updateRecipeInput: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipe: (
    { __typename?: 'Recipes' }
    & Pick<Recipes, 'description'>
    & RecipeInfoFragment
  ) }
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Categories' }
    & Pick<Categories, 'id' | 'title'>
  )> }
);

export type CategoriesWithTotalPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesWithTotalPagesQuery = (
  { __typename?: 'Query' }
  & { categoriesWithTotalPages: Array<(
    { __typename?: 'CategoryTotalPages' }
    & Pick<CategoryTotalPages, 'title' | 'total_pages'>
  )> }
);

export type CategoryPageQueryVariables = Exact<{
  title: Scalars['String'];
  page: Scalars['String'];
}>;


export type CategoryPageQuery = (
  { __typename?: 'Query' }
  & { categoryPage: (
    { __typename?: 'RecipesWithTotalPages' }
    & Pick<RecipesWithTotalPages, 'totalPages'>
    & { recipes: Array<(
      { __typename?: 'Recipes' }
      & RecipeInfoFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  )> }
);

export type RecipeBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RecipeBySlugQuery = (
  { __typename?: 'Query' }
  & { recipeBySlug: (
    { __typename?: 'RecipeRelateTypes' }
    & { recipe: (
      { __typename?: 'Recipes' }
      & Pick<Recipes, 'description' | 'created_at'>
      & { category: (
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'title'>
      ) }
      & RecipeInfoFragment
    ), relate: Array<(
      { __typename?: 'Recipes' }
      & Pick<Recipes, 'id' | 'title' | 'slug' | 'thumbnail'>
    )> }
  ) }
);

export type RecipeSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeSlugsQuery = (
  { __typename?: 'Query' }
  & { recipeSlugs: Array<(
    { __typename?: 'RecipeSlugs' }
    & Pick<RecipeSlugs, 'slug'>
  )> }
);

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = (
  { __typename?: 'Query' }
  & { recipes: (
    { __typename?: 'RecipesHome' }
    & { feature: Array<(
      { __typename?: 'Recipes' }
      & RecipeInfoFragment
    )>, lasted: Array<(
      { __typename?: 'Recipes' }
      & RecipeInfoFragment
    )> }
  ) }
);

export type UserRecipesQueryVariables = Exact<{
  page: Scalars['Float'];
}>;


export type UserRecipesQuery = (
  { __typename?: 'Query' }
  & { userRecipes: (
    { __typename?: 'RecipesWithTotalPages' }
    & Pick<RecipesWithTotalPages, 'totalPages'>
    & { recipes: Array<(
      { __typename?: 'Recipes' }
      & RecipeInfoFragment
    )> }
  ) }
);

export const RecipeInfoFragmentDoc = gql`
    fragment RecipeInfo on Recipes {
  id
  title
  slug
  thumbnail
  category {
    title
  }
  user {
    name
  }
}
    `;
export const AddRecipeDocument = gql`
    mutation AddRecipe($recipeInput: RecipeInput!) {
  addRecipe(recipeInput: $recipeInput) {
    id
    title
    description
    thumbnail
  }
}
    `;
export type AddRecipeMutationFn = Apollo.MutationFunction<AddRecipeMutation, AddRecipeMutationVariables>;

/**
 * __useAddRecipeMutation__
 *
 * To run a mutation, you first call `useAddRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipeMutation, { data, loading, error }] = useAddRecipeMutation({
 *   variables: {
 *      recipeInput: // value for 'recipeInput'
 *   },
 * });
 */
export function useAddRecipeMutation(baseOptions?: Apollo.MutationHookOptions<AddRecipeMutation, AddRecipeMutationVariables>) {
        return Apollo.useMutation<AddRecipeMutation, AddRecipeMutationVariables>(AddRecipeDocument, baseOptions);
      }
export type AddRecipeMutationHookResult = ReturnType<typeof useAddRecipeMutation>;
export type AddRecipeMutationResult = Apollo.MutationResult<AddRecipeMutation>;
export type AddRecipeMutationOptions = Apollo.BaseMutationOptions<AddRecipeMutation, AddRecipeMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: Float!) {
  deleteRecipe(id: $id)
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, baseOptions);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    id
    name
    avatar
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    id
    name
    avatar
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($avatar: String!) {
  updateAvatar(avatar: $avatar) {
    id
    name
    avatar
  }
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, baseOptions);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {
  updateRecipe(recipeInput: $updateRecipeInput) {
    ...RecipeInfo
    description
  }
}
    ${RecipeInfoFragmentDoc}`;
export type UpdateRecipeMutationFn = Apollo.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      updateRecipeInput: // value for 'updateRecipeInput'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        return Apollo.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, baseOptions);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = Apollo.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    title
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoriesWithTotalPagesDocument = gql`
    query CategoriesWithTotalPages {
  categoriesWithTotalPages {
    title
    total_pages
  }
}
    `;

/**
 * __useCategoriesWithTotalPagesQuery__
 *
 * To run a query within a React component, call `useCategoriesWithTotalPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesWithTotalPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesWithTotalPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesWithTotalPagesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesWithTotalPagesQuery, CategoriesWithTotalPagesQueryVariables>) {
        return Apollo.useQuery<CategoriesWithTotalPagesQuery, CategoriesWithTotalPagesQueryVariables>(CategoriesWithTotalPagesDocument, baseOptions);
      }
export function useCategoriesWithTotalPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesWithTotalPagesQuery, CategoriesWithTotalPagesQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesWithTotalPagesQuery, CategoriesWithTotalPagesQueryVariables>(CategoriesWithTotalPagesDocument, baseOptions);
        }
export type CategoriesWithTotalPagesQueryHookResult = ReturnType<typeof useCategoriesWithTotalPagesQuery>;
export type CategoriesWithTotalPagesLazyQueryHookResult = ReturnType<typeof useCategoriesWithTotalPagesLazyQuery>;
export type CategoriesWithTotalPagesQueryResult = Apollo.QueryResult<CategoriesWithTotalPagesQuery, CategoriesWithTotalPagesQueryVariables>;
export const CategoryPageDocument = gql`
    query CategoryPage($title: String!, $page: String!) {
  categoryPage(title: $title, page: $page) {
    recipes {
      ...RecipeInfo
    }
    totalPages
  }
}
    ${RecipeInfoFragmentDoc}`;

/**
 * __useCategoryPageQuery__
 *
 * To run a query within a React component, call `useCategoryPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryPageQuery({
 *   variables: {
 *      title: // value for 'title'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useCategoryPageQuery(baseOptions: Apollo.QueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
        return Apollo.useQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, baseOptions);
      }
export function useCategoryPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
          return Apollo.useLazyQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, baseOptions);
        }
export type CategoryPageQueryHookResult = ReturnType<typeof useCategoryPageQuery>;
export type CategoryPageLazyQueryHookResult = ReturnType<typeof useCategoryPageLazyQuery>;
export type CategoryPageQueryResult = Apollo.QueryResult<CategoryPageQuery, CategoryPageQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RecipeBySlugDocument = gql`
    query RecipeBySlug($slug: String!) {
  recipeBySlug(slug: $slug) {
    recipe {
      ...RecipeInfo
      category {
        id
        title
      }
      description
      created_at
    }
    relate {
      id
      title
      slug
      thumbnail
    }
  }
}
    ${RecipeInfoFragmentDoc}`;

/**
 * __useRecipeBySlugQuery__
 *
 * To run a query within a React component, call `useRecipeBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRecipeBySlugQuery(baseOptions: Apollo.QueryHookOptions<RecipeBySlugQuery, RecipeBySlugQueryVariables>) {
        return Apollo.useQuery<RecipeBySlugQuery, RecipeBySlugQueryVariables>(RecipeBySlugDocument, baseOptions);
      }
export function useRecipeBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeBySlugQuery, RecipeBySlugQueryVariables>) {
          return Apollo.useLazyQuery<RecipeBySlugQuery, RecipeBySlugQueryVariables>(RecipeBySlugDocument, baseOptions);
        }
export type RecipeBySlugQueryHookResult = ReturnType<typeof useRecipeBySlugQuery>;
export type RecipeBySlugLazyQueryHookResult = ReturnType<typeof useRecipeBySlugLazyQuery>;
export type RecipeBySlugQueryResult = Apollo.QueryResult<RecipeBySlugQuery, RecipeBySlugQueryVariables>;
export const RecipeSlugsDocument = gql`
    query RecipeSlugs {
  recipeSlugs {
    slug
  }
}
    `;

/**
 * __useRecipeSlugsQuery__
 *
 * To run a query within a React component, call `useRecipeSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipeSlugsQuery(baseOptions?: Apollo.QueryHookOptions<RecipeSlugsQuery, RecipeSlugsQueryVariables>) {
        return Apollo.useQuery<RecipeSlugsQuery, RecipeSlugsQueryVariables>(RecipeSlugsDocument, baseOptions);
      }
export function useRecipeSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeSlugsQuery, RecipeSlugsQueryVariables>) {
          return Apollo.useLazyQuery<RecipeSlugsQuery, RecipeSlugsQueryVariables>(RecipeSlugsDocument, baseOptions);
        }
export type RecipeSlugsQueryHookResult = ReturnType<typeof useRecipeSlugsQuery>;
export type RecipeSlugsLazyQueryHookResult = ReturnType<typeof useRecipeSlugsLazyQuery>;
export type RecipeSlugsQueryResult = Apollo.QueryResult<RecipeSlugsQuery, RecipeSlugsQueryVariables>;
export const RecipesDocument = gql`
    query Recipes {
  recipes {
    feature {
      ...RecipeInfo
    }
    lasted {
      ...RecipeInfo
    }
  }
}
    ${RecipeInfoFragmentDoc}`;

/**
 * __useRecipesQuery__
 *
 * To run a query within a React component, call `useRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipesQuery(baseOptions?: Apollo.QueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
        return Apollo.useQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
      }
export function useRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
          return Apollo.useLazyQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
        }
export type RecipesQueryHookResult = ReturnType<typeof useRecipesQuery>;
export type RecipesLazyQueryHookResult = ReturnType<typeof useRecipesLazyQuery>;
export type RecipesQueryResult = Apollo.QueryResult<RecipesQuery, RecipesQueryVariables>;
export const UserRecipesDocument = gql`
    query UserRecipes($page: Float!) {
  userRecipes(page: $page) {
    recipes {
      ...RecipeInfo
    }
    totalPages
  }
}
    ${RecipeInfoFragmentDoc}`;

/**
 * __useUserRecipesQuery__
 *
 * To run a query within a React component, call `useUserRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRecipesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUserRecipesQuery(baseOptions: Apollo.QueryHookOptions<UserRecipesQuery, UserRecipesQueryVariables>) {
        return Apollo.useQuery<UserRecipesQuery, UserRecipesQueryVariables>(UserRecipesDocument, baseOptions);
      }
export function useUserRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRecipesQuery, UserRecipesQueryVariables>) {
          return Apollo.useLazyQuery<UserRecipesQuery, UserRecipesQueryVariables>(UserRecipesDocument, baseOptions);
        }
export type UserRecipesQueryHookResult = ReturnType<typeof useUserRecipesQuery>;
export type UserRecipesLazyQueryHookResult = ReturnType<typeof useUserRecipesLazyQuery>;
export type UserRecipesQueryResult = Apollo.QueryResult<UserRecipesQuery, UserRecipesQueryVariables>;