import {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Images from '../utils/images';
import {Config} from '../utils/Config';
import {Colors} from '../utils/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {useDispatch} from 'react-redux';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const Animation = () => {
  const dispatch = useDispatch();
  const width = useSharedValue(100);

  useEffect(() => {}, []);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />

      <Button onPress={handlePress} title="Click me" />
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
