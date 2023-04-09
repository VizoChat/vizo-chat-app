import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ApiService } from "../services/api.service";
import * as widgetActions from './actions'
@Injectable()
export class widgetAppEffects {
    constructor(private action$:Actions, private api:ApiService, private router: Router){}
    getChatRooms$ = createEffect(()=>
        this.action$.pipe(
            ofType(widgetActions.getChatRooms),
            mergeMap((action)=>
                this.api
                .getChatRooms(action.data)
                .pipe(
                    map((res:any)=>{
                        if(res.status=='ok' ){
                            return widgetActions.gotChatRooms({rooms:res.data.rooms})
                        }else{
                            return widgetActions.errorOnChatsRoom({error:res.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( widgetActions.errorOnChatsRoom({error:'Something went wrong!'}))
                    ) 
                )
            )
        )

    )


    newWidgetUser$ = createEffect(()=>
        this.action$.pipe(
            ofType(widgetActions.newWUser),
            mergeMap((action)=>
                this.api
                .newWUser(action.data)
                .pipe(
                    map((res)=>{
                        if(res.status=='ok' ){
                            console.log(res);
                            
                            return widgetActions.createWUser()
                        }else{
                            return widgetActions.errorOnChatsRoom({error:res.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( widgetActions.errorOnChatsRoom({error:'Something went wrong!'}))
                    ) 
                )
            )
        )

    )
    newChatRoom$ = createEffect(()=>
        this.action$.pipe(
            ofType(widgetActions.newChatRoom),
            mergeMap((action)=>
                this.api
                .newChatRoom(action.data)
                .pipe(
                    map((res)=>{
                        if(res.status=='ok' ){
                            this.router.navigate(['/widget', action.data.apiKey,'chat',res.data.new_room._id,action.data.ds_key ]);
                            
                            return widgetActions.createdChatRoom({newData:res.data.new_room})
                        }else{
                            return widgetActions.errorOnChatsRoom({error:res.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( widgetActions.errorOnChatsRoom({error:'Something went wrong!'}))
                    ) 
                )
            )
        )

    )


    getChats$ = createEffect(()=>
        this.action$.pipe(
            ofType(widgetActions.getChats),
            mergeMap((action)=>
                this.api
                .getChats(action.data)
                .pipe(
                    map((res)=>{
                        if(res.status=='ok' ){
                            // this.router.navigate(['/widget', action.data.apiKey,'chat',res.data.new_room._id]);
                            console.log(res);
                            
                            return widgetActions.gotChats({chats:res.data.chats})
                        }else{
                            return widgetActions.errorOnChatsRoom({error:res.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( widgetActions.errorOnChatsRoom({error:'Chats couldn\'t be fetched!'}))
                    ) 
                )
            )
        )

    )

}