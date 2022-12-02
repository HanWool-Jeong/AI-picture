import fs from 'fs';
import { log_name } from '../global_variables.js';

/**
 * 로그 출력 함수
 * @param {string} log_file 경로
 * @param {string} ip 출력할 ip 
 * @param {log} log 출력할 log 
 */
export default function print_log(ip, log) {
    var date = new Date();
    var log = '[' + `${date.toLocaleString()}`.padStart(25, ' ') + ']' +
              '[' + `${ip}]`.padStart(16, ' ') +
              ' ' + log;
    fs.appendFile(log_name, log + '\n', err => { if (err) throw err; });
    //console.log(log);
}