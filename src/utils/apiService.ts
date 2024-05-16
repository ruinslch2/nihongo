import httpService from "./httpService.ts";

const APIs = {
    GET_MY_LEARNING_CHART: '/test/getMyLearningChart',
    UPLOAD_MY_DICTIONARY: '/test/uploadMyDictionary',
    GET_VOCABULARY: '/test/nihogo',
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

export async function getVocabularyTest() {
    return httpService.post(APIs.GET_VOCABULARY, {type: 'test'});
}

export async function fetchDictSize() {
    return httpService.post(APIs.GET_VOCABULARY, {type: 'size'});
}