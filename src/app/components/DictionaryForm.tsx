import {useActionState} from "react";

const DictionaryForm = () => {
    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            // const error = await updateName(formData.get("name"));
            if (error) {
                return error;
            }

            return null;
        },
        null,
    );

    return <form action={submitAction} className="flex flex-col gap-5 border-2 rounded-2xl p-5">
        <InputField title={'日字'} name={'ja-word'} />
        <InputField title={'發音'} name={'ja-spell'} />
        <InputField title={'意思'} name={'tw-word'} />
        <button className="rounded-xl p-3 bg-blue-500 text-white" type="submit" disabled={isPending}>Update</button>
        {error && <p>{error}</p>}
    </form>
}

const InputField = ({title, name}:{title: string, name: string}) => {
    return <div className={"flex flex-row items-center gap-3"}>
        <span>{title}:</span>
        <input type="text" name={name} className="border-2 p-2"/>
    </div>
}


export default DictionaryForm