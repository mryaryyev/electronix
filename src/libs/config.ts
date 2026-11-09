export const AUTH_TIMER = 24;

/**
 * accessToken cookie options.
 * COOKIE_DOMAIN (e.g. ".electronix.kr") lets the frontend (electronix.kr)
 * read the cookie set by the API (api.electronix.kr). Not set on localhost.
 */
export const getCookieOptions = (maxAge = AUTH_TIMER * 3600 * 1000) => ({
  maxAge,
  httpOnly: false,
  ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
});
export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};
