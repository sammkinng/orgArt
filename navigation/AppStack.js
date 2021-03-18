import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { PlantDetail,Restaurant, OrderDelivery ,Home1} from "../screens/";


// extra screens
import Tabs from "./tabs";
const Stack=createStackNavigator();

const AppStack=()=>{
    return(
             <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="PlantDetail" component={PlantDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Home1" component={Home1} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            </Stack.Navigator>
    )
}

export default AppStack;