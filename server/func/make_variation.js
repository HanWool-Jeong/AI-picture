import dotenv from 'dotenv';
import fs from 'fs';
import { Configuration, OpenAIApi } from "openai";
dotenv.config({ path : '/home/hanwool/nodejsproject/.env'});

/**
 * AI가 사진 variation을 만들어주는 함수
 * @param {string} path AI에게 보낼 사진 경로 
 * @returns variation사진 url
 */
export default async function make_variation(path) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImageVariation(
        fs.createReadStream(path),
        1,
        "1024x1024"
    );
    
    // url 반환
    return response.data.data[0].url;
}