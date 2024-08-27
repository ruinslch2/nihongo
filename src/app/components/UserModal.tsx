import Modal from './Modal.tsx';
import { useState } from 'react';

const UserModal = ({ onClose }: { onClose: () => void }) => {

  const [inputName, setInputName] = useState<string>();
  const handleSubmit = () => {
    sessionStorage.setItem('name', inputName);
    onClose();
  };

  return <Modal>
    <form className='relative h-full w-full flex flex-col p-5 justify-center gap-5'>
      <div>
        <span>私の名前は</span>
        <input name='name' className='border p-1 text-center' onChange={(e) => setInputName(e.target.value)}
               type='text' />
        <span>です</span>
      </div>
      <button className='rounded-xl p-2 bg-blue-500 text-white' onClick={handleSubmit}>
        Confirm
      </button>
    </form>
  </Modal>;
};

export default UserModal;
