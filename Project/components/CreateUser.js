import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import ApiController from '../controller/ApiController';
import { LinearGradient } from 'expo'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lastName: null,
            email: null,
            user: null,
            password: null,
        }
    }

    checkCreate() {
        if (this.state.user != null && this.state.password != null) {
            ApiController.insertUsuario(this.state.name, this.state.lastName, this.state.email,
                this.state.user, this.state.password, this.okCreate.bind(this));
        } else {
            alert("Volver a intentar");
        }
    }

    okCreate() {
        alert("Se creo el usuario exitosamente");
        this.props.onPress();
    }

    render() {
        return (
            <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>

                <View style={[styles.loginContainer]}>
                    <View style={[styles.imageContainer]}>
                        <Image
                            style={[styles.imageStyle]}
                            source={require('./pochoclo.png')}></Image>
                    </View>
                    <View style={[styles.inputContainer]}>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Name"
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Last Name"
                                onChangeText={(text) => this.setState({ lastName: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Email"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="User"
                                onChangeText={(text) => this.setState({ user: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Password"
                                onChangeText={(text) => this.setState({ password: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={[styles.outterButton]}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.checkCreate()}>
                                <Text style={styles.textButton}> Create Account </Text>
                            </TouchableOpacity>


                        </View>
                        <View style={[styles.outterButtonCreate]}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.props.onPress()}>
                                <Text style={styles.textButton}> Go Back </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    outterInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginHorizontal: 120,
        marginBottom: 20,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 2,
        justifyContent: 'flex-start'
    },
    imageStyle: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    outterButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    outterButtonCreate: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    SubmitButtonStyle: {
        width: 150,
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
    textButton: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})

export default Login;
