import { createStackNavigator } from 'react-navigation';

import EditorScreen from '../screens/EditorScreen';
import ListScreen from '../screens/ListScreen';
import CalendarScreen from '../screens/CalendarScreen';

const HomeStack = createStackNavigator(
  {
    List: {
      screen: ListScreen,
    },
    Editor: {
      screen: EditorScreen,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
  {
    mode: 'modal',
  }
);

export default HomeStack;
