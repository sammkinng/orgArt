import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { PlantDetail,Restaurant, OrderDelivery ,Home1,QuestionScreen,ExtraScreen, UserProfileScreen, WebScreen} from "../screens/";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';

// extra screens
import Tabs from "./tabs";
const Stack=createStackNavigator();

const AppStack=()=>{
    return(
             <Stack.Navigator
                // screenOptions={{
                //     headerShown: false
                // }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }}/>

                {/* Screens */}
                <Stack.Screen name="PlantDetail" component={PlantDetail}  options={{ headerShown: false }}/>
                <Stack.Screen name="Home1" component={Home1} options={{ headerShown: false }}/>
                <Stack.Screen name="Restaurant" component={Restaurant} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} options={{ headerShown: false }}/>
                <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ExtraScreen" component={ExtraScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="WebScreen" component={WebScreen}/>
                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} 
                    options={({navigation})=>({
                        title:'',
                        headerStyle:{
                            backgroundColor:'#fff',
                            shadowColor:'#fff',
                            elevation:0
                        },
                        headerLeft:()=>(
                            <View style={{marginLeft:10}}>
                                <FontAwesome.Button
                                    name='long-arrow-left'
                                    size={25}
                                    backgroundColor='#fff'
                                    color="#333"
                                    onPress={()=>navigation.goBack()}
                                />
                            </View>
                        ) 
                    })}
                />
            </Stack.Navigator>
    )
}

export default AppStack;