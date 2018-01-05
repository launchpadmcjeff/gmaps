```
$ aws cloudformation create-stack --region us-west-1 --stack-name lambda-hack --template-body file://./roles-template.json --capabilities CAPABILITY_IAM
{
    "StackId": "arn:aws:cloudformation:us-west-1:737930803050:stack/lambda-hack/22e7c040-cff5-11e7-a4dc-500cc178649a"
}
```


```
$ aws lambda create-function --region us-west-1 --function-name LambdaFunctionOverHttps  --zip-file fileb://./LambdaFunctionOverHttps.zip --role arn:aws:iam::737930803050:role/lambda-hack-LambdaRole-GD1EQ44EF9Q2 --handler LambdaFunctionOverHttps.handler --runtime nodejs6.10
{
    "TracingConfig": {
        "Mode": "PassThrough"
    }, 
    "CodeSha256": "6Y3w+Y/TS/x4LCzYcZC+sT6hcOaPoHAHncAv+bT3ENU=", 
    "FunctionName": "LambdaFunctionOverHttps", 
    "CodeSize": 642, 
    "MemorySize": 128, 
    "FunctionArn": "arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps", 
    "Version": "$LATEST", 
    "Role": "arn:aws:iam::737930803050:role/lambda-hack-LambdaRole-GD1EQ44EF9Q2", 
    "Timeout": 3, 
    "LastModified": "2017-11-23T02:50:52.344+0000", 
    "Handler": "LambdaFunctionOverHttps.handler", 
    "Runtime": "nodejs6.10", 
    "Description": ""
}
```

```
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./echo-payload.json output.txt
{
    "StatusCode": 202
}
```

```
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./ping-payload.json output.txt
{
    "StatusCode": 202
}
```

```
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./create-payload.json output.txt
{
    "StatusCode": 202
}
```

```
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./list-payload.json output.txt
{
    "StatusCode": 202
}
```

```
jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ cat output.txt 

jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./update1-payload.json output.txt
{
    "StatusCode": 202
}

jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ cat output.txt                                                                                                        
jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./update2-payload.json output.txt
{
    "StatusCode": 202
}

jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./update3-payload.json output.txt
{
    "StatusCode": 202
}

jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ cat output.txt                                                                                                        
jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda invoke --invocation-type Event --function-name LambdaFunctionOverHttps --region us-west-1 --payload file://./read-payload.json output.txt
{
    "StatusCode": 202
}

jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ cat output.txt                                                                                                        
```

```
aws apigateway create-rest-api --name DynamoDBOperations --region us-west-1
{
    "name": "DynamoDBOperations", 
    "id": "l1n06zudrd", 
    "createdDate": 1511462288
}
```

```
$ aws apigateway get-resources --rest-api-id l1n06zudrd --region us-west-1
{
    "items": [
        {
            "path": "/", 
            "id": "fp0nk71gzc"
        }
    ]
}
```

```
$ aws apigateway create-resource --rest-api-id l1n06zudrd --parent-id fp0nk71gzc --path-part DynamoDBManager --region us-west-1
{
    "path": "/DynamoDBManager", 
    "pathPart": "DynamoDBManager", 
    "id": "ns6hm6", 
    "parentId": "fp0nk71gzc"
}
```

```
$ aws apigateway put-method --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --authorization-type NONE --region us-west-1
{
    "apiKeyRequired": false, 
    "httpMethod": "POST", 
    "authorizationType": "NONE"
}
```

```
$ aws apigateway put-integration --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --type AWS --integration-http-method POST --uri arn:aws:apigateway:us-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations --region us-west-1
{
    "httpMethod": "POST", 
    "passthroughBehavior": "WHEN_NO_MATCH", 
    "cacheKeyParameters": [], 
    "type": "AWS", 
    "uri": "arn:aws:apigateway:us-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations", 
    "cacheNamespace": "ns6hm6"
}
```



```
$ aws apigateway put-method-response --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --status-code 200 --response-models "{\"application/json\": \"Empty\"}" --region us-west-1
{
    "responseModels": {
        "application/json": "Empty"
    }, 
    "statusCode": "200"
}
```

```
$ aws apigateway put-integration-response --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --status-code 200 --response-templates "{\"application/json\": \"\"}" --region us-west-1
{
    "statusCode": "200", 
    "responseTemplates": {
        "application/json": null
    }
}
```

```
$ aws apigateway create-deployment --rest-api-id l1n06zudrd --stage-name prod --region us-west-1
{
    "id": "3qb0cq", 
    "createdDate": 1511465804
}
```

```
aws lambda add-permission \
--function-name LambdaFunctionOverHttps \
--statement-id apigateway-test-2 \
--action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn "arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/*/POST/DynamoDBManager" \
--region us-west-1
{
    "Statement": "{\"Sid\":\"apigateway-test-2\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/*/POST/DynamoDBManager\"}}}"
}


jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda add-permission --function-name LambdaFunctionOverHttps --statement-id apigateway-test-2 --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/*/POST/DynamoDBManager" --region us-west-1
```

```
aws lambda add-permission \
--function-name LambdaFunctionOverHttps \
--statement-id apigateway-prod-2 \
--action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn "arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/prod/POST/DynamoDBManager" \
--region us-west-1
{
    "Statement": "{\"Sid\":\"apigateway-prod-2\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/prod/POST/DynamoDBManager\"}}}"
}


jeff@yali /cygdrive/c/src/gmaps/aws/ex3
$ aws lambda add-permission --function-name LambdaFunctionOverHttps --statement-id apigateway-prod-2 --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/prod/POST/DynamoDBManager" --region us-west-1
```

```
$ curl -X POST -d "{\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"10\",\"Name\":\"Bobw\"}}}" https://l1n06zudrd.execute-api.us-west-1.amazonaws.com/prod/DynamoDBManager
{}
```

```
$ aws apigateway test-invoke-method --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --path-with-query-string "" --body "{\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"10\",\"Name\":\"Bobw\"}}}" --region us-west-1
{
    "status": 200, 
    "body": "{}", 
    "log": "Execution log for request test-request\nThu Nov 23 20:02:26 UTC 2017 : Starting execution for request: test-invoke-request\nThu Nov 23 20:02:26 UTC 2017 : HTTP Method: POST, Resource Path: /DynamoDBManager\nThu Nov 23 20:02:26 UTC 2017 : Method request path: {}\nThu Nov 23 20:02:26 UTC 2017 : Method request query string: {}\nThu Nov 23 20:02:26 UTC 2017 : Method request headers: {}\nThu Nov 23 20:02:26 UTC 2017 : Method request body before transformations: {\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"10\",\"Name\":\"Bobw\"}}}\nThu Nov 23 20:02:26 UTC 2017 : Endpoint request URI: https://lambda.us-west-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations\nThu Nov 23 20:02:26 UTC 2017 : Endpoint request headers: {x-amzn-lambda-integration-tag=test-request, Authorization=************************************************************************************************************************************************************************************************************************************************************************************************************************e97320, X-Amz-Date=20171123T200226Z, x-amzn-apigateway-api-id=l1n06zudrd, X-Amz-Source-Arn=arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/null/POST/DynamoDBManager, Accept=application/json, User-Agent=AmazonAPIGateway_l1n06zudrd, X-Amz-Security-Token=FQoDYXdzEDUaDPpd2Zx8cGvxJrMdsCK3A+un6QuFpY+ceDaAbw33SEGT8IY4QvgogLnrF4lxfDcX1qEH/+01V3M8dL8231f2oh7feXYYAl+WjZ96hK5HyOAKqZG9pNNZEgAUJ6pcdBC5Y3RQd+lNJYEc74pNuEPZPnmsEluQZH5oFoRszFRzJcMWgvKKgzjQOSN5V/9i34NQNmzAy8jFhvoQEcqUV7bSBk2KJ618etBbwSG/OskvOuM8SoOGpnJUmeGO4cfF2FNzWIyh/Qj9KOi11s2F2WyNyx02d+FL+MxDHxjaZMHX/ubgfk7sxg2DzmZTv0YDxCmSpqBLZp3UdsTMuHWLhgqUnY4oRBX0piWp96Av7 [TRUNCATED]\nThu Nov 23 20:02:26 UTC 2017 : Endpoint request body after transformations: {\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"10\",\"Name\":\"Bobw\"}}}\nThu Nov 23 20:02:26 UTC 2017 : Sending request to https://lambda.us-west-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations\nThu Nov 23 20:02:26 UTC 2017 : Received response. Integration latency: 379 ms\nThu Nov 23 20:02:26 UTC 2017 : Endpoint response body before transformations: {}\nThu Nov 23 20:02:26 UTC 2017 : Endpoint response headers: {x-amzn-Remapped-Content-Length=0, Connection=keep-alive, x-amzn-RequestId=3a0f2f86-d089-11e7-a25c-5fd308164362, Content-Length=2, Date=Thu, 23 Nov 2017 20:02:26 GMT, X-Amzn-Trace-Id=root=1-5a172952-dd00fc8f7566c452322f4c33;sampled=0, Content-Type=application/json}\nThu Nov 23 20:02:26 UTC 2017 : Method response body after transformations: {}\nThu Nov 23 20:02:26 UTC 2017 : Method response headers: {X-Amzn-Trace-Id=sampled=0;root=1-5a172952-dd00fc8f7566c452322f4c33, Content-Type=application/json}\nThu Nov 23 20:02:26 UTC 2017 : Successfully completed execution\nThu Nov 23 20:02:26 UTC 2017 : Method completed with status: 200\n", 
    "latency": 400, 
    "headers": {
        "X-Amzn-Trace-Id": "sampled=0;root=1-5a172952-dd00fc8f7566c452322f4c33", 
        "Content-Type": "application/json"
    }
}

```

```
$ aws apigateway test-invoke-method --rest-api-id l1n06zudrd --resource-id ns6hm6 --http-method POST --path-with-query-string "" --body "{\"operation\":\"echo\",\"payload\":{\"somekey1\":\"somevalue1\",\"somekey2\":\"somevalue2\"}}" --region us-west-1
{
    "status": 200, 
    "body": "\"Success\"", 
    "log": "Execution log for request test-request\nThu Nov 23 20:05:36 UTC 2017 : Starting execution for request: test-invoke-request\nThu Nov 23 20:05:36 UTC 2017 : HTTP Method: POST, Resource Path: /DynamoDBManager\nThu Nov 23 20:05:36 UTC 2017 : Method request path: {}\nThu Nov 23 20:05:36 UTC 2017 : Method request query string: {}\nThu Nov 23 20:05:36 UTC 2017 : Method request headers: {}\nThu Nov 23 20:05:36 UTC 2017 : Method request body before transformations: {\"operation\":\"echo\",\"payload\":{\"somekey1\":\"somevalue1\",\"somekey2\":\"somevalue2\"}}\nThu Nov 23 20:05:36 UTC 2017 : Endpoint request URI: https://lambda.us-west-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations\nThu Nov 23 20:05:36 UTC 2017 : Endpoint request headers: {x-amzn-lambda-integration-tag=test-request, Authorization=************************************************************************************************************************************************************************************************************************************************************************************************************************aae954, X-Amz-Date=20171123T200536Z, x-amzn-apigateway-api-id=l1n06zudrd, X-Amz-Source-Arn=arn:aws:execute-api:us-west-1:737930803050:l1n06zudrd/null/POST/DynamoDBManager, Accept=application/json, User-Agent=AmazonAPIGateway_l1n06zudrd, X-Amz-Security-Token=FQoDYXdzEDUaDLBWxanRoW3XWJnGuiK3AyfnD1RPDO1TJbfvLuG7hsKiMILZ74W4A2OHrPoJeUTtiFcK58CO1H7e5cm7LDXj36rD0MCFDK5BiI7pH3SlkXYfbaFmoSFVvzy0SZ+HjoxPm43hqscG2aiMG/lRFtatAfA1rSazg8LLqiHrCSdONFD0mSgsA4TttjFX0UksfVALOax5UZ0adugamQZ1sYYo2hycsfJ0jlQg7dQ5q8UhepCaN507BVDfURvqYB4ei9fpKGcxxvTtCmo6nGnhtfo0aZPgPU6RsMp1XKd9YM8LmisQOGqG08pdKdADgLNJa+t+uuHQXlNAFIQBGfioxDhB+R1DeZtZcWrxhD6HQ [TRUNCATED]\nThu Nov 23 20:05:36 UTC 2017 : Endpoint request body after transformations: {\"operation\":\"echo\",\"payload\":{\"somekey1\":\"somevalue1\",\"somekey2\":\"somevalue2\"}}\nThu Nov 23 20:05:36 UTC 2017 : Sending request to https://lambda.us-west-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-west-1:737930803050:function:LambdaFunctionOverHttps/invocations\nThu Nov 23 20:05:36 UTC 2017 : Received response. Integration latency: 69 ms\nThu Nov 23 20:05:36 UTC 2017 : Endpoint response body before transformations: \"Success\"\nThu Nov 23 20:05:36 UTC 2017 : Endpoint response headers: {x-amzn-Remapped-Content-Length=0, Connection=keep-alive, x-amzn-RequestId=aba78a1e-d089-11e7-bfef-e9d1aeb7c56e, Content-Length=9, Date=Thu, 23 Nov 2017 20:05:36 GMT, X-Amzn-Trace-Id=root=1-5a172a10-40e79ffd14035fd4a8b1b489;sampled=0, Content-Type=application/json}\nThu Nov 23 20:05:36 UTC 2017 : Method response body after transformations: \"Success\"\nThu Nov 23 20:05:36 UTC 2017 : Method response headers: {X-Amzn-Trace-Id=sampled=0;root=1-5a172a10-40e79ffd14035fd4a8b1b489, Content-Type=application/json}\nThu Nov 23 20:05:36 UTC 2017 : Successfully completed execution\nThu Nov 23 20:05:36 UTC 2017 : Method completed with status: 200\n", 
    "latency": 87, 
    "headers": {
        "X-Amzn-Trace-Id": "sampled=0;root=1-5a172a10-40e79ffd14035fd4a8b1b489", 
        "Content-Type": "application/json"
    }
}

```

```
$ curl -X POST -d "{\"operation\":\"echo\",\"payload\":{\"somekey1\":\"somevalue1\",\"somekey2\":\"somevalue2\"}}" https://l1n06zudrd.execute-api.us-west-1.amazonaws.com/prod/DynamoDBManager
"Success"
```
















