import React, { Component } from 'react';
import { View, Image, StyleSheet,ActivityIndicator, TextInput, Button, Text,Keyboard} from 'react-native';
import { LinearGradient } from 'expo'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';

class DatosPersonales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IdUser: null,
            nombre: null,
            apellido: null,
            email: null,
            isLoading: true,
            genrePosta:null,
            searchBarFocused: false,
        };
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdUser');
            if (value !== null) {
                this.setState({
                    IdUser: value,
                    isLoading: false
                })
                this.getUserData(this.state.IdUser);
            }
        } catch (error) {
            console.log(error);
        }
    };

    changeGenre= value => {
        this.setState({genrePosta:value})
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
        this.changeGenre2()
      }
      changeGenre2(){
        if(this.state.genrePosta!=null){
            console.log(this.state.IdUser)
            console.log(this.state.genrePosta)
            ApiController.saveGenre(this.state.IdUser, this.state.genrePosta,this.okChange.bind(this));
      }}
    getUserData() {
        ApiController.getUsuario(this.okUserData.bind(this), this.state.IdUser);
    }

    okUserData(data) {
        this.setState({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            genre: data.genre,
        })
    }
    okChange() {
        alert("Se cambio con exito su genero favorito");
    }
    render() {
        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.detalleContainer}>
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
                //</View>
                // </LinearGradient>
            );
        } else {
            return (
                <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                    <View style={[styles.detalleContainer]} >
                        <View style={{ alignSelf: 'center', marginBottom: 50 }}>
                            <Image source={require('./FACHA.png')} style={{
                                height: 150,
                                width: 150,
                                resizeMode: 'contain',
                                marginBottom: 30
                            }} />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <View style={[styles.underline]}>
                                <Text style={[styles.TextUnderline]}>Nombre:</Text>
                                <Text style={[styles.textInput]}>{this.state.nombre}</Text>
                            </View>
                            <View style={[styles.underline]}>
                                <Text style={[styles.TextUnderline]}>Apellido:</Text>
                                <Text style={[styles.textInput]}>{this.state.apellido}</Text>
                            </View>
                            <View style={[styles.underline]}>
                                <Text style={[styles.TextUnderline]}>E-Mail:</Text>
                                <Text style={[styles.textInput]}>{this.state.email}</Text>
                            </View>
                            <View style={[styles.underline]}>
                                <Text style={[styles.TextUnderline]}>Usuario:</Text>
                                <Text style={[styles.textInput]}>{this.state.IdUser}</Text>
                            </View>
                            <View style={[styles.underline]}>
                            <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} onChangeText={value => this.changeGenre(value)} />
                            </View>
                            <View style={[styles.underline]}>
                            <Text style={[styles.TextUnderline]}>Generos Favoritos:</Text>
                                <Text style={[styles.textInput]}>{this.state.genre}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            )
        }
    }
};

const styles = StyleSheet.create({
    detalleContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    textInput: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    },
    underline: {
        flexDirection: 'row',
    },
    TextUnderline: {
        textDecorationLine: 'underline',
        color: 'white',
        fontSize: 20,
        width: 80,
    }
})
export default DatosPersonales;