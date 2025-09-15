export class ControllerResponse<T> {
  statusCode: number;
  message: string;
  errDetails: string | null;
  data: T;
  constructor(
    statusCode: number,
    message: string,
    errDetails: string | null,
    data: T
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.errDetails = errDetails;
    this.data = data;
  }
}
