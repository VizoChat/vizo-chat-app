export interface chats {
    user:{
        user_id:user|null
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
export interface chatRooms {
    w_user: {
        username: string,
        user_id:string,
        channel:string,
        email:string,
        additional_data:string,
        page_history:{url:string,time:string}[],
        joined:string,
    },
    message_preview: {
        newMessageCount:number
        topic: string,
        message: string,
        time: string
    },
    _id: string,
    state:{
        closed:Boolean, 
    },
    channel: {
        _id: string,
        name: string
    } | null,
    dashboard: string,
    created_at: string,
    last_updated: string,
}