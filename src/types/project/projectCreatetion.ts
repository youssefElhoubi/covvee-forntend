type Visibility = 'PUBLIC' | 'PRIVATE';

type Language = 'PYTHON' | 'JAVA' | 'JAVASCRIPT';


export type CreateProjectRequest ={
    name ?:string 
    Language:Language
    Visibility:Visibility
    description?:string
}