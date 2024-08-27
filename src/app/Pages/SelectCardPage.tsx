import SelectGame from '../components/SelectGame.tsx';
import { getVocabularyTest, uploadOutcome } from '../../utils/apiService.ts';
import { use, useEffect, useState } from 'react';
import { getRandomObject } from '../../utils/userful.ts';
import { getVoice } from '../../utils/ttsApiService.ts';
import { GAME_TYPE } from '../constant.ts';

const promiseFetchData = getVocabularyTest();

export interface SelectGameQuestionType {
  questionList: WordType[],
  answer: WordType,
  voice?: string,
}

interface WordType {
  _id: string;
  created_time: string;
  sentence: string;
  spell: string;
  twValue: string;
  value: string;
  score: {
    score: number;
  };
}

export interface OutcomeType {
  id: string,
  score: number,
  isSuccess: boolean,
}

const SelectCardPage = ({ isVoice }: { isVoice: boolean }) => {
  const { data: response } = use(promiseFetchData);
  const [outcome, setOutcome] = useState<OutcomeType[]>([]);
  const [times, setTimes] = useState(0);
  const [question, setQuestion] = useState<SelectGameQuestionType>();
  const [displayMsg, setDisplayMsg] = useState('');
  const gameType = isVoice ? GAME_TYPE.VOICE_CHARACTER : GAME_TYPE.TEXT_CHARACTER;

  useEffect(() => {
    const getWordData = async () => {
      const data = await makeQuestion(response.data, isVoice);
      setQuestion(data);
    };
    getWordData();
  }, [times, isVoice]);

  const countOutcome = (testData: { id: string, score: number }, isSuccess: boolean) => {
    // if this question is fail in this test, you can't change the outcome anymore.
    const findIndex = outcome.findIndex(data => data.id === testData.id);
    if (findIndex === -1) {
      outcome.push({ ...testData, isSuccess });
      return;
    }
    if (!isSuccess) {
      outcome[findIndex].isSuccess = false;
    }
    setOutcome(outcome);
  };

  const handleUploadRecord = () => {

    const scoreList = outcome.map(o => {
      const nowScore = o.score ?? 0;
      if (nowScore === 0) {
        return {
          id: o.id,
          score: o.isSuccess ? nowScore + 1 : 0
        };
      } else {
        return {
          id: o.id,
          score: o.isSuccess ? nowScore + 1 : nowScore - 1
        };
      }

    });
    uploadOutcome({ scoreList: scoreList, type: gameType }).then((res) => {
      if (res.status === 200) return res.data;
    }).then(res => {
      if (res.statusCode === 200) {
        setDisplayMsg('Success upload');
      } else {
        setDisplayMsg(res);
      }
    });
  };

  if (!question) return '';
  return (
    <div className='flex flex-col h-full items-center'>
      <SelectGame
        isVoice={isVoice}
        data={question}
        nextQuestion={() => setTimes(prev => prev + 1)}
        countOutcome={(data, isSuccess) => countOutcome(data, isSuccess)}
      />
      <button className='col-span-2 w-[100px] h-[100px] rounded-xl p-3 bg-green-500 text-white'
              onClick={handleUploadRecord}>Upload
      </button>
      {displayMsg && <div>{displayMsg}</div>}
    </div>
  );
};
export default SelectCardPage;

const makeQuestion = async (data: WordType[], isVoice = false) => {
  const answerIndex = Math.floor(Math.random() * 4);
  const randomObjList = getRandomObject<WordType>(data, 4);
  if (isVoice) {
    const response = await getVoice({ text: randomObjList[answerIndex].value });
    return { answer: randomObjList[answerIndex], voice: response.data.audio_file_url, questionList: randomObjList };
  }
  return { answer: randomObjList[answerIndex], questionList: randomObjList };
};
