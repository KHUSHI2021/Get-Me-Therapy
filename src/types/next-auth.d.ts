//this page only for define some other methods which required
// for our sign in page (options.ts) which prsent default way in next.auth indirectly 


import 'next-auth'
//import { DefaultSession } from 'next-auth';
//import { string } from 'zod'

declare module 'next-auth'{
    interface Session{
        user:{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean;
        username?:string
        } & DefaultSession['user'];
    
        }
    interface User{
    _id?:string;
    isVerified?:boolean;
    isAcceptingMessages?:boolean;
    username?:string

    }
 
}
/* there is another method also for doin above code
*/
declare module 'next-auth/jwt'{
interface JWT {
    _id?:string;
    isVerified?:boolean;
    isAcceptingMessages?:boolean;
    username?:string

}}