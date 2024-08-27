import { Form, Formik, useField } from 'formik';
import { useState } from 'react';
import { uploadDictionary } from '../../utils/apiService.ts';

const DictionaryForm = () => {

  const [isPending, setIsPending] = useState(false);
  const handleSubmit = ({ value, spell, twValue, sentence }: {
    value: string,
    spell: string,
    twValue: string,
    sentence?: string
  }) => {

    uploadDictionary({ value, spell, twValue, sentence }).then((res) => {
      if (res.status === 200) return res.data;
    }).then(res => {
      console.log(res.data);
    });

  };

  return <Formik
    initialValues={{
      value: '',
      spell: '',
      twValue: '',
      sentence: ''
    }}
    onSubmit={(values) => handleSubmit(values)}
    validateOnBlur={false}
  >
    {({ values, handleChange }) => (
      <Form className='flex flex-col gap-5 border-2 rounded-2xl p-5'>
        <InputField title={'日字'} name={'value'} required={true} />
        <InputField title={'發音'} name={'spell'} required={true} />
        <InputField title={'意思'} name={'twValue'} required={true} />
        <InputField title={'例句'} name={'sentence'} required={false} />
        <button className='rounded-xl p-3 bg-blue-500 text-white' type='submit' disabled={isPending}>Update
        </button>
      </Form>
    )}
  </Formik>;

};

const InputField = ({ title, name, required }: { title: string, name: string, required: boolean }) => {
  const [field, meta] = useField(name);
  return <div className={'flex flex-row items-center w-full gap-3'}>
    <span>{title}:</span>
    <input type='text' {...field} className='border-2 p-2 w-full' required={required} />
  </div>;
};


export default DictionaryForm;
