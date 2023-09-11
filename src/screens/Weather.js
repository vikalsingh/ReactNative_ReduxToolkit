import {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Images from '../utils/images';
import {Config} from '../utils/Config';
import {Colors} from '../utils/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {useDispatch} from 'react-redux';
import {addCity} from '../redux/WeatherSlice';
import axios from 'axios';

const Weather = () => {
  const dispatch = useDispatch();

  const [responce, setResponce] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {}, []);
  const callCityApi = async text => {
    console.log(Config.API_URL + Config.WEATHER_KEY + '&query=' + text + '');

    // try {
    //     const data = await fetch(Config.API_URL + Config.WEATHER_KEY + '&query=' + text + '');
    //     const res = await data.json();
    //     console.log("respo----", res);
    //     setResponce(res.location);
    //     setWeatherInfo(res.current);
    //     dispatch(addCity(res));
    //     setSearchText('');
    //   } catch (error) {
    //     // TypeError: Failed to fetch
    //     console.log('There was an error', error);
    //     setSearchText('');
    //     setError(error.message);
    //   }

    const params = {
      access_key: Config.WEATHER_KEY,
      query: text,
    };

    await axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log('api', apiResponse);
        if (apiResponse.success === false) {
          setError(apiResponse.error.info);
        } else {
          setResponce(apiResponse.location);
          setWeatherInfo(apiResponse.current);
          dispatch(addCity(apiResponse));
          setSearchText('');
          console.log(
            ` ${apiResponse.current.weather_icons}Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`,
          );
        }
      })
      .catch(error => {
        console.log('ERR', error);
        // setError(error.error.info);
      });
  };
  const handleSearch = () => {
    console.log('se', searchText);
    callCityApi(searchText);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Image source={Images.bellIcon} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={styles.errorMsg}>{error}</Text>
      ) : (
        <>
          {responce ? (
            <>
              <View style={styles.resultView}>
                <View style={styles.resultSubView}>
                  <Text style={styles.label}>City:</Text>
                  <Text style={styles.resultCity}>{responce.name}</Text>
                </View>
                <View style={styles.resultSubView}>
                  <Text style={styles.label}>Country:</Text>
                  <Text style={styles.resultCity}>
                    {responce.state ? responce.state : responce.country}
                  </Text>
                </View>
              </View>
              <View style={styles.resultView}>
                <View style={styles.resultSubView}>
                  <Text style={styles.label}>Local Time:</Text>
                  <Text style={styles.resultCity}>{responce.localtime}</Text>
                </View>
                <View style={styles.resultSubView}>
                  {/* <Text style={styles.label}>Country:</Text> */}
                  <Text style={styles.resultCity}>{responce.timezone_id}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.currWheather}>Current Weather</Text>
              </View>
              <View style={styles.weatherView}>
                <View>
                  {/* <Image
                    source={{uri: weatherInfo?.weather_icons}}
                    style={styles.weatherImg}
                  /> */}
                </View>
                <View>
                  <Text style={styles.weatherText}>
                    {weatherInfo.weather_descriptions}
                  </Text>
                </View>
              </View>
              <View style={styles.weatherView}>
                <View>
                  <Text style={styles.weatherLabel}>Humadity:</Text>
                </View>
                <View>
                  <Text style={styles.weatherText}>{weatherInfo.humidity}</Text>
                </View>
              </View>
              <View style={styles.weatherView}>
                <View>
                  <Text style={styles.weatherLabel}>Wind (kph):</Text>
                </View>
                <View>
                  <Text style={styles.weatherText}>
                    {weatherInfo.wind_speed}
                  </Text>
                </View>
              </View>
              <View style={styles.weatherView}>
                <View>
                  <Text style={styles.weatherLabel}>Temperature:</Text>
                </View>
                <View>
                  <Text style={styles.weatherText}>
                    {weatherInfo.temperature}℃
                  </Text>
                </View>
              </View>
            </>
          ) : null}
        </>
      )}
      {/* <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <View>
              <Image
                source={{uri: item.thumbnail}}
                style={{width: 50, height: 50}}
              />
              <Text>{item.title}</Text>
            </View>
          );
        }}
      /> */}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: Colors.violet,
    padding: moderateScale(10),
    borderRadius: 5,
  },
  resultView: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
  },
  resultSubView: {
    flexDirection: 'row',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  resultCity: {
    color: Colors.orange,
    fontSize: moderateScale(16),
    paddingLeft: verticalScale(6),
    fontWeight: 'bold',
  },
  currWheather: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: verticalScale(10),
  },
  weatherView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(6),
  },
  weatherImg: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  weatherText: {
    fontWeight: '600',
    fontSize: moderateScale(20),
    color: Colors.pink,
  },
  weatherLabel: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: '600',
  },
  errorMsg: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: verticalScale(10),
    color: Colors.red,
  },
});
