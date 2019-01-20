// interfaces
export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?: RoleAccount;
    created?: Date;
    updated?: Date;
}

export interface IMember {
    items: IAccount[];
    totalItems: number;
}

export enum RoleAccount {
    Member = 1,
    Employee,
    Admin
}

export interface IRequest {
    url: string;
}