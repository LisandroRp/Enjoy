import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
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
  ScrollView
} from 'react-native';

function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    //imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
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
      eventos: []
    };
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
      this.setState({ eventos: newArray });
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
            return (
              <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.count}>{item.descripcion}</Text>
                  <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener(JSON.stringify(id))}>
                    <Text style={styles.followButtonText}>Explore now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
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
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
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
    color: "#dcdcdc",
    fontSize: 12,
  },
})

export default withNavigation(Craigslist);