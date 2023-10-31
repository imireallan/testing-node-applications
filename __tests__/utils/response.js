export default class Response {
  status(status) {
    this.status = status;
    return this;
  }
  json(data) {
    this.data = data;
  }
}
