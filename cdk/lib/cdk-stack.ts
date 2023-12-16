import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import {
  DockerImageFunction,
  DockerImageCode,
  Architecture,
} from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository');

    const lambda = new DockerImageFunction(this, 'MyLambda', {
      code: DockerImageCode.fromEcr(repository),
      architecture: Architecture.ARM_64,
    });

    new LambdaRestApi(this, 'Endpoint', {
      handler: lambda,
    });
  }
}
