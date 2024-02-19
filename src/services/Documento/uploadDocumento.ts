import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/documents');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const newFileName = `${timestamp}_${originalName}`;
        cb(null, newFileName);
    }
})

const uploadDocumento = multer({storage});

export default uploadDocumento