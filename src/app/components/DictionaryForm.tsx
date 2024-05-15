import {useActionState} from "react";
import {AxiosResponse} from "axios";
import httpService from "../../utils/httpService.ts";

interface ResponseType {
    statusCode: number,
    body: number
}

const uploadDict = async ({value, spell, twValue, sentence}: {
    value: string,
    spell: string,
    twValue: string,
    sentence: string
}) => {
    const response: AxiosResponse<ResponseType> = await httpService.post('/test/uploadMyDictionary', {
        value,
        spell,
        twValue,
        sentence
    });
    if (response.status === 200) {
        return response.data.body
    }
    return 0
}

const DictionaryForm = () => {
    const [state, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const state = await uploadDict({
                value: formData.get("value"),
                spell: formData.get('spell'),
                sentence: formData.get('sentence'),
                twValue: formData.get('tw-value')
            });
            if (state) {
                return state;
            }

            return null;
        },
        null,
    );

    return <form action={submitAction} className="flex flex-col gap-5 border-2 rounded-2xl p-5">
        <InputField title={'日字'} name={'value'}/>
        <InputField title={'發音'} name={'spell'}/>
        <InputField title={'意思'} name={'tw-value'}/>
        <InputField title={'例句'} name={'sentence'}/>
        <button className="rounded-xl p-3 bg-blue-500 text-white" type="submit" disabled={isPending}>Update</button>
        {state && <p>{state}</p>}
    </form>
}

const InputField = ({title, name}: { title: string, name: string }) => {
    return <div className={"flex flex-row items-center w-full gap-3"}>
        <span>{title}:</span>
        <input type="text" name={name} className="border-2 p-2 w-full" required={true}/>
    </div>
}


export default DictionaryForm