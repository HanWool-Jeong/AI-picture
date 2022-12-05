import { project_dir } from '../global_variables.js';

import dotenv from 'dotenv';

dotenv.config(project_dir + '/.env');

/**
 * 파파고로 한글을 영어로 번역하는 함수
 * @param {string} 번역할 문자열 (한글 영어 혼합가능)
 * @returns {string} 영어로 번역된 문자열
 */
async function papago_translate(prompt) {
    const url = 'https://openapi.naver.com/v1/papago/n2mt';

    const form_data = new URLSearchParams();
    form_data.append('source', 'ko');
    form_data.append('target', 'en');
    form_data.append('text', prompt);

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': process.env.X_NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.X_NAVER_CLIENT_SECRET,
        },
        body: form_data
    };

    return fetch(url, data);
}

export default papago_translate;