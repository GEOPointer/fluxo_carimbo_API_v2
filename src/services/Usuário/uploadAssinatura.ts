import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/signatures');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const newFileName = `${timestamp}_${originalName}`;
        cb(null, newFileName);
    }
})

const uploadSignature = multer({storage});

export default uploadSignature