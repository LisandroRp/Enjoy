import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import MapView from 'react-native-maps';



class Mapa extends Component {
    static navigationOptions = {
        headerStyle: {
          backgroundColor: 'white',
          height:50
        },
        headerTintColor: '#3399ff',
      };
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.Mapa} showsUserLocation={true}>

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ebf0f7"
  },
  Mapa:{
      position: 'absolute',
      top: 0,
      left:0,
      bottom: 0,
      right: 0
  }
})

export default Mapa;