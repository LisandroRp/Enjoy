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
           // <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>

                <View style={[styles.loginContainer]}>
                    <View style={[styles.imageContainer]}>
                        <Image
                            style={[styles.imageStyle]}
                            source={require('./FACHA.png')}></Image>
                    </View>
                    <View style={[styles.inputContainer]}>
                        <View style={styles.outterInput}>
                            <TextInput style={styles.textInput}
                                placeholder="Name"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ name: text })} />
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
                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                            onPress={() => this.checkCreate()}>
                            <Text style={{color: 'white'}}>Create Account </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                            onPress={() => this.props.onPress()}>
                            <Text style={{color: 'white'}}>Go back </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            //</LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#9FA8DA'
    },
    textInput: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    outterInput: {
       borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 40,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    imageContainer: {
        marginTop: 50,
        paddingBottom:30,
        justifyContent: 'center'
    },
    outterButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
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
    loginButton: {
        backgroundColor: "#00b5ec",
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
    
        elevation: 19,
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        width:150,
        borderRadius:30,
        backgroundColor:'transparent'
      },
    /*
    textButton: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },*/
})

export default Login;

  /*
                        <View style={[styles.outterButtonCreate]}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.props.onPress()}>
                                <Text style={styles.textButton}> Go Back </Text>
                            </TouchableOpacity>

                        </View>
                        */