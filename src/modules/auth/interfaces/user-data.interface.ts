import { RoleEnum } from '../../../database/enums/role.enum';

export interface IUserData {
  id: number;
  email: string;
  role: RoleEnum;
}
