import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

const DataList = () => {
  const [data, setData] = useState();

  const featchData = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(responce => responce.json())
      .then(responceData => setData(responceData));

    console.log('dada', data);
  }, []);

  useEffect(() => {
    featchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      {data ? (
        <React.Fragment>
          <FlatList
            data={data}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={item => item.id}
          />
        </React.Fragment>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default DataList;
