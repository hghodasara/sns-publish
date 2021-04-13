// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const payload = {
  type: "SignupVerification",
  data: {
    email: "hghodasara@codal.com",
    verificationCode: "452178",
  },
};

// Create publish parameters
var params = {
  Message: JSON.stringify(payload) /* required */,
  TopicArn: "TOPIC_ARN",
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
  .publish(params)
  .promise();

// Handle promise's fulfilled/rejected states
publishTextPromise
  .then(function (data) {
    console.log(
      `Message ${params.Message} sent to the topic ${params.TopicArn}`
    );
    console.log("MessageID is " + data.MessageId);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
