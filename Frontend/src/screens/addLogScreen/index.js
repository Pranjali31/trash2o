import {Button, Slider} from '@rneui/themed';
import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomButton, Icons} from '../../components/atoms';
import {addWater} from '../../store/actions';
import Colors from '../../theme/colors';

const AddLogScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [quantitySelected, setQuantitySelected] = useState(12);
  const [cupsSelected, setCupsSelected] = useState(1);

  const userAuth = useSelector(state => state.trashApp.userAuth);

  const updateMultiplier = async direction => {
    if (direction === 'more') {
      await setCupsSelected(cupsSelected + 1);
    }
    if (direction === 'less') {
      if (cupsSelected > 1) {
        await setCupsSelected(cupsSelected - 1);
      }
    }
  };

  const resetData = async () => {
    await setQuantitySelected(12);
    await setCupsSelected(1);
  };

  const addWaterProgress = async () => {
    const ouncesSelected = +(quantitySelected * cupsSelected);
    const updatedDailyConsumption = ouncesSelected;
    let logData = {
      email: userAuth.email,
      waterQty: quantitySelected,
      totalCups: cupsSelected,
      totalWaterSaved: ouncesSelected,
    };
    if (ouncesSelected > 0) {
      await dispatch(addWater(logData));
      Alert.alert(
        'Log Added Successfully',
        'Your  cuurent intake is : ' + updatedDailyConsumption + ' OZ',
      );
      resetData();
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerStyle}>Tras.h20</Text>
      <View style={styles.pickerSection}>
        <Text style={styles.title}>Your Container Size?</Text>

        <View style={styles.sliderStyle}>
          <Slider
            value={quantitySelected}
            minimumValue={2}
            maximumValue={100}
            step={2}
            thumbTintColor={Colors.accentColorBlue}
            onValueChange={value => setQuantitySelected(value)}
          />
          <Text style={styles.sliderText}>{quantitySelected}oz</Text>
        </View>
      </View>
      <View style={styles.quantitySection}>
        <Text style={styles.title}>How Many?</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => {
              updateMultiplier('less');
            }}>
            <Icons
              name="minuscircle"
              type={'antdesign'}
              size={50}
              color={Colors.accentColorBlue}
            />
          </CustomButton>
          <Text style={styles.quantityText}>{cupsSelected}</Text>
          <CustomButton
            onPress={() => {
              updateMultiplier('more');
            }}>
            <Icons
              name="pluscircle"
              type={'antdesign'}
              size={50}
              color={Colors.accentColorBlue}
            />
          </CustomButton>
        </View>
      </View>
      <View style={styles.androidFocusButtons}>
        <View>
          <Button
            title="Add to Log"
            style={styles.focusButton}
            color={Colors.accentColorBlue}
            onPress={addWaterProgress}
          />
        </View>
        <View>
          <Button
            title="Reset Log"
            style={styles.focusButton}
            color={Colors.accentColorBlue}
            buttonStyle={{backgroundColor: Colors.lightRed}}
            onPress={() => resetData()}
          />
        </View>
      </View>
    </View>
  );
};

export default AddLogScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  androidFocusButtons: {
    margin: 0,
    paddingLeft: '20%',
    paddingRight: '20%',
    padding: '1%',
    paddingBottom: '5%',
    paddingVertical: '5%',
  },
  focusButton: {
    width: '100%',
    margin: 0,
    paddingLeft: '20%',
    paddingRight: '20%',
    color: Colors.accentColorBlue,
    padding: '1%',
    paddingBottom: '5%',
    marginVertical: '1%',
  },
  pickerSection: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantitySection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    // fontFamily: 'inconsolata-regular',
    fontSize: 50,
    color: 'white',
  },
  sliderStyle: {
    width: '70%',
    height: 132,
    margin: 15,
    maxWidth: '60%',
  },
  sliderText: {
    // fontFamily: 'inconsolata-regular',
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%',
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '40%',
  },
  headerStyle: {
    alignSelf: 'center',
    fontSize: 30,
    marginBottom: -30,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
