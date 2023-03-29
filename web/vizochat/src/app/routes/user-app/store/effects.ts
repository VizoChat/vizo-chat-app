import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { ApiService } from "../services/api.service"; 
import * as UserAppActions from './actions'

@Injectable()
export class userAppEffects {
    constructor(private action$:Actions, private api:ApiService, private authService:AuthService, private store:Store){}
    getUser$ = createEffect(()=>
        this.action$.pipe(
            ofType(UserAppActions.getUser),
            mergeMap(()=>{
                return this.api
                .getUserData()
                .pipe(
                    map((data)=>{
                        
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.gotUser({user:data.data.userData})
                        }else{
                            this.authService.refreshAccessToken('user',()=>{
                                this.store.dispatch(
                                    UserAppActions.getUser()
                                )
                            })
                            return UserAppActions.errorGettingUser({error:data.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( UserAppActions.errorGettingUser({error:'Something went wrong!'}))
                    )  
                )
            })
        )
    )


    $newChannel = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.newChannel),
            mergeMap((action:any)=>{
                return this.api
                .newChannel(action)
                .pipe(
                    map((data)=>{
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.createdChannel({successMessage:data.message})
                        }else{
                            return UserAppActions.errorChannel({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorChannel({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    })


    $editChannel = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.editChannel),
            mergeMap((action:any)=>{
                return this.api
                .editChannel(action)
                .pipe(
                    map((data)=>{
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.editedChannel({successMessage:data.message})
                        }else{
                            return UserAppActions.errorEditingChannel({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorEditingChannel({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    })

    $deleteChannel = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.delChannels),
            mergeMap((action:any)=>{
                return this.api
                .delChannel({channel_id:action.channel_id})
                .pipe(
                    map((data)=>{
                        
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.deletedChannels({successMessage:data.message})
                        }else{
                            return UserAppActions.errorDeletingChannels({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorDeletingChannels({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    })

    $getChannels = createEffect(()=>
        this.action$.pipe(
            ofType(UserAppActions.getChannels),
            mergeMap(()=>{
                return this.api
                .getChannels()
                .pipe(
                    map((data)=>{
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.gotChannels({ channels:data.data.channels})
                        }else{
                            return UserAppActions.errorGettingChannels({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorGettingChannels({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    )

    $getChatRooms = createEffect(()=>
        this.action$.pipe(
            ofType(UserAppActions.getChatRooms),
            mergeMap((action:any)=>{
                return this.api
                .getChatRooms(action.channel_id)
                .pipe(
                    map((data)=>{
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.gotChatRooms({ rooms:data.data.chat_rooms})
                        }else{
                            return UserAppActions.errorGettingChatRooms({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorGettingChatRooms({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    )

    $newTeammate = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.newTeammate),
            mergeMap((data:any)=>{
                return this.api.newTeammate(data)
                .pipe(
                    map((res)=>{
                        if(res.status=='ok'  && res.authorization==true){
                            return UserAppActions.createdTeammate({successMessage:res.message})
                        }else{
                            return UserAppActions.errorCreatingTeammate({errorMessage:res.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorCreatingTeammate({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    })
    $getTeammates = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.getTeammates),
            mergeMap(()=>{
                return this.api.getTeammates()
                .pipe(map((res:any)=>{
                    console.log(res);
                    if(res.status=='ok'  && res.authorization==true){
                        return UserAppActions.gotTeammates({Teammates:res.data.teammates})
                    }else{
                        return UserAppActions.errorGettingTeammates({errorMessage:res.message})
                    }
                }),
                catchError((err)=>{
                    return of(UserAppActions.errorGettingTeammates({errorMessage:'Something went wrong!'}))
                })
                )
            })
        )
    })
}
