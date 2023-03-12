

import { UserModelInterface } from './user.interface';
export interface GlobalStateInterface {
  isLoading: boolean;
  error: string | null;
  user: UserModelInterface | null;
  isLoggedIn: boolean;
  token: string | null;
}
export interface AdminGlobalStateInterface {
  isLoading: boolean;
  error: string | null;
  user: UserModelInterface | null;
  isLoggedIn: boolean;
  token: string | null;
}