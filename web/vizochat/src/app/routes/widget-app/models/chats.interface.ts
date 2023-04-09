
export interface chats{
    user:{
        user_id: user|null, 
        user_type:string, //'agent'|'wUser' 
    },
    message:{
        message:string,
        message_type:string, //'text'|'image'
    },
}
interface user{
    name:string
    username:string
    avatar:{
        image:string
        isUrl:boolean
    }
}