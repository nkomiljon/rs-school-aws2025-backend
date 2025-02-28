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

    const stage = props?.stage || "dev";

    // Define Products Lambda functions
    const productsFunction = new lambda.Function(this, `getProducts-${stage}`, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "products.handler",
      code: lambda.Code.fromAsset("lambda/products"),
      timeout: Duration.seconds(10),
      memorySize: 256,
    });

    const productsByIdFunction = new lambda.Function(
      this,
      `getProductsById-${stage}`,
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "products.handler",
        code: lambda.Code.fromAsset("lambda/products"),
        timeout: Duration.seconds(10),
        memorySize: 256,
      }
    );

    // Create API Gateway and connect it to the Lambda function
    const apiProducts = new apigateway.LambdaRestApi(
      this,
      `products-api-${stage}`,
      {
        restApiName: "Products Service",
        description: "This is the products service API",
        defaultCorsPreflightOptions: {
          allowOrigins: apigateway.Cors.ALL_ORIGINS,
          allowMethods: apigateway.Cors.ALL_METHODS,
        },
        deployOptions: {
          stageName: stage, // Use the stage variable for the API Gateway stage
        },
        handler: productsFunction,
        proxy: false, // Disable proxy to define specific routes
      }
    );

    // Define an endpoint for GET /products
    const productsResource = apiProducts.root.addResource("products");
    productsResource.addMethod("GET"); // HTTP GET method

    // Create API Gateway and connect it to the Lambda function
    const apiProductsById = new apigateway.LambdaRestApi(
      this,
      `{id}`,
      {
        restApiName: "ProductsById Service",
        description: "This is the products by id service API",
        defaultCorsPreflightOptions: {
          allowOrigins: apigateway.Cors.ALL_ORIGINS,
          allowMethods: apigateway.Cors.ALL_METHODS,
        },
        deployOptions: {
          stageName: stage, // Use the stage variable for the API Gateway stage
        },
        handler: productsByIdFunction,
        proxy: false, // Disable proxy to define specific routes
      }
    );

    // Define an endpoint for GET /products
    const productsByIdResource = apiProductsById.root.addResource("products-by-id");
    productsByIdResource.addMethod("GET"); // HTTP GET method
  }
}

module.exports = { Task4Stack }
