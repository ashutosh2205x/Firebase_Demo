import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import colors from '../components/colors'
import {deviceWidth} from '../components/dimensions'
import {Header} from '../components/header'

function UserDetailScreen ({navigation, route}) {
  const RenderItem = (title, val) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <Text style={[styles.heading_text, {flex: 0.4}]}>
          {title || ''}:&nbsp;
        </Text>
        <Text style={[styles.value_text, {flex: 1}]}>{val || ''}</Text>
      </View>
    )
  }
  const {user} = route.params
  console.log(user)
  return (
    <View style={styles.container}>
      <View style={{minHeight: '15%'}}>
        <Header
          containerStyle={{paddingHorizontal: 20}}
          leftNavigation={true}
          title={'Details'}
          onPress={() => navigation.goBack()}
          bgc={'transparent'}
        />
      </View>
      <View style={styles.mainView}>
        <Image
          source={{uri: user.picture.large}}
          resizeMode='contain'
          style={{
            borderRadius: 25,
            height: 100,
            width: 100,
          }}
        />
        <Text style={styles.text}>
          {user.name.title + '. ' + user.name.first + ' ' + user.name.last}
        </Text>
        <View style={styles.subView1}>
          {RenderItem('email', user.email)}
          {RenderItem('phone', user.phone)}
          {RenderItem('age', user.dob.age + ' y/o')}
          {RenderItem('gender', user.gender)}
          {RenderItem(
            'address',
            user.location.city +
              ', ' +
              user.location.state +
              ', ' +
              user.location.country +
              ', ' +
              user.location.postcode,
          )}
          {RenderItem('nationality', user.nat)}
          {RenderItem(
            'Registered on',
            new Date(user.registered.date).toDateString(),
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  subView1: {
    flex: 1,
    width: deviceWidth * 0.9,
    padding: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  heading_text: {
    fontSize: 16,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  value_text: {
    fontSize: 16,
    color: colors.black,
  },
})

export default UserDetailScreen
