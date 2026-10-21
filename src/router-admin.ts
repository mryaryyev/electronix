import express from "express";
const routerAdmin = express.Router();
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
import makeUploader from "./libs/utils/uploader";

/** Store */
routerAdmin.get("/", storeController.goHome);
routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);
routerAdmin
  .get("/signup", storeController.getSignup)
  .post(
    "/signup",
    makeUploader().single("memberImage"),
    storeController.processSignup,
  );
routerAdmin.get("/logout", storeController.logout);
routerAdmin.get("/check-me", storeController.checkAuthSession);

/** Product */
routerAdmin.get(
  "/product/all",
  storeController.verifyStore,
  productController.getAllProducts,
);
routerAdmin.post(
  "/product/create",
  storeController.verifyStore,
  //uploadProductImage.single('productImage'),
  makeUploader().array("productImages", 5),
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id",
  storeController.verifyStore,
  makeUploader().array("productImages", 5),
  productController.updateChosenProduct,
);

/** User */
routerAdmin.get(
  "/user/all",
  storeController.verifyStore,
  storeController.getUsers,
);

routerAdmin.post(
  "/user/edit",
  storeController.verifyStore,
  storeController.updateChosenUser,
);

/** Order */
routerAdmin.get(
  "/order/all",
  storeController.verifyStore,
  orderController.getAllOrders,
);

export default routerAdmin;
