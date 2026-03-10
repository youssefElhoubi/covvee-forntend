type Visibility = 'PUBLIC' | 'PRIVATE';

type Language = 'PYTHON' | 'JAVA' | 'JS';


export type CreateProjectRequest ={
    name ?:string 
    Language:Language
    Visibility:Visibility
    description?:string
}