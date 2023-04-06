export interface channels  {   
    _id:string
    dashboard:String | null
    name:String | null
    domain:String | null
    created:String | null
    status:String | null
    agents:{
        avatar:{
            image:string,
            isUrl:boolean
        }
        name:String | null
        email:String | null 
        username:String | null 
        _id:String | null
    }[]
}