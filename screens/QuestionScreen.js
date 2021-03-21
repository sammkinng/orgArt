import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const QuestionScreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>
                Question Answer Forum
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default QuestionScreen;