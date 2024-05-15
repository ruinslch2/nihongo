import {useActionState} from "react";
import {uploadDictionary} from "../../utils/apiService.ts";

const DictionaryForm = () => {
    const [state, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
             uploadDictionary({
                value: formData.get("value"),
                spell: formData.get('spell'),
                sentence: formData.get('sentence'),
                twValue: formData.get('tw-value')
            }).then((res) => {
                if (res.status === 200) return res.data;
            }).then(res => {
                // console.log('rrrr: ', res.statusCode === 200)

            });
            // if (state) {
            //     return state;
            // }

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