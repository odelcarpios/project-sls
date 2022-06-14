"use strict";
const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoModule = require('../dynamodb');

function createResponse(statusCode, message){
  return{
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getProducts = async (event) => {
  const response = await dynamoModule.getProducts();
  return createResponse(200, response);
};

module.exports.getProduct = async (event) => {  
  const productId = event.pathParameters.id;
  const response = await dynamoModule.getProduct(productId);
  return createResponse(200, response);
};

module.exports.createProduct = async (event) => {  
  const { description, price } = JSON.parse(event.body);
  const createdAt = Date()
  const id = v4()

  const newProduct = {
    id,
    description,
    price,
    createdAt
  };

  const response = await dynamoModule.createProduct(newProduct);
  return createResponse(200, response);
};

module.exports.deleteProduct = async (event) => {  
  const { productId } = JSON.parse(event.body);
  const response = await dynamoModule.deleteProduct(productId);
  return createResponse(200, "Product Deleted.");
};

module.exports.updateProduct = async (event) => {  
  const productId = event.pathParameters.id;
  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValue = body.paramValue;
  const response = await dynamoModule.updateProduct(productId, paramName, paramValue);
  return createResponse(200, response);
};