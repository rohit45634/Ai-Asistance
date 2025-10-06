import  multer from "multer";

const multer=multer.diskStorage({
          destination:(req,file,cb)=>{
                    cb(null,"./public")}
                    ,
                    filename:(req,file,cb)=>{
                    cb(null,file.originalname)
                    }
})

const upload =multer({Storage})
export default upload;