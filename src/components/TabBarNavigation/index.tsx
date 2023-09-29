import React from 'react';
import {v4 as uuid} from 'uuid';

import {
  Container,
  Button,
  Icon,
  FaIcon,
  ButtonText,
} from './styles'

interface IProps{
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBarNavigation: React.FC<IProps> = ({ state, descriptors, navigation }: IProps)=>{
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Container style={{ flexDirection: 'row' }}  edges={['bottom', 'left', 'right']}>
    {state.routes.map((route: any, index: any) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <Button
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          key={uuid()}
        >
          {options.tabBarIcon((value: string)=>value) === 'handshake-o' ? (
            <FaIcon name={options.tabBarIcon((value: string)=>value)} size={24} isFocused={isFocused}/>
          ): (
            <Icon name={options.tabBarIcon((value: string)=>value)} size={24} isFocused={isFocused}/>
          )}
          <ButtonText isFocused={isFocused}>
            {label}
          </ButtonText>
        </Button>
      );
    })}
    </Container>
  )
}

export default TabBarNavigation;
