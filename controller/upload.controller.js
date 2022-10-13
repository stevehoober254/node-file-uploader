const uploadFile = require("../utils/upload");
const fs = require('fs');
const baseUrl = "http://localhost:3000/res/uploads/";


const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "You need to send an image file!" });
        }
        res.status(200).send({
            message: "The following file was uploaded successfully: " + req.file.originalname,
            url:baseUrl+req.file.originalname
        });
    } catch (err) { // error handling
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File larger than 2MB cannot be uploaded!",
            });
        }
        res.status(500).send({
            message: `Unable to upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const download = (req, res) => {
    const fileName = req.params.name;  // define uploads folder path
    const directoryPath = __basedir + "/res/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "There was an issue in downloading the file. " + err,
            });
        }
    });
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/res/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "There was an issue in scanning the files!",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};

module.exports = { upload, download, getListFiles };