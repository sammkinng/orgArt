import React from 'react';
import { View,StyleSheet,Text, Button } from 'react-native';

const ForumScreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>
                Forum Screen
            </Text>
            <Button onPress={()=>navigation.navigate('QuestionScreen')} title="Ask a ques" />
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

export default ForumScreen;