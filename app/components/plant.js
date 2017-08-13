import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated,
  Dimensions
} from 'react-native';


import Healthbar from './healthbar';
import animateSprite from './animate_sprite';


import {IMAGES, WATER, PLANT} from '../assets/spritesheets/sprites';
import BACKGROUND from '../assets/spritesheets/background/background';




const {width, height} = Dimensions.get('window');
console.log('Width: ', width, 'Height: ', height);

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      water: false,

      health: props.plant.health,
      lastWater: props.plant.lastWater
    };

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(this.state.health);
    console.log(typeof(this.state.health));

    // this.getImage = this.getImage.bind(this);
    this.waterPlant = this.waterPlant.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
    this.handleUpdatePlant = this.handleUpdatePlant.bind(this);
    this.calculateHealth = this.calculateHealth.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
  }

  componentWillMount() {
    this.props.fetchPlant(this.props.connectionId);
    this.calculateHealth();
  }

  dateDiff(){
    let recentWater = Date.now();
    let lastWater = new Date(this.state.lastWater).getTime();

    let diff =  parseInt((recentWater - lastWater) / (1000 * 60 * 60 * 24));

    return diff;
    // let timeDiff = Math.abs(recentWater.getTime() - lastWater.getTime());
    // let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  calculateHealth() {
    let decreasedHealth = this.dateDiff() * 20;

    let tempHealth = this.props.plant.health - decreasedHealth;
    if (tempHealth < 0) {tempHealth = 0;}
    console.log("*****************BEFORE CALCULATEHEALTH");
    console.log(tempHealth);

    this.setState({
      health: tempHealth
    });
    console.log("==========CALCULATEHEALTH=======");
    console.log(this.state.health);
  }

  updateHealth() {
    let health = this.state.health + 10;
    if (health > 100) {health = 100;}
    return health;
  }

  handleUpdatePlant() {
    this.props.plant.lastWater = this.state.lastWater;
    this.props.plant.health = this.state.health;

    this.props.updatePlant(this.props.connectionId, this.props.plant);
  }

  // redirectToEdit() {
  //   this.props.requestPair().then(() => {
  //     this.props.navigator.push({
  //       component: EditProfileNavigator,
  //       title: 'Edit Profile',
  //       navigationBarHidden: true
  //     });
  //   });
  // }

  waterPlant() {
    console.log("%%%%%%%%%%%%%%%%")
    console.log(this.state.lastWater);
    console.log(this.state.health);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%")

    this.setState({
      water: true,
      health: this.updateHealth(),
      lastWater: Date.now()
    });
    // .then(function() {
    //   console.log("&&&&&&&&&& ABOUT TO UPDATE &&&&&&&&&&&&");
    //   this.handleUpdatePlant();
    // }.bind(this));

    setTimeout(()=>{
      this.setState({
        water: false
      });
    }, 5000);
  }

  getBackground(){
    let time = new Date().getHours();
    if ( time >= 20 ) {
      return BACKGROUND['night'];
    } else if ( time >= 16 ) {
      return BACKGROUND['evening'];
    } else if ( time >= 12 ) {
      return BACKGROUND['afternoon'];
    } else if ( time >= 7) {
      return BACKGROUND['morning'];
    } else {
      return BACKGROUND['night'];
    }

  }

  render() {

    let water = this.state.water ? animateSprite(WATER, 4, 500, 100, 100) : (<Text> </Text>);

    let background = this.getBackground();

    return (
      <View style={styles.container}>

          <View style={styles.background}>
            <Image source={background} style={{width, height}}>
            </Image>
          </View>
          <View style={styles.header}>
            <Text style={styles.name}>
              Greggles
            </Text>
          </View>
          <View style={styles.healthbar}>
            <Healthbar health={this.state.health} />
          </View>

          <TouchableOpacity
            onPress={this.waterPlant}
            style={styles.waterIcon}
          >
            <Image
              style={styles.roundedIcon}
              source={require('../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>

          <View style={styles.plant}>
            {animateSprite(PLANT, 3, 1500 - (this.state.health * 10), 500, height * 0.60)}
          </View>
          <View style={styles.water}>
            {water}
          </View>
      </View>
    );
  }
}

// <Image
//   style={styles[this.state.drops]}
//   source={WATER[this.state.drops]}
// />


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height - 55,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  },
  background: {
    bottom: 10,
    position: 'absolute',
    alignSelf: 'center',
   },
   header: {
     alignItems: 'center'
   },
   healthbar: {
    left: 10,
    position: 'absolute',
    top: 60,
   },
   name: {
     fontSize: 25,
     fontWeight: 'bold',
     color: 'black',
   },
   plant: {
     position: 'absolute',
     bottom: 40,
     alignSelf: 'center',
     backgroundColor: 'transparent',
   },
   water: {
     position: 'absolute',
     bottom: '40%',
     alignSelf: 'center'
   },
   waterIcon: {
    backgroundColor: 'transparent',
    width: 65,
    height: 65,
    alignSelf: 'flex-end',
    top: 30,
    borderRadius: 180,
   },
   roundedIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
});


export default Plant;
