import {
  StackContext,
  Api,
  Table,
  AppSyncApi,
  AppSyncApiResolverProps,
} from "sst/constructs";

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
      tableDS: {
        type: "dynamodb",
        table: notesTable,
      },
    },
    resolvers: {
      "Query    listNotes": "notes",
      "Query    getNoteById": "notes",
      "Mutation createNote": "notes",
      "Mutation updateNote": "notes",
      "Mutation deleteNote": "notes",

      /**
       * VTLについては下記を参照。
       * https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html
       *
       * また、VTLのversionについては下記参照。
       * https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-changelog.html
       *
       * 2023年初頭現在では、version 2018-05-29 が最新。
       */
      "Query    listNotesVtl": {
        dataSource: "tableDS",
        requestMapping: {
          inline: `
            {
              "version" : "2018-05-29",
              "operation" : "Scan",
            }
          `,
        },
        responseMapping: {
          // Queryの応答はitems内にリスト形式で格納されていることに注意。
          // なおサイズ超過時のnextTokenは、$ctx.result.nextTokenで取得可能。
          inline: "$util.toJson($ctx.result.items)",
        },
      },
      "Query    getNoteByIdVtl": {
        dataSource: "tableDS",
        requestMapping: {
          inline: `
            {
              "version" : "2018-05-29",
              "operation" : "GetItem",
              "key": {
                "id": $util.dynamodb.toDynamoDBJson($ctx.args.noteId)
              },
            }
          `,
        },
        responseMapping: {
          inline: "$util.toJson($ctx.result)",
        },
      },
      "Mutation createNoteVtl": {
        dataSource: "tableDS",
        requestMapping: {
          inline: `
            {
              "version" : "2018-05-29",
              "operation" : "PutItem",
              "key": {
                "id": $util.dynamodb.toDynamoDBJson($ctx.args.note.id)
              },
              "attributeValues": $util.dynamodb.toMapValuesJson($ctx.args.note),
            }
          `,
        },
        responseMapping: {
          inline: "$util.toJson($ctx.result)",
        },
      },
      "Mutation updateNoteVtl": {
        dataSource: "tableDS",
        requestMapping: {
          inline: `
            {
              "version" : "2018-05-29",
              "operation" : "UpdateItem",
              "key": {
                "id": $util.dynamodb.toDynamoDBJson($ctx.args.note.id)
              },
              "update": {
                "expression": "set #id = :id, #content = :content",
                "expressionNames": {
                  "#id": "id",
                  "#content": "content"
                },
                "expressionValues": {
                  ":id": $util.dynamodb.toDynamoDBJson($ctx.args.note.id),
                  ":content": $util.dynamodb.toDynamoDBJson($ctx.args.note.content)
                }
              }
            }
          `,
        },
        responseMapping: {
          inline: "$util.toJson($ctx.result)",
        },
      },
      "Mutation deleteNoteVtl": {
        dataSource: "tableDS",
        requestMapping: {
          inline: `
            {
              "version" : "2018-05-29",
              "operation" : "DeleteItem",
              "key": {
                "id": $util.dynamodb.toDynamoDBJson($ctx.args.noteId)
              },
              "condition" : {
                "expression" : "attribute_exists(#id)",
                "expressionNames" : {
                  "#id" : "id"
                }
              },
            }        
          `,
        },
        responseMapping: {
          inline: "$util.toJson($ctx.result)",
        },
      },
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
