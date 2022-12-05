import { project_dir } from '../global_variables.js';

import express from 'express';
import print_log from '../func/print_log.js';
import make_generation from '../func/make_generation.js';
import download_image_from_url from '../func/download_image_from_url.js';
import papago_translate from '../func/papago_translate.js';

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

        print_log(req.ip, `generation 요청 (prompt: ${prompt})`);

        // prompt 한글->영어로 번역하기
        papago_translate(prompt)
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    throw(new Error("파파고 번역 오류"));
                }
            })
            .then(translated => {
                print_log(req.ip, "generation 파파고 번역 완료");

                make_generation(translated.message.result.translatedText)
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
            })
            .catch(err => {
                print_log(req.ip, 'generation 파파고 오류: ' + err.message);
                next(err);
            });

    });

export default router;