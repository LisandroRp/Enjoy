import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import ApiController from '../controller/ApiController'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo'


function createData(item) {
    return {
        key: item.imdbID,
        poster: item.Poster,
        title: item.Title,
        id: item.imdbID,
    };
}


class Peliculas extends Component {
    static navigationOptions = {
        title: 'Peliculas',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state = {
            peliculas: [],
            nombre: 'america',
            idUser: props.navigation.getParam('idUser')
        };

        this._storeData(this.state.idUser);
        this.obtenerPeliculas()

    }

    obtenerPeliculas() {
        ApiController.getPeliculas(this.okPeliculas.bind(this), this.state.nombre);
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('idUser', this.state.idUser);
        } catch (error) {
            console.log(error);
        }
    };

    okPeliculas(data) {
        if (data != null) {
            var i, newArray = [];
            for (i = 0; i < data.length; i++) {
                newArray.push(createData(data[i], i));
            }
            this.setState({ peliculas: newArray });
        } else {
            alert("Intentar de nuevo")
        }
        this._storeData(this.state.idUser);
    }

    render() {
        return (
            <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                <View style={[styles.detalleContainer]}>
                    <ScrollView>
                        <View style={[styles.detalleContainer]} >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.outterInput]}>
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder="Buscar por titulo"
                                        onChangeText={(text) => this.setState({ nombre: text })}
                                        onSubmitEditing={() => this.obtenerPeliculas()}
                                    />
                                </View>
                                <View style={[styles.outterButton]}>
                                    <TouchableOpacity
                                        style={styles.SubmitButtonStyle}
                                        activeOpacity={.5}
                                        onPress={() => this.obtenerPeliculas()}>
                                        <Text style={styles.textButton}> Buscar </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                style={{ flex: 1 }}
                                numColumns={2}
                                data={this.state.peliculas}
                                keyboardShouldPersistTaps='always'
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flex: 1, margin: 10 }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => this.props.onPress(item.id, this.state.idUser)}>
                                                <Image style={[styles.imagen1]}
                                                    source={{ uri: item.poster }}
                                                ></Image>
                                                <Text
                                                    style={[styles.texto]}
                                                    numberOfLines={2}
                                                    ellipsizeMode={"tail"}
                                                >{item.title}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>

        );
    }

};

const styles = StyleSheet.create({
    buttonOuterLayout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    pos: {
        flex: 1
    },
    imagen1: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        borderRadius: 20,

    },

    toolBar: {
    },

    detalleContainer: {
        flex: 1,

        justifyContent: 'center',
    },
    texto: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',

    },
    outterInput: {
        flex: 3,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginHorizontal: 30,
        marginBottom: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    textInput: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },

    SubmitButtonStyle: {
        width: 70,
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 0,
        marginRight: 20,
        backgroundColor: '#373737',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#fff'
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },

})

export default withNavigation(Peliculas);
