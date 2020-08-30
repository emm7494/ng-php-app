import { User } from '../user/user.model';
interface AuthData {
  user: User;
  payload?: string;
  jwt?: string;
  publicKey?: string;
}

export interface AuthResponseData {
  message: string;
  data: AuthData[];
  error: string;
}
