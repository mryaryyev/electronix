import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput, LoginInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductService from "../models/Product.service";
import OrderService from "../models/Order.service";
import { ProductStatus } from "../libs/enums/product.enum";
import { processAndSaveImage } from "../libs/utils/imageProcessor";

// BSSR

const memberService = new MemberService();
const productService = new ProductService();
const orderService = new OrderService();

const storeController: T = {};

storeController.goHome = async (req: AdminRequest, res: Response) => {
  try {
    console.log("goHome");

    const member = req.session?.member;

    if (!member) {
      return res.render("home", {});
    }

    const products = await productService.getAllProducts();
    const users = await memberService.getUsers();
    const todayOrders = await orderService.getTodayOrders();
    const revenueToday = todayOrders.reduce((sum, o) => sum + o.orderTotal, 0);

    const lowStockProducts = products
      .filter(
        (p) =>
          p.productStatus === ProductStatus.PROCESS && p.productLeftCount <= 5,
      )
      .sort((a, b) => a.productLeftCount - b.productLeftCount)
      .slice(0, 3);

    const allOrders = await orderService.getAllOrders();
    const recentOrders = allOrders.slice(0, 4);

    const topCustomers = await memberService.getTopUsers();

    res.render("home", {
      products,
      users,
      todayOrders,
      revenueToday,
      weeklyChart: [
        { label: "Mon", pct: 40 },
        { label: "Tue", pct: 62 },
        { label: "Wed", pct: 48 },
        { label: "Thu", pct: 78 },
        { label: "Fri", pct: 55 },
        { label: "Sat", pct: 90 },
        { label: "Sun", pct: 70 },
      ],
      lowStockProducts,
      recentOrders,
      topCustomers,
    });
  } catch (err) {
    console.log("Error, goHome:", err);
    res.redirect("/admin");
  }
};

storeController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/admin");
  }
};

storeController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
  }
};

storeController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    console.log(req.body);
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = await processAndSaveImage(
      file.buffer,
      file.originalname,
      "members",
      { width: 300, height: 300, fit: "cover" },
    );
    newMember.memberType = MemberType.STORE;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`,
    );
  }
};

storeController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, processLogin:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`,
    );
  }
};

storeController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

storeController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result:", result);

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

storeController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

storeController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.send(err);
  }
};

storeController.verifyStore = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.STORE) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`,
    );
  }
};

export default storeController;
