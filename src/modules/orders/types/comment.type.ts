import {IUserData} from "../../auth/interfaces/user-data.interface";

export interface IComment {
    user: IUserData;
    comment: string;
    date: Date;
}