import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from './colors'
import {widthToDP} from './dimensions'

export function Header (props) {
  let {textStyle, rightIconStyle, containerStyle} = props
  if (textStyle === null || textStyle === undefined) {
    textStyle = {}
  }
  if (containerStyle === null || containerStyle === undefined) {
    containerStyle = {}
  }

  return (
    <View style={[custom.container, containerStyle]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // paddingLeft: 5,
        }}>
        {props.leftNavigation === false ? null : (
          <TouchableOpacity onPress={props.onPress}>
            <Image
              source={require('../assets/back_arrow.png')}
              style={custom.icon}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[custom.heading_title, textStyle]}>{props.title}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingLeft: 20,
        }}></View>
    </View>
  )
}

const custom = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginVertical: widthToDP('2%'),
    marginHorizontal: widthToDP('1.7%'),
  },
  title_container: {},
  heading_title: {
    fontSize: 15,
    color: colors.white,
    paddingTop: 10,
  },
  rightStyle: {},
})
