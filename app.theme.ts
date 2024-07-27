import { Button, StyleSheet } from "react-native";

export const colors = {
    darkGray: '#2D2D2D',
    lightGray: '#9B9B9B',
    orange: '#FF9427',
    textPrimary: 'white',
    textSecondary: '#666666',
    background: '#000000'
}

export const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: colors.background,
    },
    mainText:{
        color :colors.textPrimary,
        fontSize: 70,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '400',
    },
    subResult: {
        color: colors.textSecondary,
        fontSize: 40,
        textAlign: 'right',
        fontWeight: '300',
    },
    input:{
        height: 50,
        backgroundColor:"white",
        marginBottom: 20,
        paddingLeft: 20
    },
    container:{
        padding: 30,

    },
    button:{
        width: 75,
        height: 75,
        backgroundColor: colors.darkGray,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10
    },
})