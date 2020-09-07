import { User } from '../user/user.model';
interface Payload {
  iss: string;
  aud: string;
  iat: string;
  nbf: string;
  exp: string;
  data: { user_id: string };
}
interface AuthData {
  user: User;
  payload?: Payload;
  jwt?: string;
  publicKey?: string;
}

export interface AuthResponseData {
  message: string;
  data?: AuthData;
  error: boolean;
}
