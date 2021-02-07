import { client } from "../Db.ts";
import { Database } from "../Dependencies.ts";
import User from "../Model/User.ts";

let db = new Database(client);
db.link([User]);
await db.sync();

class AuthController {

  async register({ request, response }: { request: any; response: any }) {
    let body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "bad request",
      };
      return;
    }

    let user: any;

    if (body.type === "form-data") {
      user = await body.value.read();
    } else {
      user = await body.value;
    }

    try {
      if (body.type === "form-data") {
        await User.create({
          username: user.fields.username,
          email: user.fields.email,
          password: user.fields.password,
        });
      } else {
        await User.create({
          username: user.username,
          email: user.email,
          password: user.password,
        });
      }

      response.status = 201;
      response.body = {
        success: true,
        message: "register success",
      };
    } catch (err) {
      response.status = 500;
      response.body = {
        success: false,
        message: err.toString(),
      };
      console.log(err.toString());
    } finally {
      await db.close();
    }
  }

  async login({ request , response} : {request : any, response: any}){

    let body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "bad request",
      };
      return;
    }

    let user: any;

    if (body.type === "form-data") {
      user = await body.value.read();
    } else {
      user = await body.value;
    }

    try{
      let usrname: any;
      let pass: any;
      if (body.type === "form-data") {
        usrname = user.fields.username;
        pass = user.fields.password;
      } else {
        usrname = user.username;
        pass = user.password;
      }

      let gainedUser = await User.select("id","username","password")
                                  .where("username", "=",usrname)
                                  .where("password","=",pass)
                                  .get();
      
      if(gainedUser.length === 1){
        response.status = 200;
        response.body = {
          success: true,
          message: "Logged in successfully",
        };
      }else{
        response.status = 200;
        response.body = {
          success: false,
          message: "Error please verify your username or password.",
        };
      }
      

    }catch(err){
      response.status = 500;
      response.body = {
        success: false,
        message: err.toString(),
      };
      console.log(err.toString());
    } finally {
      await db.close();
    }


  }

}

export const authController = new AuthController();
