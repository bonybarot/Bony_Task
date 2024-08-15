import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TabNav} from '../NavigationKeys';
import {TabRoute} from '../NavigationRoutes';

const Tab = createBottomTabNavigator();

const getName = (routeName: string) => {
  switch (routeName) {
    case TabNav.SearchTab:
      return 'Search';
    case TabNav.EventsTab:
      return 'Events';
    case TabNav.FavouritesTab:
      return 'Favourites';
    case TabNav.ProfileTab:
      return 'Profile';
    default:
      return '';
  }
};

const BottomNavigationTab = () => {
  const renderTabBarIcon = (routeName: string, focused: boolean) => {
    let icon;
    switch (routeName) {
      case TabNav.SearchTab:
        // return(
        <AntDesign name="search1" size={20} />;
        // )
        break;
      case TabNav.EventsTab:
        // return(
        <AntDesign name="search1" size={20} />;
        // )
        break;
      case TabNav.FavouritesTab:
        // return(
        <AntDesign name="search1" size={20} />;
        // )
        break;
      case TabNav.ProfileTab:
        // return(
        <AntDesign name="search1" size={20} />;
        // )
        break;
      default:
        break;
    }
    return <Image source={icon} style={styles.icon} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => renderTabBarIcon(route.name, focused),
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {color: focused ? 'green' : 'black'},
              ]}>
              {getName(route.name)}
            </Text>
          ),
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'black',
          style: styles.tabBar,
        }}>
        <Tab.Screen name={TabNav.SearchTab} component={TabRoute.SearchTab} />
        <Tab.Screen name={TabNav.EventsTab} component={TabRoute.EventsTab} />
        <Tab.Screen
          name={TabNav.FavouritesTab}
          component={TabRoute.FavouritesTab}
        />
        <Tab.Screen name={TabNav.ProfileTab} component={TabRoute.ProfileTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    height: 55,
  },
  icon: {
    height: 25,
    width: 25,
  },
  tabBarLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default BottomNavigationTab;
