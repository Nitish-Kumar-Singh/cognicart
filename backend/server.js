import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from "body-parser";
const Monitor = require('ping-monitor');
dotenv.config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



connectDB();

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cognicart Application",
      description: "E-cart Application with Admin rights",
      contact: {
        name: "Nitish Kumar Singh",
      },
      servers: ["http://localhost:5000", "http://localhost:3000"],
    },
  },
  apis: [
    "backend/server.js",
    "backend/routes/productRoute.js",
    "backend/routes/userRoute.js",
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /books :
 *   get :
 *     summary: Dummy Model
 *     description: GEt all BOoks
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * definitions:
 *  Users:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *
 *     description: name of the User
 *     example: 'Nitish'
 *    email:
 *     type: string
 *     unique: true
 *     description: email of the User
 *     example: 'abc@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '123456'
 *  UsersSignin:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     unique: true
 *     description: email of the User
 *     example: 'nik@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '123'
 *  Products:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of product
 *     example: 'full sleeve'
 *    price:
 *     type: string
 *     description: price
 *     example: '1200'
 *    image:
 *     type: string
 *     description: image
 *     example: '/images/d1.png'
 *    brand:
 *     type: string
 *     description: brand
 *     example: 'Nike'
 *    category:
 *     type: string
 *     description: category
 *     example: 'shirt'
 *    countInStock:
 *     type: string
 *     description: count In Stock
 *     example: '100'
 *    description:
 *     type: string
 *     description: description
 *     example: 'NA'
 */

/**
 * @swagger
 * /api/users/register:
 *  post:
 *   summary: create New User
 *   description: create New User For Application
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: New user
 *      schema:
 *       $ref: '#/definitions/Users'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Users'
 *   responses:
 *    200:
 *     description: success! New User Created
 *    500:
 *     description: Error in creating new User
 *
 */
/**
 * @swagger
 * /api/users/signin:
 *  post:
 *   summary: Sign-In User
 *   description: Signing In
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: Sign-In
 *      schema:
 *       $ref: '#/definitions/UsersSignin'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UsersSignin'
 *   responses:
 *    200:
 *     description: success! Signin
 *    500:
 *     description: Error in Sign-In
 *
 */
/**
 * @swagger
 * /api/products/:
 *  post:
 *   summary: ADD NEW Product
 *   description: ADD NEW Products
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: Sign-In
 *      schema:
 *       $ref: '#/definitions/Products'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Products'
 *   responses:
 *    200:
 *     description: success! Signin
 *    500:
 *     description: Error in Sign-In
 *
 */

/**
 *
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get ALL Products
 *   description: Create User for app
 *   requestBody:
 *    content:
 *     application/json:
 *
 *   responses:
 *    200:
 *     description: Product Fetched Successfully
 *    500:
 *     description: Failed
 *
 */

/**
 * @swagger
 * /api/users/createadmin:
 *  get:
 *   summary: get Admin
 *   description: get Admin info
 *   requestBody:
 *    content:
 *     application/json:
 *   responses:
 *    200:
 *     description: User created
 *    500:
 *     description: Failed
 *
 */

/**
 * @swagger
 * /api/products/{_id}:
 *  get:
 *   summary: get product
 *   description: get product
 *   parameters:
 *    - in: path
 *      name: _id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the product
 *      example: 5fe2eb9c0bb1940ea40b445d
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: Not able to find the product
 */


app.get("/books", (req, res) => {
  res.status(200).send("Result");
});

app.listen(5000, () => {
  console.log("server started at 5000 port");
});

//------------------------------------Ping Method------------------------------------
const myMonitor = new Monitor({
  address: '192.168.1.100',
  port: 5000,
  interval: 5 // minutes
});


myMonitor.on('up', function (res, state) {
  console.log('Yay!! ' + res.address + ':' + res.port + ' is up.');
});


myMonitor.on('down', function (res, state) {
  console.log('Oh Snap!! ' + res.address + ':' + res.port + ' is down! ');
});


myMonitor.on('stop', function (res, state) {
  console.log(res.address + ' monitor has stopped.');
});


myMonitor.on('error', function (error, res) {
  console.log(error);
});


myMonitor.on('timeout', function (error, res) {
  console.log(error);
});


module.exports = app;