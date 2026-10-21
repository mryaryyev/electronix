import multer from "multer";

const makeUploader = () => {
  return multer({ storage: multer.memoryStorage() });
};

export default makeUploader;

/*
const product_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_name = v4() + extension;
    cb(null, random_name);
  },
});

export const uploadProductImage = multer({storage: product_storage})
*/
