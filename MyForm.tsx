import React from 'react'
import { View, Text, Alert, TextInput, Button } from 'react-native';
import { styles } from './app.theme';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { InputComponent } from './InputComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFileMulti } from './hooks/UseFileMulti';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const saveLocalData = async (data: Record<string, any>) =>{
  try {
    const savePromises = Object.keys(data).map(async (key) =>{
      const value = JSON.stringify(data[key]);
      await AsyncStorage.setItem(`@${key}`,value)
    });
    await Promise.all(savePromises);
    Alert.alert('Data saved locally')
  } catch (e) {
    console.log('Falied to save info in local storage',e)
  }
}

const getAllDataFromLocalStorage = async (keys: string[]) => {
  try {
    const getPromises = keys.map(async (key) => {
      const value = await AsyncStorage.getItem(`@${key}`);
      return { [key]: value != null ? JSON.parse(value) : null };
    });
    const allData = await Promise.all(getPromises);
    const combinedData = allData.reduce((acc, item) => ({ ...acc, ...item }), {});
    Alert.alert('Stored Data', JSON.stringify(combinedData, null, 2));
    return combinedData;
  } catch (e) {
    console.error('Failed to fetch data from local storage', e);
  }

};

const {saveAllData,getAllData} = useFileMulti();

const keys = ['firstName', 'lastName', 'email'];

export const MyForm = () => {
  const myInitialValues:FormValues = {firstName: "", lastName: "", email: ""}
  return (
    <View>
      <Text style={styles.mainText}>
          Signup
      </Text>
      
      <Formik 
      initialValues={myInitialValues}
      onSubmit={async(
        values: FormValues,
        { setSubmitting, resetForm }: FormikHelpers<FormValues>
      ) => {
        try{
          await saveAllData('data.json',values);
        }
        finally{
          setSubmitting(false);
          resetForm();
        }
      }}>
          {({handleChange, handleBlur,handleSubmit,values}) =>(
            <View style={styles.container}>
              <InputComponent
              info="firstName"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              />
              <InputComponent
              info="lastName"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              />
              <InputComponent
              info="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              />
                <Button  onPress={handleSubmit as (event:any) => void} title='Submit'/>
                <Button onPress={async () => {
              const data = await getAllData('data.json');
              Alert.alert('Stored Data', JSON.stringify(data, null, 2));
              }} title='Show All Data'/>
            </View>
          )}
      </Formik>
    </View>
  )
}

