import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import ApiController from '../controller/ApiController'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';

function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    precioE: item.precioE,
  };
}

class Craigslist extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      IdUser: props.navigation.getParam('IdUser'),
      searchStatus: 'none',
      Status: 'none',
      modalVisible: false,
      userSelected: [],
      eventos: [],
      isLoading: true,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    this._storeData(this.state.IdUser);
    this.obtenerEventos()
    
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'white',
      height: 50
    },
  };
  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
}
okEventos(data) {
  if (data != null) {
      var i, newArray = [];
      console.log(data)
      for (i = 0; i < data.length; i++) {
          newArray.push(createData(data[i], i));
      }
      this.setState({ eventos: newArray, isLoading: false});
  } else {
      alert("Intentar de nuevo")
  }
  this._storeData(this.state.idUser);
}

  _storeData = async () => {
    try {
        await AsyncStorage.setItem('IdUser', this.state.IdUser);
    } catch (error) {
        console.log(error);
    }
};

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. ' + JSON.stringify(item));
  }
  render() {
    if (this.state.isLoading) {
      return (
          //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
          //<View style={styles.container}>
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
          //</View>
          // </LinearGradient>
      );
  } else {
    return (
      <View style={styles.container}>
      <Text>{this.state.IdUser}</Text>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.eventos}
          // keyExtractor={(item) => {
          //   return item.id;
          // }}
          renderItem={({ item }) => {
            if(item.rating >= 4){
            return (
              <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                <View  style={{flexDirection:"row"}} >
                 <Image style={styles.image} source={{ uri: item.imagen }} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.count}>{item.ubicacion}</Text>
                  <Text style={{fontSize: 11}}>Entrada General: {item.precioE}$</Text>
                  </View>
                  <View  style={{flexDirection:"column", alignItems:'center', paddingLeft:300, paddingTop:15, position: 'absolute'}} >
                  <Image style={styles.StarImage} source={{uri: this.Star }} />
                  <Text style={styles.followButtonText}>{item.rating}/5</Text>
                  </View>
                  </View>
              </TouchableOpacity>
            )
            }
          }} />
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection:"column"
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    paddingTop:12,
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    paddingBottom:11,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "black",
    fontSize: 20,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
},
})

export default withNavigation(Craigslist);