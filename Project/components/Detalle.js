import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, FlatList, ActivityIndicator, Modal, TextInput, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import ApiController from '../controller/ApiController';
import { LinearGradient } from 'expo'

var { height, width } = Dimensions.get('window');

function createData(item) {
    return {
        nombre: item.nombre,
        descripcion: item.descripcion,
        fechaComentario: item.fechaComentario,
    };
}
class Detalle extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: 123,
            detalle: {
                "title": 'AcDc',
                "year": "2019-03-04",
                "synapsi": "Re copada la banduli de rock",
                "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkzHiLqaw3MedLtDd7EPKBlqhPW1IJE9jRFC1je3lLo79mDQ-",
                "genre": "Rock",
                "rating": "10",
                "runtime": "165",
                "webSite": "www.queti.com"
            },
            isLoading: true,
            modalVisible: false,
            //text: "",
            idUser: props.navigation.getParam('idUser'),
            comentarios: [],
        }
    }

    static navigationOptions = {
        title: 'Detalles',
        headerStyle: {
            backgroundColor: 'white',
            height: 50
        },
        headerTintColor: '#3399ff',
    };
    /*
        static navigationOptions = {
            title: 'Detalle',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: 'pink',
        };
    */
    componentDidMount() {
        this.cargarDetalle();
        //this.cargarComentarios();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    /*
        insertarComentario() {
            if (this.state.idUser != null && this.state.id != null && this.state.text != null) {
                ApiController.createComment(this.state.idUser, this.state.id, this.state.text, this.state.detalle.title, this.okComentario.bind(this));
            }
        }
    
        okComentario() {
            alert("Se guardo tu comentario");
            this.setState({ modalVisible: false });
            this.cargarComentarios();
        }
    */


    cargarDetalle() {
        //ApiController.getDetalle(this.okDetalle.bind(this), this.state.id);
        this.okDetalle(this.state);
    }

    okDetalle(data) {
        if (data != null) {
            this.setState({
                //detalle: data,
                isLoading: false
            });
        } else {
            alert("Intentar de nuevo")
        }
    }
    /*
        cargarComentarios() {
            //ApiController.getComentarioByPelicula(this.okComentarioCargar.bind(this), this.state.id);
            this.okComentarioCargar.bind(this);
        }
    
        okComentarioCargar(data) {
            if (data != null) {
    
                var i, comentarios = [];
                for (i = 0; i < data.length; i++) {
                    comentarios.push(createData(data[i], i));
                }
                this.setState({ comentarios: comentarios });
    
            } else {
                //alert("Intentar de nuevo")
            }
        }
    */
    render() {
        <View></View>
        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.detalleContainer}>
                    <ActivityIndicator size="large" color="pink" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
                //</View>
                // </LinearGradient>
            );
        } else {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                <View style={[styles.detalleContainer]}>
                    <ScrollView>
                        <View style={[styles.detalleContainer]}>
                            <View style={[styles.detalleContainer]}>
                                <View style={{ flex: 0.5, flexDirection: 'row' }}>
                                    <Image
                                        style={{ width: 150, height: 250, marginLeft: 10, marginTop: 10, flex: 0.45, borderRadius: 10 }}
                                        source={{ uri: this.state.detalle.poster }} />
                                    <View style={{ flex: 0.55, flexDirection: 'column', alignContent: 'center', marginHorizontal: 10, marginTop: 20 }}>
                                        <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10 }}>
                                            <Text style={styles.detalleTitle}>
                                                {this.state.detalle.title}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'grey',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Entypo name="calendar" size={15} color="#3399ff" />
                                                <Text style={styles.detalleEvento}>
                                                    {this.state.detalle.year}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'grey',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Entypo name="clock" size={15} color="#3399ff" />
                                                <Text style={styles.detalleEvento}>
                                                    {this.state.detalle.runtime}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'grey',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesome name="star" size={15} color="#3399ff" />
                                                <Text style={styles.detalleEvento}>
                                                    {this.state.detalle.rating}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
                                    <Text style={styles.detalleGenresTitles}>
                                        Géneros
                                    </Text>
                                    <Text style={styles.detalleGenres}>
                                        {this.state.detalle.genre}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
                                    <Text style={styles.detalleGenresTitles}>
                                        Resumen
                                    </Text>
                                    <Text style={styles.detalleGenres}>
                                        {this.state.detalle.synapsi}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
                                    <Text style={styles.detalleGenresTitles}>
                                        Precio
                                    </Text>
                                    <Text style={styles.detalleGenres}>
                                        {'\n'}
                                        Precio Entrada: $1000
                                        {'\n'}
                                        {'\n'}
                                        Carta de precios:
                                        {'\n'}
                                        Trago clasico: $230
                                        {'\n'}
                                        Shot: $110
                                        {'\n'}
                                        Cerveza: $110
                                        {'\n'}

                                    </Text>

                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10}}>
                                    <Text style={styles.detalleComentariosTitles}>
                                        Comentarios
                                </Text>
                                    <FlatList
                                        data={this.state.comentarios}
                                        keyExtractor={(item, index) => 'key' + index}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <FlatListItems item={item} index={index}>

                                                </FlatListItems>
                                            );
                                        }}
                                    >
                                    </FlatList>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <TouchableOpacity onPress={() => {
                        this.setModalVisible(true);
                    }} style={styles.fab}>
                        <AntDesign name="form" size={25} color="white" />
                    </TouchableOpacity>

                    <Modal
                        visible={this.state.isModalVisible}
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >

                        <View style={styles.modal}>
                            <View>
                                <Text
                                    style={styles.modalText}>Comentario</Text>
                            </View>
                            <View style={{ margin: 10, color: '#3399ff', borderColor: 'black', borderWidth: 1, width: width * 0.70, height: 50, backgroundColor: 'white' }}>
                                <TextInput multiline={true} autoFocus={true} maxLength={100} onChangeText={(text) => this.setState({ text })} value={this.state.text}>

                                </TextInput>
                            </View>
                            <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ marginRight: 10, width: width * 0.30 }}>
                                    <View style={[styles.outterButtonCreate]}>

                                        <TouchableOpacity
                                            style={styles.SubmitButtonStyle}
                                            activeOpacity={.5}
                                            onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                                        >
                                            <Text style={styles.textButton}> Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 10, width: width * 0.30 }}>
                                    <View style={[styles.outterButtonCreate]}>

                                        <TouchableOpacity
                                            style={styles.SubmitButtonStyle}
                                            activeOpacity={.5}
                                            onPress={() => { this.insertarComentario(); }}
                                        >
                                            <Text style={styles.textButton}> Aceptar</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                //LinearGradient>
            );
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
                        <Text style={{ fontSize: 15, color: '#3399ff', marginTop: 5 }}>
                            {this.props.item.nombre.slice(0, 1).toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                        <View>
                            <Text style={{
                                color: 'black',
                                padding: 5,
                                fontSize: 12,
                                marginTop: 5
                            }}>
                                {this.props.item.nombre}
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
                        marginVertical: 5
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
        backgroundColor: '#ebf0f7'
    },
    detalleComentario: {
        flex: 1,
        backgroundColor: 'white',
    },
    detalleTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold',
    },
    detalleEvento: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#6666ff"
    },
    detalleGenres: {
        fontSize: 15,
        margin: 10,
        marginTop: 2.5,
        color: "#6666ff"
    },
    detalleGenresTitles: {
        fontSize: 17,
        margin: 10,
        marginBottom: 2.5,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    detalleComentariosTitles: {
        fontSize: 17,
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#3399ff',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: '#3399ff'
    },
    FlatListItems: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    modal: {
        height: height * 0.25,
        width: width * 0.75,
        position: 'absolute',
        top: height * 0.3,
        left: width * 0.13,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: 'black',
        shadowOpacity: 5.0,
    },
    modalText: {
        fontSize: 20,
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        alignSelf: 'center',
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
    textButton: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    SubmitButtonStyle: {
        width: 100,
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#373737',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#fff'
    },
    outterButtonCreate: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },

})

export default Detalle