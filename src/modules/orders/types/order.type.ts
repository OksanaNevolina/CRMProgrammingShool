import {IComment} from "./comment.type";
import {GroupsEntity} from "../../../database/entities/groups.entity";

export interface IOrder{
    id: number;
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    course: string | null;
    course_format: string | null;
    course_type: string | null;
    sum: number | null;
    alreadyPaid: number | null;
    created_at: Date | null;
    utm: string | null;
    msg: string | null;
    status: string | null;
    manager: string | null;
    group: GroupsEntity | null;
    comments?: IComment[];
}
