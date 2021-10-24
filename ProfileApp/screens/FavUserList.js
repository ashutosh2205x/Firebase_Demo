import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import Card from '../components/card'
import {firestoreDB} from '../components/firebase'
import {Header} from '../components/header'
import Loader from '../components/loader'

function FavUserListScreen ({navigation, routes}) {
  let [favusers, setFavUsers] = useState([])
  let [isempty, setEmpty] = useState(false)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      getMyFavList()
    })
    return focus
  }, [])

  async function getMyFavList () {
    setLoading(false)
    try {
      let temp = []
      const dataref = await firestoreDB.get()
      console.log(dataref.size)
      if (dataref.size > 0) {
        dataref.forEach(el => {
          temp.push(el.data())
        })
        setFavUsers(temp)
      } else {
        setEmpty(true)
      }
    } catch (e) {
      console.log('e', e)
      setLoading(false)
    }
  }

  const _renderItem = ({item, index}) => {
    return (
      <Card
        renderstar={false}
        user={item}
        navigation={navigation}
        setasFav={() => setAsFav(item, index, true)}
        setasUnfav={() => setAsFav(item, index, false)}
      />
    )
  }

  const setAsFav = (el, index, bool) => {
    let temp = [...favusers]
    temp.splice(index, 1, {...el, isfav: bool})
    setFavUsers(temp)
  }
  return (
    <View style={styles.container}>
      <View style={{minHeight: '15%'}}>
        <Header
          containerStyle={{paddingHorizontal: 20}}
          leftNavigation={false}
          onPress={() => navigation.goBack()}
          title={'Favourites'}
          bgc={'transparent'}
        />
      </View>

      <Loader loading={loading} />
      <FlatList
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{flex: 1, marginVertical: 20}}
        data={favusers}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={[styles.container, {alignItems: 'center'}]}>
            <Text style={styles.text}>{isempty ? 'Empty' : 'Loading...'}</Text>
          </View>
        }
        renderItem={_renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
})

export default FavUserListScreen
