import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ApiController from '../controller/ApiController'
import { AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo'

function createData(item, idArray) {
    return {
        key: item.imdbID,
        poster: item.Poster,
        title: item.Title,
        id: item.imdbID,
    };
}

class Series extends Component {
    static navigationOptions = {
        title: 'Series',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state = {
            series: [],
            nombre: 'breaking',
            idUser: null,
        };
        this._retrieveData();
        this.obtenerSeries();
    }


    obtenerSeries() {
        ApiController.getSeries(this.okSeries.bind(this), this.state.nombre);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('idUser');
            if (value !== null) {
                this.setState({
                    idUser: value
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    okSeries(data) {
        var i, newArray = [];
        for (i = 0; i < data.length; i++) {
            newArray.push(createData(data[i], i));
        }
        this.setState({ series: newArray });
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
                                        onSubmitEditing={() => this.obtenerSeries()}
                                    />
                                </View>
                                <View style={[styles.outterButton]}>
                                    <TouchableOpacity
                                        style={styles.SubmitButtonStyle}
                                        activeOpacity={.5}
                                        onPress={() => this.obtenerSeries()}>
                                        <Text style={styles.textButton}> Buscar </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                style={{ flex: 1 }}
                                numColumns={2}
                                data={this.state.series}
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
        )
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
        textAlign: 'center'
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

export default Series;