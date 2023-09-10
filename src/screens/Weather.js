import {useState, useEffect} from 'react';
import {Image, View, FlatList, Text} from 'react-native';
import Images from '../utils/images';
import { Config } from '../utils/Config';

const Weather = () => {
  const [responce, setResponce] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");

  console.log(Config.WEATHER_KEY);

  useEffect(() => {
    callCityApi();
  }, []);
  const callCityApi = async () => {
    const data = await fetch(Config.API_URL + 'q=London&limit=1&appid='+Config.WEATHER_KEY+'');
    const res = await data.json();
    setResponce(res[0]);
    console.log(res[0].name);
  };
  return (
    <View style={{flex: 1}}>
    <Text>City:</Text><Text>{responce.name}</Text>
    <Text>Country:</Text><Text>{responce.state}</Text>
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
