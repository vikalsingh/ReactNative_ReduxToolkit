import {useState} from 'react';
import {Colors} from '../utils/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {checkSignupValidData} from '../utils/validate';
import {addUser, editUser} from '../redux/UserSlice';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} = require('react-native');

const AddUser = ({navigation}) => {
  const dispatch = useDispatch();
  //   const {type, data, index} = route?.params;
  const route = useRoute();
  //   console.log('edit---', route);
  const [name, setName] = useState(
    route.params?.type == 'edit' ? route.params.data.name : '',
  );
  const [email, setEmail] = useState(
    route.params?.type == 'edit' ? route.params.data.email : '',
  );
  const [phone, setPhone] = useState(
    route.params?.type == 'edit' ? route.params.data.phone : '',
  );
  const [city, setCity] = useState(
    route.params?.type == 'edit' ? route.params.data.city : '',
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    const message = checkSignupValidData(name, email, phone, city);
    setErrorMessage(message);
    if (message) return;

    if (route.params?.type == 'edit') {
      dispatch(
        editUser({
          name: name,
          email: email,
          phone: phone,
          city: city,
          index: route.params.index,
        }),
      );
    } else {
      dispatch(addUser({name, email, phone, city}));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={e => setEmail(e)}
        style={styles.inputStyle}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={e => setPhone(e)}
        style={styles.inputStyle}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={e => setCity(e)}
        style={styles.inputStyle}
      />

      <Text style={styles.errorMessageText}>{errorMessage}</Text>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: Colors.violet,
    marginHorizontal: horizontalScale(20),
    borderRadius: moderateScale(8),
    paddingLeft: verticalScale(12),
    marginVertical: verticalScale(20),
  },
  submitBtn: {
    backgroundColor: Colors.pink,
    marginHorizontal: horizontalScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    borderColor: Colors.pink,
    paddingVertical: verticalScale(12),
    marginVertical: verticalScale(20),
  },
  submitText: {
    color: Colors.black,
    alignSelf: 'center',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  errorMessageText: {
    alignSelf: 'center',
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.red,
  },
});
