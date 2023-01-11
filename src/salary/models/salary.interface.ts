import { User } from "src/user/models/user.interface";

export interface Salary{
    id?: number;
    user_id?: User;
    salary?: number;
    effective_date?: string;

}