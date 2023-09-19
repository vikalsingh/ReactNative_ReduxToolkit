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
import {Config} from '../utils/Config';
import openai from '../utils/openai';

const DataList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [searchText, setSearchText] = useState('');
  const apiKey = Config.CHATGPT_KEY;

  const handleSearch = async () => {
    const gptQuery = 'Suggest some data related to this text: ' + searchText;
    const gptResults = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: 'Say this is a team.',
      max_tokens: 7,
      temperature: 0,
    });

    // if (!gptResults.choices) {
    //   // TODO: Write Error Handling
    // }
    console.log('GPT: ', gptResults);
    // console.log(gptResults.choices?.[0]?.message?.content);
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     prompt: searchText,
    //     max_tokens: 50, // Adjust the number of tokens as needed
    //   }),
    // };

    // fetch(
    //   'https://api.openai.com/v1/engines/davinci/completions',
    //   requestOptions,
    // )
    //   .then(response => {
    //     console.log("gpt response: ", response);
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log("gpt: ", data);
    //     setSearchResults(data.choices[0].text);
    //   })
    //   .catch(error => {
    //     console.error('Error making API request:', error);
    //   });
  };

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
    setSearchText(e.value[0]);
    dispatch(addSearchData(e.value[0]));
  };
  const startVoiceRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setStarted(false);
      setEnded(false);
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
      setSearchText('');
    } catch (error) {
      console.log(error);
    }
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
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchData'), setSearchText('');
          }}>
          <Text style={styles.stopText}>Search Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearch()}>
          <Text style={styles.stopText}>GPT</Text>
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
