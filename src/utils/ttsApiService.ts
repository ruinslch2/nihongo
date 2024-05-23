import httpService from "./httpService.ts";
import {AxiosResponse } from 'axios'

const APIs = {
    GET_VOICE: 'https://api.ttsmaker.com/v1/create-tts-order',
}

interface TtsMakerRes {
    audio_file_url: string
}
export async function getVoice({text}: {
    text: string,
}): Promise<AxiosResponse<TtsMakerRes>> {
    return httpService.post(APIs.GET_VOICE, {
        token: "ttsmaker_demo_token",
        text: text,
        voice_id: 406,
        audio_format: "wav",
        audio_speed: 1.0,
        audio_volume: 0,
        text_paragraph_pause_time: 0
    });
}