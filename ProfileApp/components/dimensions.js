import {Dimensions, PixelRatio} from 'react-native'

export const {height: deviceHeight, width: deviceWidth} = Dimensions.get(
  'window',
)

//for fonts/ margins/ paddings
function widthToDP (w) {
  let givenWidth = typeof w === 'number' ? w : parseFloat(w)
  return PixelRatio.roundToNearestPixel((deviceWidth * givenWidth) / 100)
}

function heightToDP (h) {
  let givenHeight = typeof h === 'number' ? h : parseFloat(h)
  return PixelRatio.roundToNearestPixel((deviceHeight * givenHeight) / 100)
}

export {widthToDP, heightToDP}
