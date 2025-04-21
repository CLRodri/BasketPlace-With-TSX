export interface Post {
    titulo: string;
    texto: string;
    fechaPublicacion: string;
    autor: string;
}

export type PostTitulo= Pick<Post,'titulo'>
export type PostTexto = Pick<Post,'texto'>
export type PostAutor = Pick<Post,'autor'>
export type PostFechaPublicacion = Pick<Post,'fechaPublicacion'>
