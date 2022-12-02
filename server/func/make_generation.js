import { project_dir } from '../global_variables.js';

import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config({ path : `${project_dir}/.env` });

/**
 * prompt 내용대로 이미지를 만들어주는 함수
 * @param {string} prompt_input 
 * @returns {Promise} 이미지 url을 담고 있는 Promise 객체
 */
export default async function make_generation(prompt_input) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
        prompt: prompt_input,
        n: 1,
        size: "1024x1024",
    });

    return response.data.data[0].url;
}