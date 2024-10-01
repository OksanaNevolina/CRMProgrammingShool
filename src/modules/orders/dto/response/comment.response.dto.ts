import {IUserData} from "../../../auth/interfaces/user-data.interface";

export interface ICommentPesponseDto {
    id: number;
    user: IUserData;
    comment: string;
    date: string;
}