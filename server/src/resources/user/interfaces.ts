export interface IUser {
  name: string;
  email: string;
  password: string;
  is_member?: boolean;
  is_admin?: boolean;
}
