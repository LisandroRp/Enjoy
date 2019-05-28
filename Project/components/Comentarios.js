import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';


function createData(item) {
  return {
    nombre: item.nombre,
    descripcion: item.descripcion,
    fechaComentario: item.fechaComentario,
    peliculaNombre: item.peliculaNombre,
    idPelicula: item.peliculaId,
  }
}

class Comentarios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idUser: null,
      isLoading: true,
      comentarios: [],
    }
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('idUser');
      if (value !== null) {
        this.setState({
          idUser: value
        })
        this.getComments(this.state.idUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getComments(idUser) {
    ApiController.getCommentByIdUser(idUser, this.okComments.bind(this));
  }

  okComments(data) {
    if (data != null) {

      var i, comentarios = [];
      for (i = 0; i < data.length; i++) {
        comentarios.push(createData(data[i], i));
      }
      this.setState({
        comentarios: comentarios,
        isLoading: false,
        isFetching: false,
      });

    } else {
      //alert("Intentar de nuevo")
    }
  }

  pasarDetalle(idMovie, idUser) {
    this.props.navigation.navigate('Detalle', { id: idMovie, idUser: idUser })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
          <View style={styles.detalleContainer}>
            <ActivityIndicator size="large" color="pink" style={{ flex: 1 }}></ActivityIndicator>
          </View>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
          <View style={[styles.detalleContainer]}>

            <FlatList
              data={this.state.comentarios}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.pasarDetalle(item.idPelicula, this.state.idUser)}
                  >
                    <FlatListItems item={item} index={index}>
                    </FlatListItems>
                  </TouchableOpacity>
                );
              }}
            >
            </FlatList>

          </View>
        </LinearGradient>
      )
    }
  }

}


class FlatListItems extends Component {
  render() {
    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10
      }}>
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
          <View style={styles.CircleShapeView}>
            <Text style={{ fontSize: 15, color: 'white', marginTop: 5 }}>
              {this.props.item.nombre.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
            <View>
              <Text style={{
                color: 'black',
                padding: 5,
                fontSize: 20,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
                {this.props.item.peliculaNombre}
              </Text>
            </View>
            <View>
              <Text style={{
                color: 'black',
                paddingTop: 3,
                paddingLeft: 5,
                paddingBottom: 5,
                fontSize: 12,
              }}>
                {this.props.item.fechaComentario}
              </Text>
            </View>
          </View>

        </View>


        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginVertical: 5,
          }}
        />
        <Text style={styles.FlatListItems}>
          {this.props.item.descripcion}
        </Text>
      </View>

    );

  }
}



const styles = StyleSheet.create({
  detalleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  CircleShapeView: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#00BCD4',
    marginTop: 15,
    alignItems: 'center',
    alignContent: 'center'
  },
  FlatListItems: {
    color: 'black',
    padding: 10,
    fontSize: 16,
  },
})

export default withNavigation(Comentarios);