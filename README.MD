# Project Title

## E-Commerce API

## Description

This is a REST API application for an e-commerce website that provides endpoints for managing products, orders, and reviews, as well as JWT authentication for user Registration and login.

## Used Technologies

In this build, I used Node.js, Express.js, MongoDB, Mongoose, TypeScript, Morgan, Dotenv, Cookie-parser, JSON Web Token (JWT), bcrypt and etc.

## How to install

Download and run npm install, then create a .env file at the root of the project and set the following environment variables:

```bash
PORT=
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
IMAGE_MAX_SIZE=
```

Mongo uri example:

```bash
MONGO_URI=mongodb+srv://giorgi:yourClusterPassword@yourClusterName.zi9vxpj.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

then run npm start.

## API Reference

![My Remote Image](https://res.cloudinary.com/dfgagmhpp/image/upload/v1681940403/e-comerce-api-readme/api-1_uzgr0v.png)
![My Remote Image](https://res.cloudinary.com/dfgagmhpp/image/upload/v1681940403/e-comerce-api-readme/api-2_y7wmnr.png)
![My Remote Image](https://res.cloudinary.com/dfgagmhpp/image/upload/v1681940404/e-comerce-api-readme/api-3_y0p5qt.png)

### Important

To Make any http request you first need to register and log in! There are routes that accessible to only admins!

### Admin routes

### Create Product

```http
   POST /api/v1/products
```

### Update Product

```http
   PATCH /api/v1/products/:id
```

### Delete Product

```http
   DELETE /api/v1/products/:id
```

### Orders

### Get All Orders

```http
   GET /api/v1/orders
```
