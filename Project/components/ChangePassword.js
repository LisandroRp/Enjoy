import React, { Component } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import ApiController from '../controller/ApiController';
import { LinearGradient } from 'expo'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            oldPassword: null,
            newPassword: null,
        }
    }

    checkChange() {
        ApiController.getUsuario(this.checkUsuario.bind(this), this.state.username)
    }

    checkUsuario(data) {
        if (data.password == this.state.oldPassword && this.state.newPassword != null) {
            ApiController.changePassword(this.state.username, this.state.newPassword, this.okChange.bind(this));
        } else {
            alert("Volver a intentar");
        }
    }

    okChange() {
        alert("Cambio de contraseña exitoso");
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
                                placeholder="Username"
                                onChangeText={(text) => this.setState({ username: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Old Password"
                                onChangeText={(text) => this.setState({ oldPassword: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="New Password"
                                onChangeText={(text) => this.setState({ newPassword: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={[styles.outterButton]}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.checkChange()}>
                                <Text style={styles.textButton}> Change Password </Text>
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
        flex: 1,
        justifyContent: 'flex-start'
    },
    imageStyle: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
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
