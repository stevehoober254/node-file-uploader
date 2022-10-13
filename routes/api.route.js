const router = require('express').Router();
const { upload, download, getListFiles } = require('../controller/upload.controller');



router.post('/upload', upload);
router.get("/files", getListFiles);
router.get("/files/:name", download);

module.exports = router;
