import { APIGatewayProxyEventV2, APIGatewayProxyResult, Context } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'
import { v1 as uuid } from 'uuid'

const client = new DynamoDBClient({})

const dynamo = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME || ""

export async function handler(event: APIGatewayProxyEventV2, context: Context) {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: ""
  }

  let responseBody: unknown

  try {
    switch (event.routeKey) {
      case "GET /configurations/{id}": {
        const output = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters?.id,
            },
          })
        )
        responseBody = output.Item
        break
      }
      case "GET /configurations": {
        const output = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        )
        responseBody = output.Items
        break
      }
      case "PUT /configurations": {
        const requestBody = JSON.parse(event.body ?? "{}")
        const itemId = uuid()
        const item = {
          id: itemId,
          thickness: requestBody.thickness,
          frontRadius: requestBody.frontRadius,
          backRadius: requestBody.backRadius,
          frontSurface: requestBody.frontSurface,
          backSurface: requestBody.backSurface,
          refractionIndex: requestBody.refractionIndex,
        }
        const output = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: item,
          })
        )
        responseBody = {
          message: `Put item ${itemId}`,
          data: item
        }
        result.statusCode = 201
        break
      }
      case "DELETE /configurations/{id}": {
        const output = await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters?.id,
            },
          })
        )
        responseBody = {
          message: `Deleted item ${event.pathParameters?.id}`,
          data: event.pathParameters?.id
        }
        break
      }
      default:
        throw new Error(`Unsupported route: "${event}"`)
    }
  } catch (err: any) {
    result.statusCode = 400
    responseBody = err.message
  } finally {
    result.body = JSON.stringify(responseBody)
  }

  return result
}
