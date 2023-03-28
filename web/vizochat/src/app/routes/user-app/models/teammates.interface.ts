export interface teammateForm {
    username?:string,
    name:string,
    email:string & { __brand: 'email' },
    password:string,
    repassword:string
}