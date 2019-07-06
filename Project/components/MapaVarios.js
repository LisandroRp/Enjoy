import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Keyboard,
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
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";

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
      longitude: -58.38224887847901,
      latitude: -34.618269992307674,
      markerOk: false,
      searchBarFocused: false,
      regionPosta:null,
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
      newArray = createCoord(data)

      console.log(newArray)
      this.setState({ coordenadasNew: newArray, longitude: newArray.coordenadas.lng, latitude: newArray.coordenadas.lat });
      // console.log(this.state.longitude)
      // console.log(this.state.latitude)
    } else {
      alert("Intentar de nuevo")
    }
  }
  handlePress(e) {
    console.log(e.nativeEvent.coordinate)
  }
  createMarker(marker) {
    //console.log(marker)
    //console.log('holaaa')
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
  searchEvent2(){
    if(this.state.regionPosta!=null){
    ApiController.getCoordenadas(this.state.regionPosta, this.okCoordenadas.bind(this))
  }
  };
  searchEvent= value => {
    this.setState({regionPosta:value})
    this.setState({ value })
  }
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }
  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }
  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }
  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
    this.searchEvent2()
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
          {/* <View style={{ height: 50, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5 }}>

            <Animatable.View style={{ height: 30, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center', borderRadius: 45, }}>
              <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={1000}>
                <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={{ fontSize: 24 }} />
              </Animatable.View>
              <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} onChangeText={value => this.searchEvent2(value)} />
            </Animatable.View> 
            </View>
            */}
            <SearchBar
              placeholder="Search"
              platform='ios'
              onChangeText={value => this.searchEvent(value)}
              value={this.state.value}
              containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
              buttonStyle={{ paddingBottom: 22 }}
            />
          <MapView style={{backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'red', position: 'absolute', top: 50, left: 0, bottom: 0, right: 0 }}
            showsUserLocation={true} initialRegion={{
              longitude: -58.38224887847901,
              latitude: -34.618269992307674,
              // longitude: this.state.longitude,
              // latitude: this.state.latitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              longitude: this.state.longitude,
              latitude: this.state.latitude,
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
    top: 50,
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