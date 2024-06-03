import Modal from "./Modal.tsx";
import {useActionState} from "react";

const UserModal = ({onClose}:{onClose: () => void}) => {

    const [state, submitAction, isPending] = useActionState(
        // @ts-expect-error: TS6133
        async (previousState, formData) => {
            sessionStorage.setItem('name', formData.get('name'))
            onClose();
            return null;
        },
        null,
    );

    return <Modal>
        <form action={submitAction} className="relative h-full w-full flex flex-col p-5 justify-center gap-5">
            <div>
                <span>私の名前は</span>
                <input name="name" className="border p-1 text-center" type="text"/>
                <span>です</span>
            </div>
            <button className="rounded-xl p-2 bg-blue-500 text-white">
                Confirm
            </button>
        </form>
    </Modal>
}

export default UserModal;