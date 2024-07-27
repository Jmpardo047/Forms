import React from 'react'
import { TextInput } from 'react-native'
import { FormValues } from './MyForm';
import { styles } from './app.theme';

interface Props{
    info:string;
    handleChange: (field: string) => (e:string | React.ChangeEvent<any>) => void;
    handleBlur: (field:string) => (e:any) => void;
    values: {
        [key: string]: any;
    };
}

export const InputComponent: React.FC<Props> = ({info, handleChange, handleBlur, values}) => {
  return (
    <TextInput
    onChangeText={handleChange(info)}
    onBlur={(e) => handleBlur(info)(e)}
    value={values[info]}
    style={styles.input}
    placeholder={info}
  />
  )
}
