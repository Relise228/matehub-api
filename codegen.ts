import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/modules/*/*.schema.ts",
  generates: {
    "./src/graphql/modules": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../__generated-types/graphql.ts",
        filename: "./__generated-types/module-types.ts",
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
    },
  },
  config: {
    defaultMapper: "Partial<{T}>",
  },
}

export default config
