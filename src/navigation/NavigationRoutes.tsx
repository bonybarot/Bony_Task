
import Auth from '../navigation/Type/AuthStack';
import BottomNavigationTab from '../navigation/Type/BottomNavigationTab';
import LoginPage from '../pages/auth/LoginPage';

//bottom tabs
import ProfileTab from "../pages/tabbar/ProfileTab"
import EventsTab from "../pages/tabbar/EventsTab"
import FavouritesTab from "../pages/tabbar/FavouritesTab"
import SearchTab from "../pages/tabbar/SearchTab"
export const TabRoute = {
  SearchTab,
  EventsTab,
  FavouritesTab,
  ProfileTab
};

export const StackRoute = {

  BottomNavigationTab,
  Auth,
  LoginPage

};
