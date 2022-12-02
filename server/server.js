import { project_dir, log_name } from './global_variables.js';

// 서버 프레임워크 모듈
import express from 'express';
const app = express();

// 내가만든 함수들
import print_log from "./func/print_log.js";
import index_router from './router/index_router.js';
import text2img_router from "./router/text2img_router.js";
import img2img_router from "./router/img2img_router.js";

app.get('/', function(req, res) {
    print_log(req.ip, '접속함: ' + req.originalUrl);
    res.redirect('/index');
});

// 정적 파일 제공
app.use(express.static(project_dir + '/public'));
app.use(express.static(project_dir + '/generations'));

app.use('/index', index_router);
app.use('/index/text2img', text2img_router);
app.use('/index/img2img', img2img_router);

// ipv4 노출 (apache 키고 사용하자!!)
app.set('trust proxy', true);

// json 파싱
//app.use(express.urlencoded({
//    extended: true
//}));

app.all('*', function(req, res) {
    print_log(req.ip, '이상한데로 들어옴: ' + req.originalUrl);
    res.status(404).sendFile(project_dir + "/public/html/not_found.html");
});

const port = 3000;
const ip = 'localhost';
app.listen(port, '0.0.0.0', function() {
    print_log(`${ip}:${port}`, '서버 가동중..');
});