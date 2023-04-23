export interface rooms {
    _id: string,
    message_preview: {
        message: string,
        time: string | Date | any
    },
    state: {
        closed: Boolean,
    },
    exist?: Boolean
}

export interface channel {
    agents?:{
        avatar ?: {
            image:string,
            isUrl:Boolean
        },
        _id:string
    }[]
    _id?:string
    name:string
}