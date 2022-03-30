export interface IErrorResponse {
  data: {
    message: string,
    errors: Array<string>
  }
}
