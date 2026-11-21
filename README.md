# Electronix API

Backend of Electronix, an online store for electronics: smartphones, laptops, tablets, smartwatches,
cameras and accessories from six brands. One Express server does two jobs:

- a **REST API** for the [React storefront](https://github.com/mryaryyev/electronix-react), and
- a **server-rendered admin panel** (EJS) where the store owner manages products, orders and customers.

Written in TypeScript with an MVC layout: routers, controllers, service models and Mongoose schemas.

## What it does

- **Products**: list with category, brand, search, sorting and paging; a product page counts each
  member's view once.
- **Orders**: an order is created from the basket with its items; it moves from paused to processed
  to finished, and a processed (paid) order gives the customer a point.
- **Members**: sign up, log in, profile with a photo; a list of the customers with the most points.
- **Admin panel**: an overview with products, customers, a weekly orders chart, low stock and top
  customers; create and edit products; change order and member status.
- **Product photos** are cleaned up on upload with sharp: the background is made white, empty edges
  are trimmed and the product is centered on a square, so every product looks the same size.

## Two kinds of sign-in

| Who | How |
|---|---|
| Customers (storefront) | JWT in a cookie, valid for 24 hours |
| Store owner (admin panel) | Server-side session stored in MongoDB, 10 hours |

## API

| Method and path | What |
|---|---|
| `POST /member/signup`, `/member/login`, `/member/logout` | Account |
| `GET /member/detail`, `POST /member/update` | Profile |
| `GET /member/top-users`, `GET /member/store` | Top customers, store info |
| `GET /product/all`, `GET /product/:id` | Catalogue |
| `POST /order/create`, `GET /order/all`, `POST /order/update` | Orders |
| `/admin/...` | Admin panel pages and actions |

## Run locally

You need Node.js and a MongoDB database.

```bash
npm install
cp .env.example .env      # port, MongoDB address, two secrets
npm run start:dev
```

## Deploy

`npm run build` compiles to `dist/`; on the server PM2 keeps it running:

```bash
./deploy.sh
```

## Project structure

```text
src/
  router.ts, router-admin.ts   routes for the storefront API and the admin panel
  controllers/                 member, product, order, store
  models/                      services: Member, Product, Order, View, Auth
  schema/                      Mongoose schemas: Member, Product, Order, OrderItem, View
  views/                       EJS pages of the admin panel
  libs/                        enums, types, errors, image processing, upload
```

## Stack

TypeScript, Node.js, Express, MongoDB, Mongoose, EJS, JWT, express-session, Multer, sharp, PM2.
