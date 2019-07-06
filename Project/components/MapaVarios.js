import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { SearchBar } from "react-native-elements";
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Marker } from 'react-native-maps';
import ApiController from '../controller/ApiController';

function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    latitude: item.latitude,
    longitude: item.longitude,

  };
}
function createCoord(item) {
  return {
    //key: item._id,
    coordenadas: item.results[0].geometry.location

  };
}

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: props.navigation.getParam('tipo'),
      modalVisible: false,
      userSelected: [],
      idEvento: null,
      isLoading: true,
      eventos: [],
      coordenadasNew: [],
      longitude:-58.38224887847901,
      latitude:-34.618269992307674,
    };
    this.obtenerEventos()
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'white',
      height: 45,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };

  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
  }
  okEventos(data) {
    if (data != null) {
      var i, newArray = [];
      console.log(data)
      for (i = 0; i < data.length; i++) {
        if (this.state.tipo == 'Recomendados') {
          if (data[i].rating >= 4) {
            newArray.push(createData(data[i], i));
          }
        } else {
          if (data[i].tipo == this.state.tipo) {
            newArray.push(createData(data[i], i));
          }
        }
      }
      this.setState({ eventos: newArray, isLoading: false });
    } else {
      alert("Intentar de nuevo")
    }
  }
  okCoordenadas(data) {
    if (data != null) {
      var i, newArray = [];
      //console.log(data)
            newArray=createCoord(data)
        
        console.log(newArray)
      this.setState({ coordenadasNew: newArray, longitude:newArray.lng, latitude: newArray.lat});
    } else {
      alert("Intentar de nuevo")
    }
  }
  handlePress(e) {
    console.log(e.nativeEvent.coordinate)
  }
  searchEvent(direccion){
    var result=[]
      result[0]= ApiController.getCoordenadas(direccion,this.okCoordenadas.bind(this))
  };
  createMarker(marker) {
    console.log(marker)
    console.log('holaaa')
    Pos = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    }
    return Pos;
  }
  newKey() {
    var newKey = this.state.key++
    this.setState({ key: newKey })
    return newKey;
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
        <View>
        <SearchBar
              placeholder={this.state.idEvento}
              platform='ios'
              onChangeText={value => this.searchEvent(value)}
              value={this.state.value}
              containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
              buttonStyle={{ paddingBottom: 22 }}
            />
            </View>
          <MapView style={styles.Mapa}
            showsUserLocation={true} initialRegion={{
              latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
            }}
            onPress={this.handlePress}
          >
            {this.state.eventos.map(marker => (
              <Marker
                key={marker.key}
                coordinate={this.createMarker(marker)}
                title={marker.nombre}
                description={marker.ubicacion}>
                <Image style={{ width: 33, height: 33 }}
                  source={{ uri: "https://img.icons8.com/color/96/000000/marker.png" }} />
                {/* <View style={styles.marker}>
          <Text style={styles.text}>{marker.title}</Text>
          <Text>Hola Perreques</Text>
        </View> */}
              </Marker>

            ))}

          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  Mapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }

})

export default withNavigation(Mapa);