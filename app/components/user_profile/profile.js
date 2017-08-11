import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoUpload from 'react-native-photo-upload';
import {connect} from 'react-redux';
import NavBar from '../navbar';
import EditProfileNavigator from './edit_profile_navigator';
// var cloudinary = require('cloudinary');

class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.handleBack = this.handleBack.bind(this);
    this.redirectToEdit = this.redirectToEdit.bind(this);
  }

  redirectToEdit() {
    this.props.navigator.push({
      component: EditProfileNavigator,
      title: 'Edit Profile',
      navigationBarHidden: true
    })
  }

  handleBack() {
    this.props.navigator.pop();
  }

  render() {
    console.log(this.props);
    let {currentUser, partner} = this.props.users;
    let {connectionId } = this.props;
    if (!currentUser) {
      return null;
    }
    return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={this.handleBack}>
          <Icon name="chevron-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>
          Profile
        </Text>
        <TouchableOpacity onPress={this.redirectToEdit}>
          <Icon name="pencil" size={20} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
         <Image
           style={{
             paddingVertical: 30,
             width: 150,
             height: 150,
             borderRadius: 75
           }}
           resizeMode='cover'
           source={{
             uri: currentUser.imageUrl
           }}
         />
         <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
       </View>
       <View style={styles.body}>
         <Text>
           <Text style={{fontWeight: 'bold'}}>Email:</Text> {currentUser.email}
         </Text>
         <Text>
           <Text style={{fontWeight: 'bold'}}>Birthday:</Text> {currentUser.birthday}
         </Text>
         <Text>
           <Text style={{fontWeight: 'bold'}}>Your Anniversary:</Text>
         </Text>
         <View style={{width: '90%', marginTop: 20, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gray', borderBottomWidth: 1,}}/>
         </View>
         <View style={styles.partner}>
           <View style={styles.header}>
            <Image
              style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75
              }}
              resizeMode='cover'
              source={{
                uri: partner.imageUrl
              }}
            />
          <Text style={styles.name}>Your partner: {partner.firstName} {partner.lastName}</Text>
          </View>
          <View style={styles.body}>

           <Text>
             <Text style={{fontWeight: 'bold'}}>Email:</Text> {partner.email}
           </Text>
           <Text>
             <Text style={{fontWeight: 'bold'}}>Birthday:</Text> {partner.birthday}
           </Text>
         </View>
      </View>
    </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 50,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    marginTop: 20,
    paddingBottom: 42,
    justifyContent: 'space-around'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  partner: {
    marginTop: 20,
  },
});


export default UserProfile;
