import {client} from "../Db.ts"
import { Database } from "../Dependencies.ts"
import User from "../Model/User.ts"



class AuthController{
    
    async register({request,response}:{request:any,response: any}){
        const db = new Database(client)
        db.link([User])
        await db.sync({ drop: true });
        const body = await request.body() 
        const user = body.value
        if(!request.hasBody){
            response.status = 400
        response.body = {
            success: false,
            message: "bad request"
        }
        }else{
            try{
                
                await User.create({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                  });
                response.status = 201
                response.body = {
                    success: true,
                    message: "Sucess registration"
                }
            }catch(err){
                response.status = 500
                response.body = {
                    success: false,
                    message: err.toString()
                }
                console.log(err.toString())
            }finally{
                await client.close();
            }
            
        
        }
    }

}

export const authController =  new AuthController()