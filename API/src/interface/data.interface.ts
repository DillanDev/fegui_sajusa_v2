export interface DataI{
    
    name: string, 
    surname: string, 
    gender: string,
    email: string,
    password: string, 
    telephone: string,
    role: string,
    status:string,
    city: string,
    region: string,
    zip: string
}

export interface ResponseI{
    status: any,
    locals: any,
    json:any
}
