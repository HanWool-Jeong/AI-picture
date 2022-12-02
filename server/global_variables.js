// 경로
// 상대적으로 경로 설정했더니 systemd 서비스로 올려서 실행할 때 경로를 잘 못찾더라..
//import path from 'path';
//const project_dir = path.resolve('../');
export const project_dir = '/home/hanwool/nodejsproject/';

// 로그 파일 이름
// 다 .env에 포함시키고 싶은데 동적으로 만들지 못함..
export const log_name = `${project_dir}/log/${(new Date()).toLocaleString()}`;