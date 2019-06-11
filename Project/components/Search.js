import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';

class Craigslist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            userSelected: [],
        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'white',
            height: 50
        },
    };
      

    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + item.name);
    }
    render() {
        const { search } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                </View>

                <FlatList
                    style={styles.contentList}
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
                                    <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener(item)}>
                                        <Text style={styles.followButtonText}>Explore now</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
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
})

export default withNavigation(Craigslist);