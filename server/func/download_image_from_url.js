import fs from 'fs';
import https from 'https';

/**
 * url로부터 이미지를 다운로드하는 함수!!
 * @param {string} url 사진이 있는 url주소 
 * @param {string} filepath 사진이 저장될 경로 
 * @returns {Promise} 비동기 Promise객체
 */
export default function download_image_from_url(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', () => { reject(new Error('이미지 url 다운로드 중 오류')); })
                    .once('close', () => { resolve("성공") });
            } else {
                res.resume();
                reject(new Error("이미지 url 다운로드 실패, 에러코드: ${res.statusCode}"));
            }
        });
    });
}