import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';
import ResponsiveImage from 'react-native-responsive-image';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { WheelPicker } from 'react-native-wheel-picker-android';
import LinearGradient from 'react-native-linear-gradient';

import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import CommonStyles, {
  deviceHeight,
  deviceWidth,
  shadowOpt,
  blueGradient
} from '../styles/CommonStyles';
import { singleScreenNavigation, noNavTabbarNavigation } from '../styles/navigatorStyle';
import SingleScreenCustomNavbar from '../elements/SingleScreenCustomNavbar';

export default class StartHeightScreen extends Component {
  static navigatorStyle = singleScreenNavigation;

  constructor(props) {
    super(props);
  }

  onHeightSelected(index) {
  }

  onUnitSelected(index) {
  }

  render() {
    let heightItems = [];
    for(let i = 1; i <= 200; i++) {
      heightItems.push(i.toString());
    }

    let units = ['Cm'];

    return (
      <View style={CommonStyles.normalPage}>
        <SingleScreenCustomNavbar
          navigator={this.props.navigator}
          rightButtons={
            [
              {
                key: 1,
                buttonAction: this._handleClickNext.bind(this),
              },
            ]
          }
        />
        <LinearGradient
          start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
          colors={['rgb(130,160,246)', 'rgb(130,160,247)']}
          style={CommonStyles.selectedOption} />
        <View style={CommonStyles.labelField}>
          <Text style={[
            CommonStyles.headerText,
            CommonStyles.greyColor,
            CommonStyles.mediumBold
          ]}>
            YOUR HEIGHT
          </Text>
        </View>
        <View style={[CommonStyles.pickerBox, {justifyContent: 'space-between'}]}>
          <WheelPicker
            onSelected={(event)=>this.onHeightSelected(event)}
            isCurved={false}
            isCyclic
            selectedItemPosition={178}
            selectedItemTextColor={'#FAFAFA'}
            data={heightItems}
            itemTextSize={24}
            style={{width: deviceWidth/3}}
          />
          <WheelPicker
            onSelected={(event)=>this.onUnitSelected(event)}
            isCurved={false}
            selectedItemTextColor={'#FAFAFA'}
            data={units}
            itemTextSize={24}
            style={{width: deviceWidth/3}}
          />
        </View>
        <View style={[CommonStyles.buttonBox, {marginBottom: 20}]}>
          <GradientButton
            onPressButton={this._handleClickNext.bind(this)}
            setting={shadowOpt}
            btnText="NEXT"
          />
        </View>
      </View>
    );
  }

  _handleClickNext() {
    const createTabs = () => {
      let tabs = [
        {
          screen: 'Healer.MainServiceScreen',
          icon: require('../../img/one.png'),
          navigatorStyle: noNavTabbarNavigation,
        },
        {
          screen: 'Healer.DrugScreen',
          icon: require('../../img/healer/drugs.png'),
          navigatorStyle: noNavTabbarNavigation,
        },
        {
          screen: 'Healer.ListDoctorsScreen',
          icon: require('../../img/healer/doctors.png'),
          navigatorStyle: noNavTabbarNavigation,
        },
        {
          screen: 'Healer.DashboardTestIndicatorsScreen',
          icon: require('../../img/healer/dashboard.png'),
          navigatorStyle: noNavTabbarNavigation,
        },
        {
          screen: 'Healer.UserProfileScreen',
          icon: require('../../img/healer/profile.png'),
          navigatorStyle: noNavTabbarNavigation,
        }
      ];
      return tabs;
    };

    Navigation.startTabBasedApp({
      tabs: createTabs(),
      appStyle: {
        orientation: 'portrait',
        tabBarHidden: true,
      },
      drawer: {
        left: {
          screen: 'Healer.SideMenu'
        }
      },
      animationType: 'slide-down'
    });
  }
}
