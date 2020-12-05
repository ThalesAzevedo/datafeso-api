const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


module.exports = {
    dest: path.resolve(__dirname,'..', '..','uploads'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname,'..', '..','uploads'));
        },
        filename:  (req, file, callback) =>{
            crypto.randomBytes(4, (err, hash) => {
                if (err) callback(err);

                // NAME WITH HASH
                // const filename = `${hash.toString('hex')}-${file.originalname}`
                const filename = `IPCFeso.csv`

                callback(null,filename );
            });
         }
    }),

    limits: {
        fileSize:5*1024*1024,
    },
    fileFilter: (req, file, callback)=>{
        const allowedMimes = [
            'text/csv', 'application/vnd.ms-excel'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true );

        }else {
            callback(new Error("Extensão de arquivo inválido."))
        }
    },
};
