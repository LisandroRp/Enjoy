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
import { Marker } from 'react-native-maps';




class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      markers: [
        {id:'1',  title: "Ac Dc",                         latlng:"",    coords: {
          "accuracy": 5,
          "altitude": 0,
          "altitudeAccuracy": -1,
          "heading": -1,
          "latitude": -34.61152409323304,
          "longitude": -58.38945865631104,
          "speed": -1,
          "key": 1
        }},
        {id:'2',  title: "Los Auntenticos Decadentes",    latlng:"",   coords: {
          "accuracy": 5,
          "altitude": 0,
          "altitudeAccuracy": -1,
          "heading": -1,
          "latitude": -34.611877295266034,
          "longitude": -58.3974838256836,
          "speed": -1,
          "key": 2
        }},
        {id:'3',  title: "Twenty one Pilots",             latlng:"",   coords: {
          "accuracy": 5,
          "altitude": 0,
          "altitudeAccuracy": -1,
          "heading": -1,
          "latitude": -34.60908695824987,
          "longitude": -58.36113452911378,
          "speed": -1,
          "key": 3
        }} ,
        {id:'4',  title: "Duki",                          latlng:"",   coords: {
          "accuracy": 5,
          "altitude": 0,
          "altitudeAccuracy": -1,
          "heading": -1,
          "latitude": -34.60382391547706,
          "longitude": -58.39010238647462,
          "speed": -1,
          "key": 4
        }} ,
      ]
    };
    this.handlePress = this.handlePress.bind(this);
  }
    static navigationOptions = {
        headerStyle: {
          backgroundColor: 'white',
          height:45
        },
        headerTintColor: '#3399ff',
      };
      handlePress(e) {
          console.log(e.nativeEvent.coordinate)
      }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.Mapa} 
                showsUserLocation={true} initialRegion={{
                    latitude: -34.618269992307674,
                    longitude: -58.38224887847901,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={this.handlePress}
          >
    {this.state.markers.map(marker => (
    <Marker
        coordinate={marker.coords}
        title={marker.title}
        description={marker.description}>
        <View style={styles.marker}>
          <Text style={styles.text}>{marker.title}</Text>
        </View>
     </Marker>
    
  ))}

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
  },
  marker:{
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }

})

export default Mapa;