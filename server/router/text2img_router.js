import { project_dir } from '../global_variables.js';

import print_log from '../func/print_log.js';
import express from 'express';
import make_generation from '../func/make_generation.js';
import download_image_from_url from '../func/download_image_from_url.js';

const router = express.Router();

// json 파싱
router.use(express.json());

// 루트 url /index/text2img
router
    .get('/', function(req, res) {
        print_log(req.ip, '접속함: ' + req.originalUrl);
        res.sendFile(project_dir + '/public/html/text2img.html');
    })
    .post('/generate', function(req, res, next) {
        const { prompt } = req.body;

        print_log(req.ip, 'generation 요청');

        make_generation(prompt)
        .then(result => {
            // ai가 생성한 사진 클라에게 보내기
            print_log(req.ip, 'generation 요청 전송');
            
            const image_name = `${Date.now()}.png`;
            const image_path = project_dir + '/generations/' + image_name;
            res.send({ url: result, name: image_name });

            // ai가 생성한 사진 다운로드
            print_log(req.ip, 'generation 사진 업로드 중');
            download_image_from_url(result, image_path)
                .then(result => {
                    print_log(req.ip, 'generation 사진 업로드 성공');
                })
                .catch(err => {
                    print_log(req.ip, 'generation 사진 업로드 실패: ' + err.message);
                    next(err);
                });
        })
        .catch(err => {
            print_log(req.ip, 'generation 실패: ' + err.message);
            next(err);
        });
    });

export default router;