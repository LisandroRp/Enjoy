import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Detalle from './components/Detalle';
import Conciertos from './components/Conciertos'
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import DatosPersonales from './components/DatosPersonales';
import Comentarios from './components/Comentarios';
import MockedViews from './components/MockedViews'
import Craigslist from './components/Craigslist'
import LogInCards from './components/LogInCards'
import CardView from './components/CardView'
import Festivales from './components/Festivales';
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
    this.props.navigation.navigate('Recomendados');
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
    this.props.navigation.navigate('SignUpClass')
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
    this.props.navigation.navigate('SignUpClass')
  }
}
class MockedViewScreen extends React.Component {

  static navigationOptions = {
    title: 'Recomendados',
    headerStyle: {
      backgroundColor: 'white',
      height:50
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
class ConciertosScreen extends React.Component {

  static navigationOptions = {
    title: 'Conciertos',
    headerStyle: {
      backgroundColor: 'white',
      height:50
    },
    headerTintColor: 'pink',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Conciertos
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto() {
    this.props.navigation.navigate('Detalle');
  }
}
class FestivalesScreen extends React.Component {

  static navigationOptions = {
    title: 'Festivales',
    headerStyle: {
      backgroundColor: 'white',
      height:50
    },
    headerTintColor: 'pink',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Festivales
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto() {
    this.props.navigation.navigate('CardView');
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

const ConciertosStackNavigator = createStackNavigator(
  {
    ConciertosScreen: {
      screen: ConciertosScreen,
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
    Detalle: { screen: Detalle},
  },
  {
    initialRouteName: 'ConciertosScreen',
  }
);

const FestivalesStackNavigator = createStackNavigator(
  {
    FestivalesScreen: {
      screen: FestivalesScreen,
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
    initialRouteName: 'FestivalesScreen',
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
          backgroundColor: 'black',
          height:50
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
  Recomendados: MockedViewStackNavigator,
  Conciertos: ConciertosStackNavigator,
  Festivales: FestivalesStackNavigator,
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