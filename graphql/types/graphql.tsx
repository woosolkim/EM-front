import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createReadingMaterial?: Maybe<Read>;
};


export type MutationCreateReadingMaterialArgs = {
  charactersCount?: InputMaybe<Scalars['Int']['input']>;
  level: Scalars['Int']['input'];
  topic: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTodaysReadingByLevel: Array<Read>;
  user?: Maybe<User>;
};


export type QueryGetTodaysReadingByLevelArgs = {
  level: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Read = {
  __typename?: 'Read';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  level: Scalars['Int']['output'];
  topic: Scalars['String']['output'];
};

export type Score = {
  __typename?: 'Score';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  scores: Array<Score>;
  wrongWords: Array<WrongWord>;
};

export type WrongWord = {
  __typename?: 'WrongWord';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  solved: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  word: Scalars['String']['output'];
};

export type GetTodaysReadingByLevelQueryVariables = Exact<{
  level: Scalars['Int']['input'];
}>;


export type GetTodaysReadingByLevelQuery = { __typename?: 'Query', getTodaysReadingByLevel: Array<{ __typename?: 'Read', content: string, createdAt: string, from: string, id: number, level: number, topic: string }> };

export type CreateReadingMaterialMutationVariables = Exact<{
  level: Scalars['Int']['input'];
  topic: Scalars['String']['input'];
  charactersCount?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateReadingMaterialMutation = { __typename?: 'Mutation', createReadingMaterial?: { __typename?: 'Read', content: string, createdAt: string, from: string, id: number, level: number, topic: string } | null };


export const GetTodaysReadingByLevelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTodaysReadingByLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"level"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTodaysReadingByLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"level"},"value":{"kind":"Variable","name":{"kind":"Name","value":"level"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}}]}}]}}]} as unknown as DocumentNode<GetTodaysReadingByLevelQuery, GetTodaysReadingByLevelQueryVariables>;
export const CreateReadingMaterialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReadingMaterial"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"level"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"charactersCount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReadingMaterial"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"level"},"value":{"kind":"Variable","name":{"kind":"Name","value":"level"}}},{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}},{"kind":"Argument","name":{"kind":"Name","value":"charactersCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"charactersCount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}}]}}]}}]} as unknown as DocumentNode<CreateReadingMaterialMutation, CreateReadingMaterialMutationVariables>;