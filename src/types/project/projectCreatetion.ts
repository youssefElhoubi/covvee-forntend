type Visibility = 'PUBLIC' | 'PRIVATE';

type Language = 'PYTHON' | 'JAVA' | 'JAVASCRIPT';


export type CreateProjectRequest ={
    name ?:string 
    language:Language
    visibility:Visibility
    description?:string
}