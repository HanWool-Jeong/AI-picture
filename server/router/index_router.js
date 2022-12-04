import { project_dir } from '../global_variables.js';

import print_log from '../func/print_log.js';

import express from 'express';

const index_router = express.Router();

// 루트 url /index
index_router
    .get('/', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/index.html');
    })
    .get('/text2img', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/text2img.html');
    })
    .get('/img2img', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/img2img.html');
    });

export default index_router;