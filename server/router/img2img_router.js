import { project_dir } from '../global_variables.js';

import print_log from '../func/print_log.js';
import make_variation from '../func/make_variation.js'
import download_image_from_url from '../func/download_image_from_url.js'

import express from 'express';

const router = express.Router();

// 파일 업로드 미들웨어
import multer from 'multer';
// multer 스토리지 설정
var storage  = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, project_dir + '/uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}.png`);
    },
});
const upload = multer({ storage : storage });

// 루트 url /index/img2img
router
    .get('/', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/img2img.html');
    })
    .post('/upload', upload.single('input_image'), function(req, res, next) {
        // 받은 form 사진 ai처리하기
        print_log(req.ip, 'variation 요청');
        const { file } = req;

        make_variation(file.path)
            .then(result => {
                // ai처리된 사진 다시 클라에게 보내기
                print_log(req.ip, 'variation 요청 전송');
                res.send({ url: result });

                // ai처리된 사진 다운받아서 서버에 저장
                print_log(req.ip, 'variation 사진 업로드 중');
                download_image_from_url(result, project_dir + '/variations/' + `${Date.now()}_${file.originalname}.png`)
                    .then(result => { 
                        print_log(req.ip, 'variation 사진 업로드 성공');
                    })
                    .catch(err => {
                        print_log(req.ip, 'variation 사진 업로드 실패: ' + err.message);
                        next(err);
                    });
            })
            .catch(err => {
                print_log(req.ip, 'variation 실패: ' + err.message);
                next(err);
            });
    });

export default router;