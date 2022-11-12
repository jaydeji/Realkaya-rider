import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  getDrawerStatusFromState,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { Image, TouchableOpacity, View } from 'react-native';
import { Home } from './Home';
import Details from './Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import cx from 'classnames';

type Props = {};
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#02092A' }}>
      <DrawerItem
        label="Payments"
        onPress={() => props.navigation.navigate('Details')}
        labelStyle={{ color: 'white' }}
      />
      <DrawerItem
        label="Maps"
        onPress={() => props.navigation.navigate('Home')}
      />
    </DrawerContentScrollView>
  );
};

export const Index = ({}: Props) => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={({ navigation }) => {
        const isOpen =
          getDrawerStatusFromState(navigation.getState()) === 'open';
        return {
          drawerType: 'slide',
          headerTransparent: true,
          headerTitle: '',
          overlayColor: 'transparent',
          sceneContainerStyle: { backgroundColor: '#02092A' },
          drawerStyle: { width: '50%' },
          drawerContentContainerStyle: { flex: 1 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={
                  isOpen
                    ? require('../assets/images/close.png')
                    : require('../assets/images/harmburger.png')
                }
                className={cx('mt-5', !isOpen ? 'h-24 w-24' : `h-8 w-8 ml-20`)}
              />
            </TouchableOpacity>
          ),
          // drawerContentOptions:{}
        };
      }}
      drawerContent={(props) => {
        return <CustomDrawerContent {...props} />;
      }}
    >
      <Drawer.Screen name="Screens">
        {(props) => <Screens {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

//need this because view wont wrap drawer navigation screens
const Stack = createNativeStackNavigator();

const Screens = (props: any) => {
  const progress: any = useDrawerProgress();

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const translateY = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const opacity = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedStyle = { borderRadius, transform: [{ scale, translateY }] };

  return (
    <>
      <Animated.View
        className="absolute w-full h-full justify-center"
        style={{ opacity }}
      >
        <View className="bg-[#767A8C] h-3/5 w-full rounded-[20px]"></View>
      </Animated.View>
      <Animated.View
        className="flex-1 overflow-hidden relative"
        style={[
          {
            elevation: 5,
          },
          animatedStyle,
        ]}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </Animated.View>
    </>
  );
};
