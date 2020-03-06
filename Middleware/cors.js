const cors=(req,resp,next)=>{

    resp.setHeader("Access-Control-Allow-Origin","*");

    resp.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,PATCH");

    resp.setHeader("Access-Control-Allow-Headers","Content-Type,Authoriation,x-auth-eptoken");

    next();
}//...........................

module.exports=cors;