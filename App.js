import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {API_KEY} from './utils/WeatherAPIKey';
import MyWeather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    location: '',
    weatherDescription: '',
    details: null,
    sunrise: null,
    sunset: null,
    forecast: null,
    clouds: null,
    wind: null,
    error: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions',
        });
      },
    );
  }

  fetchWeather(lat = 15, lon = 85) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          weatherDescription: json.weather[0].description,
          location: json.name,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          details: json.main,
          clouds: json.clouds.all,
          wind: json.wind,
        });
      })
      .catch(error => console.log(error))
      .then(
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID&APPID=${API_KEY}&units=metric`,
        )
          .then(res => res.json())
          .then(data => {
            this.setState({
              forecast: data.list,
              isLoading: false,
            });
          })
          .catch(error => console.log(error)),
      );
  }

  render() {
    const {isLoading} = this.state;
    console.log(this.state.details);
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <MyWeather
            weather={this.state.weatherCondition}
            // weather={'Clear'}
            temperature={this.state.temperature}
            location={this.state.location}
            description={this.state.weatherDescription}
            details={this.state.details}
            forecast={this.state.forecast}
            sunrise={this.state.sunrise * 1000}
            sunset={this.state.sunset * 1000}
            wind={this.state.wind}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
