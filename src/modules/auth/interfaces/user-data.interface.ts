import { RoleEnum } from '../../../database/enums/role.enum';

export interface IUserData {
  id: number;
  name: string;
  email: string;
  role: RoleEnum;
}
