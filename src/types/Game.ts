import {User} from "./User";

export type Game = {
    id:number,
    name:string,
    started:boolean,
    users : User[]
}