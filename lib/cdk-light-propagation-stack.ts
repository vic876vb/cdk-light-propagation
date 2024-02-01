import * as cdk from 'aws-cdk-lib'
import { CfnOutput, Duration } from 'aws-cdk-lib'
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs';
import { join } from 'path'

export class CdkLightPropagationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // Create the DynamoDB table
    const table = new cdk.aws_dynamodb.Table(this, "CdkLightPropagationConfigurationsTable", {
      tableName: "CdkLightPropagationConfigurations",
      partitionKey: { name: "id", type: AttributeType.STRING }
    })

    // Create the Lambda function
    const mainHandler = new NodejsFunction(this, "CdkLightPropagationMainHandlerFunction", {
      entry: join(__dirname, "..", "lambdas", "main-handler.ts"),
      bundling: {
        externalModules: ["aws-sdk"],
      },
      depsLockFilePath: join(__dirname, "..", "lambdas", "package-lock.json"),
      environment: {
        PRIMARY_KEY: "id",
        TABLE_NAME: table.tableName,
      },
      runtime: Runtime.NODEJS_20_X,
    })

    // Grant the Lambda function read access to the DynamoDB table
    table.grantReadWriteData(mainHandler)
    
    // Integrate the Lambda functions with the API Gateway resource
    const mainIntegration = new HttpLambdaIntegration("CdkLightPropagationMainIntegration", mainHandler)
    
    // Create an API Gateway resource for the CRUD operations
    const httpApi = new HttpApi(this, "CdkLightPropagationConfigurationsApi", {
      apiName: "Configurations HTTP Service",
      description: "HTTP API Gateway",
      // defaultIntegration: mainIntegration,
      corsPreflight: {
        allowOrigins: ["*"],
        allowHeaders: ["*"],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        maxAge: Duration.days(1),
        exposeHeaders: ["*"],
      }
    })

    // Add routes to the HTTP API Gateway
    httpApi.addRoutes({
      path: "/configurations",
      methods: [
        HttpMethod.GET,
        HttpMethod.PUT,
      ],
      integration: mainIntegration,
    })

    httpApi.addRoutes({
      path: '/configurations/{id}',
      methods: [
        HttpMethod.GET,
        HttpMethod.DELETE,
      ],
      integration: mainIntegration,
    })

    // Log API Endpoint to use within Vue app
    new CfnOutput(this, 'ApiEndpoint', {
      description: "API Endpoint",
      value: httpApi.apiEndpoint,
    });

    // should look like this:
    // https://{http-api-id}.execute-api.{region}.amazonaws.com/

  }
}
