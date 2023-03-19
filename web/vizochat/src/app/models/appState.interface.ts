import { AuthenticationStateInterface } from "../routes/auth-app/models/authentication.stateInterface";
import { UserAppStateInterface } from "../routes/user-app/models/userApp.stateInterface";

export interface appStateInterface {
    authentication:AuthenticationStateInterface,
    userApp: UserAppStateInterface,
}