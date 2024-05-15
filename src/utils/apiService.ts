import httpService from "./httpService.ts";

const APIs = {
    GET_MY_LEARNING_CHART: '/test/getMyLearningChart',
    UPLOAD_MY_DICTIONARY: '/test/uploadMyDictionary'
}

export async function uploadDictionary({value, spell, twValue, sentence}: {
    value: string,
    spell: string,
    twValue: string,
    sentence: string
}) {
    return httpService.post(APIs.UPLOAD_MY_DICTIONARY, {
        value,
        spell,
        twValue,
        sentence
    });
}

export async function getMyLearningChart() {
    return httpService.post(APIs.GET_MY_LEARNING_CHART);
}
