import httpService from "./httpService.ts";

const APIs = {
    GET_MY_LEARNING_CHART: '/test/getMyLearningChart',
    UPLOAD_MY_DICTIONARY: '/test/uploadMyDictionary',
    GET_VOCABULARY: '/test/nihogo',
}

const PROD_DOMAIN = 'https://4yorfdsddl.execute-api.us-east-1.amazonaws.com'

export async function uploadDictionary({value, spell, twValue, sentence}: {
    value: string,
    spell: string,
    twValue: string,
    sentence: string
}) {

    return httpService.post((import.meta.env.DEV ? '' : PROD_DOMAIN) + APIs.UPLOAD_MY_DICTIONARY, {
        value,
        spell,
        twValue,
        sentence
    });

}

export async function getMyLearningChart() {
    return httpService.post((import.meta.env.DEV ? '' : PROD_DOMAIN) + APIs.GET_MY_LEARNING_CHART);
}

export async function getVocabularyTest() {
    return httpService.post((import.meta.env.DEV ? '' : PROD_DOMAIN) + APIs.GET_VOCABULARY, {type: 'test'});
}

export async function fetchDictSize() {
    return httpService.post((import.meta.env.DEV ? '' : PROD_DOMAIN) + APIs.GET_VOCABULARY, {type: 'size'});
}