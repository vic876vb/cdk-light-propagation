# Welcome to CDK Light Propagation project

Make sure you have the basics covered:

## Prerequisites

- Amazon CDK
- Docker
- Python v3.7 or v3.8

Download cdk command with `npm install -g aws-cdk`

You might need to use a dedicated Python virtual environment available only locally for your folder in case your are using a different version.

Check out `pyenv` at https://github.com/pyenv/pyenv.

To run this app, you need to set up your AWS credentials, so make sure to configure your AWS access key using AWS CLI, or use `.env` file.

Download  and install Docker Desktop from the [official website](https://www.docker.com/products/docker-desktop/).


## Project setup

1. Start Docker deamon.
2. Configure AWS account or use `.env` file in this directory to set up your credentials and region. To enable this, uncomment lines in `bin/cdk-light-propagation.ts`.
3. Run `npm install` to install all necessary dependencies.
4. Run `cdk bootstrap`.
5. (optional) Run `cdk synth --no-staging > template.yaml` to save synthesized CloudFormation template.
6. Run `cdk deploy`.
7. Press `y` to agree with deployment of changes.
8. Copy endpoint output `CdkLightPropagationStack.ApiEndpoint` from console into `vue/.env` as `VITE_APP_API_ENDPOINT=...`.
9. Run app with command `npm run start-app`.

The `cdk.json` file tells the CDK Toolkit how to execute your app.
The `template.yaml` file holds the synthesized CloudFormation template.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
* `npx cdk ls`      lists the stacks in the app
* `npx cdk destroy` destroys app resources


## Notes

If you destroy the stack with the command `cdk destroy` and want to deploy it again with `cdk deploy` using the same configurations you might need to delete the db table `CdkLightPropagationConfigurations` from your AWS console manually, before trying again.
