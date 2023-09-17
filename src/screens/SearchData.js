import {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {horizontalScale, verticalScale} from '../utils/Metrics';

const SearchData = () => {
  const [list, setList] = useState([]);
  const data = useSelector(store => store.searchData.searchData);
  console.log('data', data);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Data</Text>
      {data.map(item => {
        return (
          <View style={styles.datatext}>
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default SearchData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    textAlign: 'center',
    marginTop: verticalScale(8),
    fontWeight: '600',
  },
  datatext: {
    marginHorizontal: horizontalScale(20),
  }
});
