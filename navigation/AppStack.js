import React from "react";
import { View,
        Image,
        TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator ,BottomTabBar} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack'
import Svg, { Path } from 'react-native-svg';
import { COLORS ,icons} from "../constants";
import { Home,PlantDetail,Restaurant, OrderDelivery ,Home1,QuestionScreen,ExtraScreen, UserProfileScreen, WebScreen,ForumScreen,AnsScreen, Pages} from "../screens/";

const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

const HomeStack=()=>{
    return(
        <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="PlantDetail" component={PlantDetail} />
        <Stack.Screen name="WebScreen" component={WebScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name='Pages' component={Pages}/>
    </Stack.Navigator>
    )
}

const AIStack=()=>(
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
        <Stack.Screen name="ExtraScreen" component={ExtraScreen} />
    </Stack.Navigator>
)

const QuestionStack=({navigation})=>(
    <Stack.Navigator
    initialRouteName={'Question Forum'}
    >
        <Stack.Screen name="AnsScreen" component={AnsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Question Forum" component={ForumScreen} options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: COLORS.primary,
          fontWeight:'bold',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color={COLORS.primary}
              onPress={() => navigation.navigate('QuestionScreen')}
            />
          </View>
        ),
      }}/>
    </Stack.Navigator>
)

const MartStack=()=>(
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="Restaurant" component={Restaurant}  />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
    </Stack.Navigator>
)

const AppStack = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.flash}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Extra"
                component={AIStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cube}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Questions"
                component={QuestionStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Mart"
                component={MartStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}


export default AppStack;