const SES = require('aws-sdk').SES;


exports.handler = (event, context, callback) => {
  console.log(event.Records[0].Sns.Message)
  let c = event.Records[0].Sns.Message
  var obj = JSON.parse(c)
  console.log("type is>>")
  console.log(typeof obj);
  const values = Object.values(obj)
  console.log("here is >>")
  console.log(values[0])
  let Source = "bills@prod.pareenkarpe.me"
  let ToAddresses = values[0]

  if(values[2] == 'r')
  {
    return;
  }

  let subject = event.subject || 'Test email subject77';
  if (typeof ToAddresses === 'string') {
    ToAddresses = [ToAddresses];
  }

  const Charset = 'UTF-8';
  // needs ses:SendEmail permission
  new SES().sendEmail({
    Destination: {ToAddresses},
    Message: {
      Body: {
        Html: {
          Charset,
          Data: values[1]
        },
        Text: {
          Charset,
          Data: "This message is in text format7777."
        }
      },
      Subject: {
        Charset,
        Data: subject
      }
    },
    Source
  }, callback);
};