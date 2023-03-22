import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import Note from "./Note";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function createNote(note: Note): Promise<Note> {
  const params = {
    Item: note as Record<string, unknown>,
    // @ts-ignore
    TableName: Table.Notes.tableName,
  };

  await dynamoDb.put(params).promise();

  return note;
}
