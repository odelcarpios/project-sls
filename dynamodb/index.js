const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const config = require('../config.json');

const tableName = config.DYNAMODB_TABLE;

const getProducts = async () => {
    const params = {
        TableName : tableName
    }

    const result = await dynamoDb.scan(params).promise()
    return result
};

const getProduct = async (productId) => {
    const params = {
        Key: {
            id: productId
        },
        TableName : tableName
    }
    const result = await dynamoDb.get(params).promise()
    return result
};

const createProduct = async (product) => {
    const params = {
        TableName : tableName,
        Item: product
    }
    const result = await dynamoDb.put(params).promise()
    return product
};

const deleteProduct = async (productId) => {
    const params = {
        TableName : tableName,
        Key: {
            id: productId
        },
    }
    return await dynamoDb.delete(params).promise()
}

const updateProduct = async (productId, paramsName, paramsValue) => {
    const params = {
        TableName : tableName,
        Key: {
            id: productId
        },
        //ConditionExpression: 'attribute_exists(productId)',
        UpdateExpression: 'set ' + paramsName + ' = :updateValue',
        ExpressionAttributeValues: {
            ':updateValue': paramsValue
        },
        ReturnValues: 'ALL_NEW'
    }

    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}
