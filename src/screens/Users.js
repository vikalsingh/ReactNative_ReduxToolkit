import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {moderateScale, verticalScale} from '../utils/Metrics';
import {Colors} from '../utils/Colors';
import {useSelector, useDispatch} from 'react-redux';
import { deleteUser } from '../redux/UserSlice';

const Users = ({navigation}) => {
  const users = useSelector(state => state.user?.userList);
  const dispatch = useDispatch();
  const handleEdit = (item) => {
    navigation.navigate('AddUser', {type: 'edit', data: item});
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  }
  console.log('res');
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={styles.flatlistStyle}
        renderItem={({item, index}) => {
          return (
            <View style={styles.userListView}>
              <View>
                <View style={styles.listingView}>
                  <Text style={styles.labelText}>Name: </Text>
                  <Text style={styles.itemText}>{item?.name}</Text>
                </View>
                <View style={styles.listingView}>
                  <Text style={styles.labelText}>Email: </Text>
                  <Text style={styles.itemText}>{item?.email}</Text>
                </View>
                <View style={styles.listingView}>
                  <Text style={styles.labelText}>Phone: </Text>
                  <Text style={styles.itemText}>{item?.phone}</Text>
                </View>
                <View style={styles.listingView}>
                  <Text style={styles.labelText}>City: </Text>
                  <Text style={styles.itemText}>{item?.city}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.editText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddUser')}
        style={styles.bottomBtn}>
        <Text style={styles.newUserText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomBtn: {
    width: '100%',
    height: verticalScale(50),
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newUserText: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  userListView: {
    borderWidth: 2,
    borderColor: Colors.violet,
    borderRadius: moderateScale(6),
    marginHorizontal: verticalScale(20),
    padding: moderateScale(10),
    marginVertical: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listingView: {
    flexDirection: 'row',
    marginVertical: verticalScale(2),
  },
  labelText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
  },
  itemText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.green,
  },
  editText: {
    color: Colors.red,
    fontWeight: '600',
    marginVertical: verticalScale(10),
    fontSize: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: moderateScale(6),
    padding: moderateScale(6),
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  flatlistStyle: {
    marginBottom: verticalScale(50)
  }
});
