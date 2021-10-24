import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import colors from './colors'

function Card ({user, navigation, setasFav, setasUnfav, renderstar}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserDetailScreen', {user: user})}>
      <View style={styles.mainCardView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.subCardView}>
            <Image
              source={{uri: user.picture.medium}}
              resizeMode='contain'
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 14,
                color: colors.black,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {user.name.title + '. ' + user.name.first + ' ' + user.name.last}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
              }}>
              <Text
                style={{
                  color: colors.gray,
                  fontSize: 12,
                }}>
                {user.phone}
              </Text>
              <Text
                style={{
                  color: colors.gray,
                  fontSize: 12,
                }}>
                {user.email}
              </Text>
            </View>
          </View>
        </View>
        {renderstar ? (
          user.isfav ? (
            <TouchableOpacity onPress={setasUnfav}>
              <Image
                source={require('../assets/star_filled.png')}
                resizeMode='contain'
                style={styles.star}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={setasFav}>
              <Image
                source={require('../assets/star_unfilled.png')}
                resizeMode='contain'
                style={styles.star}
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.black,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    borderRadius: 25,
    height: 30,
    width: 30,
  },
})

export default Card
