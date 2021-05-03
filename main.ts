import { Construct } from 'constructs';
import { App, TerraformStack, RemoteBackend } from 'cdktf';
import { S3Bucket, AwsProvider } from '@cdktf/provider-aws';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    new AwsProvider(this, 'aws', { region: 'eu-central-1' });
    new S3Bucket(this, 'bucket', {});

  }
}

const app = new App();
const stack = new MyStack(app, 'cdktf-bug-tfc-errors');
new RemoteBackend(stack, {
  hostname: 'app.terraform.io',
  organization: 'cdktf',
  workspaces: {
    name: 'cdktf-bug-tfc-errors'
  }
});
app.synth();
