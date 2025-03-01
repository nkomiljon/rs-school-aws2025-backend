const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');

class Task4Stack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const getProductsListFunction = new lambda.Function(
      this,
      "getProductsList",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "getProductsList.handler", 
        code: lambda.Code.fromAsset("lambda"), 
      }
    );

    // Create API Gateway
    const api = new apigateway.RestApi(this, "ProductServiceAPI", {
      restApiName: "Product Service",
      description: "API for Product Service",
    });

    // Create /products endpoint
    const productsResource = api.root.addResource("products");
    productsResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsListFunction)
    );
  }
}

module.exports = { Task4Stack }
