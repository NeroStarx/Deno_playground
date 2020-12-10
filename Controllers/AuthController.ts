import {client} from "../Db.ts"

class AuthController{

    async register({request,response}:{request:any,response: any}){
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
                await client.connect()
                const result = await client.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)"
                ,user.username,user.email,user.password)
                response.status = 201
                response.body = {
                    success: true,
                    message: "Sucess registration"
                }
            }catch(err){
                response.status = 500
                response.body = {
                    success: true,
                    message: "err.toString()"
                }
            }finally{
                await client.end();
            }
            
        
        }
    }

}

export const authController =  new AuthController()