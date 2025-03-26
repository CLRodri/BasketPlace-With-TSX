export interface User {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    logged: boolean;
}

export type UserEmail = Pick<User,'email'>
export type UserPassword = Pick<User,'password'>
export type UserLogged = Pick<User,'logged'>
export type UserNombre = Pick<User,'nombre'>
export type UserApellido = Pick<User,'apellido'>
export type UserFechaNacimiento = Pick<User,'fechaNacimiento'>