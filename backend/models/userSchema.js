import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
          email:{
               type:String ,
               required:true,
               unique:true

          },
          password:{
               type:String ,
               required:true
          },
          asistanceImage:{
               type:String
          },
          asistancename:{
               type:String
          },history:[
               {type:String}
          ]}, 
           { timestamps: true }   // ✅ correct way
)

const User=mongoose.model('User',userSchema);
export default User;