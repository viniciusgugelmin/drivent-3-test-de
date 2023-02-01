import { responseHandler } from "./responseHandler.js";
import { textInternalError } from "../../../config/texts/index.js";
import { AppError } from "../../../config/errors/AppError/index.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(responseHandler(err));
  }

  console.log("-----------------------------------------------------");
  console.log(err);
  console.log("-----------------------------------------------------");

  res.status(500).send(
    responseHandler({
      message: textInternalError,
      statusCode: 500
    })
  );
}
