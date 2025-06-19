import multer from "multer";
import path from 'path'

let imageStorage=multer.diskStorage(
    {
        destination:function(req,file,cb){cb(null,"uploads/")},
        filename:function(req,file,cb){
            let extention=path.extname(file.originalname)
            cb(null,Date.now()+extention)
        }
    }

)
// ///////////
let imageUpload=multer(
    {
        storage:imageStorage,
        limits:{fieldSize:1024*1024*5},
        fileFilter:(req,file,cb)=>{
            if(file.mimetype == 'image/png' || file.mimetype == "image/jpg" || file.mimetype =='image/jpeg')
            { cb(null , true)}
            else
             {cb(null , false)}

        }
    }
)
export default imageUpload