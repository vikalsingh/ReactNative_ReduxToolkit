import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {Colors} from '../utils/Colors';
import Images from '../utils/images';
import {useDispatch} from 'react-redux';
import {addSearchData} from '../redux/searchSlice';
import {useNavigation} from '@react-navigation/native';

const DataList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResult;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    console.log('start-', e);
    setStarted(true);
  };
  const onSpeechEnd = e => {
    console.log('end-', e);
    setEnded(true);
    setStarted(false);
  };
  const onSpeechResult = e => {
    console.log('fit in box: ', e.value, e.value[0]);
    setResults(e.value);
    setSearchText(e.value[0]);
    dispatch(addSearchData(e.value[0]));
  };
  const startVoiceRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setStarted(false);
      setEnded(false);
      setResults([]);
    } catch (error) {
      console.log(error);
    }
  };
  const stopVoiceRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted(false);
      setEnded(false);
      setResults([]);
      setSearchText('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    console.log('se', searchText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textlabel}>Voice to text recognizing!!</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => startVoiceRecognizing()}>
          <Image
            source={Images.micIcon}
            style={[
              styles.micStyle,
              {tintColor: started ? Colors.green : Colors.violet},
            ]}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => startVoiceRecognizing()}>
        <Image source={Images.micIcon} style={styles.mic} />
      </TouchableOpacity> */}

      {/* <View style={styles.textAction}>
        <Text>Started: {started ? 'S' : null}</Text>
        <Text>Ended: {ended ? 'E' : null}</Text>
      </View> */}
      {/* <ScrollView style={styles.scroltext}>
        {
          results.map(item => {
            return(
              <Text style={styles.resultText}>{item}</Text>
            )
          })
        }
      </ScrollView> */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchData'), setSearchText('');
          }}>
          <Text style={styles.stopText}>Search Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopVoiceRecognizing()}>
          <Text style={styles.stopText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DataList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: verticalScale(20),
  },
  textlabel: {
    fontSize: moderateScale(16),
    color: Colors.black,
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(5),
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    paddingLeft: verticalScale(8),
  },
  input: {
    flex: 1,
  },
  button: {
    // backgroundColor: Colors.violet,
    padding: moderateScale(10),
    borderRadius: 5,
  },
  micStyle: {
    width: 35,
    height: 35,
  },
  mic: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginTop: verticalScale(20),
  },
  textAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(40),
    width: '100%',
  },
  stopText: {
    alignItems: 'center',
    fontSize: moderateScale(20),
    backgroundColor: Colors.pink,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: 6,
  },
  resultText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.black,
  },
  scroltext: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(60),
  },
  buttonRow: {
    width: '100%',
    paddingHorizontal: horizontalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
