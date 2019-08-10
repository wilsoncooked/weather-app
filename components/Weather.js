import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {weatherConditions} from '../utils/WeatherConditions';
import {LinearGradient} from 'expo-linear-gradient';
import Moment from 'react-moment';

const Weather = ({
  weather,
  temperature,
  location,
  description,
  details,
  forecast,
  sunrise,
  sunset,
  wind,
}) => {
  // if (forecast) {
  //   console.log(forecast);
  // }
  const moment = require('moment');
  let tSunrise = moment(sunrise).format('h:mm');
  let tSunset = moment(sunset).format('h:mm');
  var d2d = require('degrees-to-direction');

  const currentConditions = weatherConditions;
  return weather !== null ? (
    <LinearGradient colors={currentConditions[weather].color} style={{flex: 1}}>
      <View style={styles.weatherContainer}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>{location}</Text>
          <Text style={styles.title}>{description}</Text>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            size={250}
            name={currentConditions[weather].icon}
            color={'#fff'}
          />
        </View>
        <View style={styles.weatherDetails}>
          <View style={styles.detailsLeft}>
            <Text style={styles.tempText}>{Math.round(temperature)}°</Text>
            <Text style={styles.maxMinText}>
              H {Math.round(details.temp_max)} L {Math.round(details.temp_min)}
            </Text>
          </View>
          <View style={styles.detailsRight}>
            <Text style={styles.maxMinText}>Humidity {details.humidity}</Text>
            <Text style={styles.maxMinText}>
              Wind {wind.speed} {d2d(20)}
            </Text>
            <Text style={styles.maxMinText}>Sunrise {tSunrise}</Text>
            <Text style={styles.maxMinText}>Sunset {tSunset}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  ) : null;
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 15,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  tempText: {
    fontSize: 72,
    color: '#fff',
  },
  maxMinText: {
    fontSize: 20,
    color: '#fff',
  },
  icon: {
    flex: 2,
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'center',
  },
  weatherDetails: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    margin: 50,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  detailsLeft: {},
  detailsRight: {
    marginTop: 12,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  title: {
    fontSize: 45,
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Weather;
