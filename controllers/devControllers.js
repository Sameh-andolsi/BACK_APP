const UserModels = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require ("dotenv").config();
const SECRET=process.env.SECRET

// register
module.exports.Register = async (req, res) => {
  try {
    const { name, email, password, role, username } = req.body;

    if (!name || !email || !password || !role || !username) {
      res.status(400).json({ message: "All Fields are required" });
    } else {
      const existingUser = await UserModels.findOne({email:email});

      if (existingUser) {
        res.status(400).json({ msg: "User Already Exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const user = await UserModels.create({
          name,
          email,
          password: hashed_password,
          role,
          username,
        });
        res
          .status(200)
          .json({ status: true, msg: "User has been created", data: user });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
//login 

module.exports.Login =async (req,res)=>{
  try{
const { email, password, role  } = req.body;

if(!email || !password || !role){
res.status(400).json({msg:"All Fields are required"});
}else{
  const user =await UserModels.findOne({email:email})
  //if user exists
  if(user){
const verifyPassword =await bcrypt.compare(password, user.password)
if(verifyPassword){
  const token = await jwt.sign({
  id:user._id,
  email:user.email,
  role:user.role,
},SECRET
  );
  res.status(200).json({status:true , msg:"Logged in successfully" , data: user , token:token});
}else{
  res.status(400).json({msg:"password incorrect"})
}
  }else{
res.status(400).json({msg:" User  do not exist"})
  }
}
  }catch(error){
    console.log(error);
    res.status(500).json({ status:false , msg: error});
  }
};