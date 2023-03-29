export interface teammateForm {
    username?:string,
    name:string,
    email:string & { __brand: 'email' },
    password:string,
    repassword:string
}
export interface teammates{
        _id:string
        username: string,
        name: string,
        email: string,
        emailVerified:boolean,
        avatar: {
            image:string,
            isUrl:boolean,
        },
        accessTo:{
            chatView:boolean,
            chatWrite:boolean,
            liveVisitorsView:boolean,
        },
        dashboard:string, 
        joined:   string,
        state:{
            blocked:boolean
        }
}