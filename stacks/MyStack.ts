import { StackContext, Api, Table, AppSyncApi } from "sst/constructs";

export function API({ stack }: StackContext) {
  // Create a notes table
  const notesTable = new Table(stack, "Notes", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  // Create the AppSync GraphQL API
  const graphQlApi = new AppSyncApi(stack, "AppSyncApi", {
    schema: "packages/functions/src/graphql/schema.graphql",
    defaults: {
      function: {
        // Bind the table name to the function
        bind: [notesTable],
      },
    },
    dataSources: {
      notes: "packages/functions/src/main.handler",
    },
    resolvers: {
      "Query    listNotes": "notes",
      "Query    getNoteById": "notes",
      "Mutation createNote": "notes",
      "Mutation updateNote": "notes",
      "Mutation deleteNote": "notes",
    },
  });

  // Show the AppSync API Id and API Key in the output
  stack.addOutputs({
    GraphQlApiId: graphQlApi.apiId,
    GraphQlAPiUrl: graphQlApi.url,
    GraphQlApiKey: graphQlApi.cdk.graphqlApi.apiKey || "",
  });

  // Create a REST API (API Gateway)
  const restApi = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });
  stack.addOutputs({
    RestApiEndpoint: restApi.url,
  });
}
