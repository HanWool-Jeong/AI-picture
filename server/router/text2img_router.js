import { project_dir, log_name } from '../global_variables.js';

import print_log from '../func/print_log.js';
import express from 'express';

const router = express.Router();

router
    .get('/', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/text2img.html');
    });

export default router;