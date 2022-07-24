import {Button, Slider} from '@rneui/themed';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomButton, Icons} from '../../components/atoms';
import {addWater} from '../../store/actions';
import Colors from '../../theme/colors';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as DATA from '../../utils/data';

const AddLogScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [quantitySelected, setQuantitySelected] = useState(12);
  const [cupsSelected, setCupsSelected] = useState(1);

  const [value, setValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState();

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
    await setValue(null);
    await setCategoryValue(null);
  };

  const addWaterProgress = async () => {
    if (value != null && categoryValue != null) {
      const ouncesSelected = +(quantitySelected * cupsSelected);
      const updatedDailyConsumption = ouncesSelected;
      let logData = {
        firstName: userAuth.firstName,
        lastName: userAuth.lastName,
        email: userAuth.email,
        waterQty: quantitySelected,
        totalCups: cupsSelected,
        totalWaterSaved: ouncesSelected,
        brand: value,
        category: categoryValue,
      };
      if (ouncesSelected > 0) {
        await dispatch(addWater(logData));
        Alert.alert(
          'Log Added Successfully',
          'Your  cuurent intake is : ' + updatedDailyConsumption + ' OZ',
        );
        resetData();
      }
    } else if (value == null) {
      Alert.alert(
        'Please Enter a Brand',
        'You must select a brand name to Add Log',
      );
    } else if (categoryValue == null) {
      Alert.alert(
        'Please Enter a Category',
        'You must select a Category  to Add Log',
      );
    } else {
      console.log('Validation Error');
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.headerStyle}>Tras.h20</Text>
      <Text style={styles.drowndownLabelStyle}>
        {' <     Please select brand     >'}
      </Text>
      <Dropdown
        activeColor="gray"
        containerStyle={styles.containerDropdownStyle}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DATA.brandDropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select a brand"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
      <Text style={styles.drowndownLabelStyle}>
        {' <     Please select Category     >'}
      </Text>
      <Dropdown
        activeColor="gray"
        containerStyle={styles.containerDropdownStyle}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DATA.categoryDropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        value={categoryValue}
        onChange={item => {
          setCategoryValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
      <View style={styles.pickerSection}>
        <Text style={styles.title}>Your Container Size?</Text>

        <View style={styles.sliderStyle}>
          <Slider
            value={quantitySelected}
            minimumValue={2}
            maximumValue={100}
            step={2}
            thumbTintColor={Colors.accentColorBlue}
            onValueChange={v => setQuantitySelected(v)}
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
    </ScrollView>
  );
};

export default AddLogScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 10,
  },
  drowndownLabelStyle: {
    alignSelf: 'center',
    paddingTop: '5%',
    paddingBottom: '1%',
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginTop: -50,
  },
  androidFocusButtons: {
    margin: 0,
    marginTop: 10,
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
    fontSize: 45,
    color: 'white',
  },
  sliderStyle: {
    width: '70%',
    height: 132,
    margin: 15,
    maxWidth: '60%',
  },
  sliderText: {
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
    //  marginBottom: -30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: 'black',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerDropdownStyle: {
    backgroundColor: 'black',
    marginTop: 20,
    flex: 1,
  },
});
