const Modal = ({ children }: { children: React.ReactNode }) => {

  return <div className={'z-10 h-full fixed inset-0'}>
    <div className={'bg-black bg-opacity-30 h-full w-full content-center p-20'}>
      <div className={'bg-white rounded-2xl mx-auto w-96 h-40'}>
        {children}
      </div>
    </div>
  </div>;
};

export default Modal;
