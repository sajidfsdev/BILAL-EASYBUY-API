const AdminAuthModel=require('../../Model/Admin/Auth');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


//AAuth related methods starts here........
//Must Also needs to check Duplication.....

exports.handleRegister=async (req,resp,next)=>{

    //parsing req body......
    let { fname,lname,email,password,pic }=req.body;

    //logging........
    //console.log(req.body);

  
    //conversions.......
    fname=fname.toUpperCase();
    lname=lname.toUpperCase();

    //logging....
    //console.log(fname,lname);


    //Encrypting password starts here....
    try
    {
        const bcryptres=await bcrypt.hash(password,12);
        if(bcryptres)
        {
            //Password Hashed Successfully........
            const Admin=new AdminAuthModel({
                fname:fname,
                lname:lname,
                email:email,
                password:bcryptres,
                pic:pic
            });

            const saveres=await Admin.save();

            if(saveres)
            {
                return resp.status(201).json({
                    successMessage:"Admin Has Been Added Successfully"
                });
            }
            else
            {
                return resp.status(500).json({
                    errorMessage:"Error Occurred While Saving Information"
                });
            }
        }
        else
        {
            return resp.status(500).json({
                errorMessage:"Error Occurred While Processing Password Authentication"
            });
        }
    }
    catch(err)
    {
        return resp.status(500).json({
            errorMessage:err.message
        });
    }

}//..........................................Handle Register ends here.....








//Handle Login Starts Here..............................................
exports.handleLogin=async (req,resp,next)=>{

    //extracting info....
    const { email,password }=req.body;

    //logging.....
    console.log(email);
    console.log(password);

    //verifying starts.....
    try
    {
        const findres=await AdminAuthModel.findOne({email});

        if(findres)
        {
            //comparing password.........
            const compareres=await bcrypt.compare(password,findres.password);

            if(compareres===true)
            {
                //Preparing JWT Token starts.......
                const payload={
                    id:findres.id,
                    email:findres.email,
                    fname:findres.fname,
                    lname:findres.lname
                };
                jwt.sign(payload,config.get("secret"),(err,token)=>{

                    if(err)
                    {
                        return resp.status(500).json({
                            errorMessage:"Error occurred while processing token"
                        });
                    }
                    else
                    {
                        return resp.status(200).json({
                            successMessage:"Logged In Successfully",
                            token:token,
                            fname:findres.fname,
                            lname:findres.lname,
                            email:findres.email
                        });
                    }
                });
                //Preparing JWT Token ends here....
            }
            else
            {
                return resp.status(500).json({
                    errorMessage:"Sorry Username Or Password Is Incorrect"
                });
            }
        }
        else
        {
            return resp.status(500).json({
                errorMessage:"Sorry Username Or Password Is Incorrect"
            });
        }
    }
    catch(err)
    {
        return resp.status(500).json({
            errorMessage:err.message
        });
    }
}
////...........................................Handle Login Ends Here...