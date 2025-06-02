import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req,res,cd){
        cb(null,'./public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

export const uploadOnMulter = multer({ storage: storage })