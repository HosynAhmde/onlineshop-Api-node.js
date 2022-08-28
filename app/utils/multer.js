const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const fs = require("fs");
function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const day = date.getMonth().toString();
  const month = date.getMonth().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "blog",
    "upload",
    year,
    month,
    day
  );
  req.body.fileuploudpath = path.join("blog", "upload", year, month, day);

  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = String(new Date().getTime() + ext);
    req.body.filename = filename;
    cb(null, filename);
  },
});
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimtype = [".jpg", ".jpeg", ".webp", ".png"];
  if (mimtype.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده صحیح نمیباشد"));
}
const maxSize = 2 * 1000 * 1000;
const uplodFile = multer({
  storage,
  fileFilter,
  limits: { fieldSize: maxSize },
});

module.exports = { uplodFile };
