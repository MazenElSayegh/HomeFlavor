let jwt = require("jsonwebtoken");
const userModel = require("../../Models/User");
const { OAuth2Client } = require("google-auth-library");


class GoogleLoginController {


    login = async (body) =>{
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        console.log(body)
        if (!body.credential) {
            return res.json({
                success: false,
                message: "Credential are required"
            });
        }
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: body.credential,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            let checkUser = await userModel.findOne({ email: payload.email })
            if (!user) {
                user = new userModel({
                    name: payload["name"],
                    email: payload["email"],
                    password: process.env.secret_password,
                    image: payload["picture"],
                });
                await user.save()
            }
            let token = jwt.sign(
                {
                  role: checkUser.role,
          
                  user_id: checkUser._id,
                },
                "token"
              );
            
            return {
                myToken:token,
                success:true,
                status:201,
                message: "you are logged in",
            }
        } catch (err) {
            
            return {
                status:400,
                message: err.message,
                success:false,

            }
        }
    }

}

module.exports = new GoogleLoginController() ;