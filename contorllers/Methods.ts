

export const CreateFun = ({request ,response}
    :{request : {message : String, number:Number},response: any}) => {
   
        response.status = 200
        response.body = {
            success : true,
            message: "create request is successful"
        }
    
}