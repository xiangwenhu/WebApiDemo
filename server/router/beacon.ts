import { Router } from "express";
import getRawBody from "raw-body";
const multipart = require("connect-multiparty");

const route: Router = Router();

route.post("/urlencoded", async (req, res) => {
  const { body } = req;

  console.log("beacon body:", JSON.stringify(body));
  // res.json({
  //   errCode: 0,
  //   data: body
  // });
  res.write("ok");
});

route.post("/text", async (req, res, next) => {
  getRawBody(
    req,
    {
      encoding: "utf-8"
    },
    function(err, content) {
      // req.text = content
      console.log("beacon:text", content);
      res.write("ok");
    }
  );
});

const multipartMiddleware = multipart();
route.post("/formdata", multipartMiddleware, async (req, res, next) => {
  console.log("beacon:formdata", req.body);
});

export default route;
