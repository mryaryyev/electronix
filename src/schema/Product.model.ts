import mongoose, { Schema } from "mongoose";
import {
  ProductCategory,
  ProductBrand,
  ProductStatus,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      required: true,
    },

    productBrand: {
      type: String,
      enum: ProductBrand,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productLeftCount: {
      type: Number,
      required: true,
    },

    productSpecs: {
      type: Object,
      default: {},
    },

    productDesc: {
      type: String,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // updatedAt, createdAt
);

productSchema.index({ productName: 1, productBrand: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
