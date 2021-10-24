import React from 'react'
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native'
import colors from './colors'
import {deviceHeight, deviceWidth} from './dimensions'

function Loader (props) {
  return props.loading ? (
    <View
      style={[
        styles.loaders,
        {backgroundColor: props.bgc ? props.bgc : 'rgba(100,100,100, 0.4)'},
      ]}>
      <StatusBar
        backgroundColor={'rgba(100,100,100, 0.4)'}
        barStyle={'dark-content'}
      />
      <ActivityIndicator
        size='large'
        color={props.color ? props.color : colors.gray}
      />
    </View>
  ) : null
}

const styles = StyleSheet.create({
  loaders: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  loaderfitscreen: {
    height: deviceHeight,
    width: deviceWidth,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

export default Loader
