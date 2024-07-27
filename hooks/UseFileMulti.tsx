import { useCallback } from "react"
import { Alert } from "react-native";
import RNFS from 'react-native-fs';

export const useFileMulti = () => {

        const saveAllData = useCallback( async (fileName:string, data: any) => {
            try {
                const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
                let currentData = {};
                const fileExists = await RNFS.exists(path);
                if(fileExists){
                    const fileContent = await RNFS.readFile(path,'utf8');
                    currentData = JSON.parse(fileContent);
                    const updataData = {...currentData , ...data};
                    await RNFS.writeFile(path,JSON.stringify(updataData,null,2),'utf8');
                    Alert.alert(`File ${fileName} updated`)
                }else{
                    const jsonValue = JSON.stringify(data,null,2);
                    await RNFS.writeFile(path, jsonValue, 'utf8');
                    Alert.alert(`File ${fileName} created and updated`)
                    console.log('File saved successfully:', path);
                    return true;
                }

            } catch (e) {
                console.log('failed to save data',e);
                return false;
            }
        },
        [],);

    const getAllData = useCallback(async (fileName: string) => {
    try {
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const fileExists = await RNFS.exists(path);
        if (fileExists) {
        const jsonValue = await RNFS.readFile(path, 'utf8');
        return JSON.parse(jsonValue);
        } else {
        console.log('File does not exist:', path);
        return null;
        }
    } catch (e) {
        console.error('Failed to read file', e);
        return null;
    }
    }, []);
    
    return{
        saveAllData,
        getAllData
    }
    
}