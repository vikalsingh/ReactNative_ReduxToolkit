import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {questionSet} from './../utils/Questions';
import QuestionItem from './QuestionItem';
import {Colors} from '../utils/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
const {height, width} = Dimensions.get('window');
const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(questionSet);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const OnSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  const getTextScore = () => {
    let marks = 0;
    questions.map(item => {
      if (item.marked !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };
  const reset = () => {
    const tempData = questions;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  return (
    <View style={styles.container}>
      <View style={styles.qheader}>
        <Text style={styles.quesCount}>
          English Questions :{' ' + currentIndex + '/' + questionSet.length}
        </Text>
        <Text
          style={styles.resetText}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({animated: true, index: 0});
          }}>
          Reset
        </Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={questions}
          renderItem={({item, index}) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={[
            styles.btnTouch,
            {backgroundColor: currentIndex > 1 ? 'purple' : 'gray'},
          ]}
          onPress={() => {
            console.log(parseInt(currentIndex) - 1);
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 2,
              });
            }
          }}>
          <Text style={styles.btnText}>Previous</Text>
        </TouchableOpacity>
        {currentIndex == 8 ? (
          <TouchableOpacity
            style={styles.submitTouch}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              console.log(currentIndex);
              if (questions[currentIndex - 1].marked !== -1) {
                if (currentIndex < questions.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.scoreView}>
            <Text style={styles.scoreText}>Text Score</Text>
            <Text style={styles.scoreValue}>{getTextScore()}</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  qheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  quesCount: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginLeft: horizontalScale(20),
    color: Colors.black,
  },
  resetText: {
    marginRight: horizontalScale(20),
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Colors.black,
  },
  listView: {
    marginTop: verticalScale(30),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: verticalScale(50),
    width: '100%',
  },
  btnTouch: {
    width: '30%',
    paddingVertical: verticalScale(16),
    borderRadius: 10,
    marginLeft: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
  },
  submitTouch: {
    backgroundColor: Colors.green,
    width: '30%',
    paddingVertical: verticalScale(16),
    borderRadius: 10,
    marginRight: horizontalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    backgroundColor: Colors.violet,
    paddingVertical: verticalScale(16),
    width: '30%',
    borderRadius: 10,
    marginRight: horizontalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreView: {
    backgroundColor: Colors.white,
    width: '90%',
    borderRadius: 10,
  },
  scoreText: {
    fontSize: moderateScale(30),
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  scoreValue: {
    fontSize: moderateScale(40),
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: verticalScale(20),
    color: Colors.green,
  },
  closeBtn: {
    alignSelf: 'center',
    height: 40,
    padding: moderateScale(10),
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: verticalScale(20)
  },
});
