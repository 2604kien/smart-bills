export enum Role{
    member="member",
    admin="admin",
    user="user",
}

export namespace Role{
    export function all():Role[]{
        return Object.keys(Role).map(key=>Role[key]);
    }
}