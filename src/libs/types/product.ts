import { ObjectId } from "mongoose";
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productBrand: ProductBrand;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSpecs?: Record<string, any>;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  productBrand?: ProductBrand;
  search?: string;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCategory: ProductCategory;
  productBrand: ProductBrand;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSpecs?: Record<string, any>;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productBrand?: ProductBrand;
  productName?: string;
  productPrice?: number;
  productLeftCount?: number;
  productSpecs?: Record<string, any>;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
