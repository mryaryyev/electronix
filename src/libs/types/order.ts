import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";
import { Member } from "./member";

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  /** from aggretations */
  orderItems: OrderItem[];
  productData: Product[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId;
  orderId?: ObjectId;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}

// Added after Admin UI addition
export interface AdminOrder extends Order {
  memberData: Member[];
}

export interface OrderItemView {
  productName: string;
  itemPrice: number;
  itemQuantity: number;
  itemTotal: number;
}

export interface OrderView {
  _id: ObjectId;
  memberNick: string;
  orderTotal: number;
  orderStatus: OrderStatus;
  items: OrderItemView[];
}
