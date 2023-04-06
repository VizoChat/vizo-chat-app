export interface chats {
    user:{
        user_id:user
        user_type:string
    },
    message:{
        
        message:string
        message_type:string
    },
    channel:string,
    chat_room: string,
    created_at:string|Date,
}

 interface user{
    name: string, 
    username: string, 
    _id: string, 
    avatar: {
        image:string,
        isUrl:boolean
    } 
}