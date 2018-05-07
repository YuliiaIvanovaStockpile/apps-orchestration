export class StatusMessage {
  constructor(status_code, message, description){
    this.status_code = status_code;
    this.message = message;
    this.description = description || message;
  }
}
