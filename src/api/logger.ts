import { Request, ResponseToolkit } from "@hapi/hapi";

export function validationError(request: Request, h: ResponseToolkit, err: any) {
  console.log(err.message);
}
