import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Detalle from './components/Detalle';
import Peliculas from './components/Peliculas';
import Login from './components/Login';
import Series from './components/Series';
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import DatosPersonales from './components/DatosPersonales';
import Comentarios from './components/Comentarios';
import MockedViews from './components/MockedViews'
import Craigslist from './components/Craigslist'
import LogInCards from './components/LogInCards'
import CardView from './components/CardView'

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';



class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

class SignUpClass extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <LogInCards
          onPressLogin={this.checkLogin.bind(this)}
          onPressPass={this.goPass.bind(this)}
          onPressCreate={this.goCreate.bind(this)}
      />
    )
  }
  checkLogin(id) {
    //this.props.navigation.navigate('PeliculasScreen', { idUser: id });
    /*this.props.navigation.navigate('PeliculasScreen', { idUser: '123'}); Funciona */
    this.props.navigation.navigate('Eventos');
  }

  goPass() {
    this.props.navigation.navigate('ChangePassword');
  }

  goCreate() {
    this.props.navigation.navigate('CreateUser');
  }
}

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ChangePassword
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('Login')
  }
}

class CreateUserScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CreateUser
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('Login')
  }
}


class MockedViewScreen extends React.Component {

  static navigationOptions = {
    title: 'Eventos',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'pink',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Craigslist
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto() {
    this.props.navigation.navigate('CardView');
  }
}

class PeliculasScreen extends React.Component {

  static navigationOptions = {
    title: 'Peliculas',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Peliculas
        onPress={this.pasarDetalle.bind(this)}
      />
    );
  }
  pasarDetalle(idMovie, idUser) {
    this.props.navigation.navigate('Detalle', { id: idMovie, idUser: idUser })
  }
}

class SeriesScreen extends React.Component {

  static navigationOptions = {
    title: 'Series',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Series
        onPress={this.pasarDetalle.bind(this)}

      />
    );
  }

  pasarDetalle(idMovie, idUser) {
    this.props.navigation.navigate('Detalle', { id: idMovie, idUser: idUser })
  }
}
const MockedViewStackNavigator = createStackNavigator(
  {
    MockedViewScreen: {
      screen: MockedViewScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'pink' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),

        }
      }
    },
    CardView: { screen: CardView },
  },
  {
    initialRouteName: 'MockedViewScreen',
  }
);

const PeliculasStackNavigator = createStackNavigator(
  {
    PeliculasScreen: {
      screen: PeliculasScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),

        }
      }
    },
    Detalle: { screen: Detalle },
  },
  {
    initialRouteName: 'PeliculasScreen',
  }
);

const SeriesStackNavigator = createStackNavigator(
  {
    Series: {
      screen: SeriesScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),

        }
      }
    },
    Detalle: { screen: Detalle },
  },
  {
    initialRouteName: 'Series',
  }
);

const PerfilTabNavigator = createBottomTabNavigator({
  DatosPersonales,
  Comentarios
}, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: 'Perfil',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black'
        }
      }
    },
    tabBarOptions: {
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'pink',

      },
      labelStyle: {
        fontSize: 18,
        paddingVertical: 10
      }

    }
  });

const PerfilStackNavigator = createStackNavigator({
  PerfilTabNavigator: PerfilTabNavigator
});

const AppDrawerNavigator = createDrawerNavigator({
  Eventos: MockedViewStackNavigator,
  //Peliculas: PeliculasStackNavigator,
  //Series: SeriesStackNavigator,
  Perfil: PerfilStackNavigator,
}, {
    drawerBackgroundColor: 'pink',
    contentOptions: {
      //Esto sirve para cambiar algunos colores
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  SignUpClass: { screen: SignUpClass},
  //Craigslists: { screen: MockedViewScreen },
  ChangePassword: { screen: ChangePasswordScreen },
  //Login: { screen: LoginScreen },
  CreateUser: { screen: CreateUserScreen },
  Drawer: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});