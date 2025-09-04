export class ControllerResponse {
  statusCode: number;
  message: string;
  data: Object | string;
  constructor(statusCode: number, message: string, data: Object | string) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
