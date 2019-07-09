import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Button, Text, Keyboard } from 'react-native';
import { LinearGradient } from 'expo'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';
import { SearchBar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';

class DatosPersonales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IdUser: null,
            nombre: null,
            apellido: null,
            email: null,
            isLoading: true,
            genrePosta: null,
            searchBarFocused: false,
            generoEvento: [],
            generoVacio: [],
        };
        this._retrieveData();
    }
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: 'white',
            height: 45,
            borderBottomWidth: 0
        },
        headerTintColor: '#3399ff',
    };
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdUser');
            if (value !== null) {
                this.setState({
                    IdUser: value,
                })
                this.getUserData(this.state.IdUser);
            }
        } catch (error) {
            console.log(error);
        }
    };

    changeGenre = value => {
        this.setState({ genrePosta: value })
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
    changeGenre2() {
        if (this.state.genrePosta != null) {
            if (this.state.generoEvento[0] == null) {
                this.state.generoEvento[0] = this.state.genrePosta
            }
            else {
                this.state.generoEvento.push(this.state.genrePosta)
            }
            ApiController.saveGenre(this.state.IdUser, this.state.generoEvento, this.okChange.bind(this));
        }
    }
    getUserData() {
        ApiController.getUsuario(this.okUserData.bind(this), this.state.IdUser);
    }

    okUserData(data) {
        this.setState({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            generoEvento: data.generoEvento,
            isLoading: false,
        })
    }
    okChange() {
        alert("Your favorite genre was successfully added");
        this.setState({ value: null, genrePosta:null })
        this.getUserData(this.state.IdUser)
    }
    borrarGenero() {
        if(this.state.generoEvento.length!=0)  
        {
            ApiController.saveGenre(this.state.IdUser, this.state.generoVacio, this.okChange.bind(this));
        }
        else{
            alert('There is no genres to erase')
        }
    }
    render() {
        var key = 0
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
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                <View style={[styles.detalleContainer]} >
                    <SearchBar
                        placeholder="Add your favorites genres"
                        platform='ios'
                        onChangeText={value => this.changeGenre(value)}
                        value={this.state.value}
                        containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
                        buttonStyle={{ paddingBottom: 22 }}
                    />
                    <View style={{ alignSelf: 'center', alignItems: 'center', marginBottom: 20, paddingBottom: 30, backgroundColor: '#3399ff', width: 2000 }}>

                        <View style={styles.CircleShapeView}>
                            <Text style={{ fontSize: 50, color: 'white', paddingTop: 45,alignContent: 'center' }}>
                                {this.state.nombre.slice(0, 1).toUpperCase()}
                            </Text>
                        </View>
                        {/* <Image source={require('./FACHA.png')} style={{
                                height: 150,
                                width: 150,
                                resizeMode: 'contain',
                                marginBottom: 30,
                                marginTop: 30
                            }} /> */}
                        <Text style={{ color: 'white', fontSize: 20 }}>{this.state.nombre}{this.state.apellido}</Text>
                        <Text style={{ color: 'white', fontSize: 15 }}>{this.state.IdUser}</Text>
                        <Text style={{ color: 'white', fontSize: 15 }}>{this.state.email}</Text>
                    </View>
                    <ScrollView style={{ alignSelf: 'center', flexDirection: 'row', marginTop:10 }}>
                        <View style={[styles.underline]}>
                            <Text style={[styles.TextUnderline]}>Favorite Genres:</Text>
                        </View>
                        <View>
                            <FlatList
                                style={styles.contentList}
                                columnWrapperStyle={styles.listContainer}
                                data={this.state.generoEvento}
                                keyExtractor={(item) => {
                                    return item;
                                }}
                                renderItem={({ item }) => {
                                    return (<View>
                                        <Text style={[styles.textInput]}>• {item}</Text>
                                    </View>)
                                }} />
                        </View>

                        <View>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                onPress={() => this.borrarGenero()}>
                                <Text style={styles.loginText}>Erase Genres</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                //</LinearGradient>
            )
        }
    }
};

const styles = StyleSheet.create({
    detalleContainer: {
        flex: 1,
        backgroundColor: '#ebf0f7'
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        marginLeft: 20,
    },
    underline: {
        flexDirection: 'row',
    },
    TextUnderline: {
        textDecorationLine: 'underline',
        color: '#3399ff',
        fontSize: 25,
        marginBottom: 10,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        width: 150,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },

    loginButton: {
        backgroundColor: "#3399ff",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    CircleShapeView: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#6666ff',
        marginBottom: 30,
        marginTop: 30,
        alignItems: 'center',
        alignContent: 'center'
      },
})
export default DatosPersonales;