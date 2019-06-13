import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Alert,
    ScrollView,
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarFocused: false,
            value: '',
            modalVisible: false,
            userSelected: [],
            data: [
                { id: '1', name: "Ac Dc", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkzHiLqaw3MedLtDd7EPKBlqhPW1IJE9jRFC1je3lLo79mDQ-", count: 'El Monumental',price: 10, genre: 'Rock/Metal', Type: 'Concierto'},
                { id: '2', name: "Los Auntenticos Decadentes", image: "https://img.icons8.com/color/96/000000/dancing-party.png", count: 'Gran Rex', price: 2, genre: 'Rock Nacional', Type: 'Concierto' },
                { id: '3', name: "Twenty one Pilots", image: "https://img.icons8.com/color/96/000000/dancing.png", count: 'Velez', price: 8, genre: 'Rock/Pop', Type: 'Concierto' },
                { id: '4', name: "Duki", image: "https://img.icons8.com/flat_round/64/000000/star.png", count: 'Luna Park', price:3, genre: 'Trap', Type: 'Concierto'},
            ],
            memory: [
                { id: '1', name: "Ac Dc", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkzHiLqaw3MedLtDd7EPKBlqhPW1IJE9jRFC1je3lLo79mDQ-", count: 'El Monumental',price: 10, genre: 'Rock/Metal', Type: 'Concierto'},
                { id: '2', name: "Los Auntenticos Decadentes", image: "https://img.icons8.com/color/96/000000/dancing-party.png", count: 'Gran Rex', price: 2, genre: 'Rock Nacional', Type: 'Concierto' },
                { id: '3', name: "Twenty one Pilots", image: "https://img.icons8.com/color/96/000000/dancing.png", count: 'Velez', price: 8, genre: 'Rock/Pop', Type: 'Concierto' },
                { id: '4', name: "Duki", image: "https://img.icons8.com/flat_round/64/000000/star.png", count: 'Luna Park', price:3, genre: 'Trap', Type: 'Concierto'},
            ]
        };

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
      }
    

    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + JSON.stringify(item));
    }

    OrdenarPorPrecio(flag)
    {
        let resultt = this.state.data
        if (flag==0){
            resultt = this.state.data.sort((a, b) => {
                return b.price - a.price});
        } else {
            resultt = this.state.data.sort((a, b) => {
                return a.price - b.price});
        }
        this.setState({data: resultt});
    }
    searchEvent = value => {
        const filteredevents = this.state.memory.filter(event => {
          let eventLowercase = (
            event.count +
            ' ' +
            event.name +
            ' ' +
            event.genre +
            ' ' +
            event.Type
          ).toLowerCase();
    
          let searchTermLowercase = value.toLowerCase();
    
          return eventLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ data: filteredevents });
        this.setState({value})
      };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Name/Place/Type/Genre"
                        platform='ios'
                        onChangeText={value => this.searchEvent(value)}
                        value={this.state.value}
                        containerStyle={{backgroundColor: 'white', height:50, paddingBottom:22}}
                        buttonStyle={{paddingBottom:22}}
                    />
                </View>
{/*                 
                <View style={{ height: 80, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5 }}>

                    <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
                            <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={{ fontSize: 24 }} />
                        </Animatable.View>
                        <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} />
                    </Animatable.View>

                </View> */}
                <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.OrdenarPorPrecio(0)}>
                        <Text style={styles.loginText}>Price: High to Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.OrdenarPorPrecio(1)}>
                        <Text style={styles.loginText}>Price: Low to High</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{flex:1}}
                    columnWrapperStyle={styles.listContainer}
                    data={this.state.data}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo()}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.count}>{item.count}</Text>
                                    <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener()}>
                                        <Text style={styles.followButtonText}>Explore now</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                    </ScrollView>
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
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom:5,
        marginHorizontal: 5,
        width:150,
        borderRadius:30,
        backgroundColor:'transparent'
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
    
})