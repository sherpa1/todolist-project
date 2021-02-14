const multer = require("multer");

const path = require("path");
const appDir = path.dirname(require.main.filename);


const excel_filter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml") ||
        file.mimetype.includes("application/octet-stream")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only Excel file.", false);
    }
};

const excel_files_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appDir + "/public/uploads/recipients");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const pdf_filter = (req, file, cb) => {

    console.log(file)

    if (
        file.mimetype.includes("pdf") ||
        file.mimetype.includes("application/pdf")
    ) {
        cb(null, true);
    } else {
        console.error(file);
        cb("Please upload only PDF file.", false);
    }
};

const pdf_files_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/app/backoffice_api_mdb/public/uploads/pdf/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload_excel = multer({ storage: excel_files_storage, fileFilter: excel_filter });
module.exports.upload_excel = upload_excel;

const upload_pdf = multer({ storage: pdf_files_storage, fileFilter: pdf_filter });
module.exports.upload_pdf = upload_pdf;

