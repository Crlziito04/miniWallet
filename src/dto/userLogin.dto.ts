import { usersDto } from "./userRegister.dto";

export class loginDto implements Pick<usersDto, "password" | "email"> {
  email: string;
  password: string;
}
