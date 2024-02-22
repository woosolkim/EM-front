import { CodegenConfig } from "@graphql-codegen/cli";

const API_END_POINT = process.env.NEXT_PUBLIC_API_ENDPOINT!;

const config: CodegenConfig = {
  schema: [
    {
      [API_END_POINT]: {
        headers: {},
      },
    },
  ],
  documents: "./graphql/*.graphql",
  generates: {
    "./graphql/types/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
