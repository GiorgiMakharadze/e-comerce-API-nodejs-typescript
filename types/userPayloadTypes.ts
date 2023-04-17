export interface IUserPayload {
  id: string;
  email: string;
  role: string;
  payload: { [key: string]: any };
}
