import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native'
import Card from '../components/card'
import colors from '../components/colors'
import {Header} from '../components/header'
import Loader from '../components/loader'
import DropDownPicker from 'react-native-dropdown-picker'
import {firestoreDB} from '../components/firebase'

function HomeScreen ({navigation, routes}) {
  let [users, setUsers] = useState([])
  let [usersbackup, setUsersBackup] = useState([])
  let [isempty, setEmpty] = useState(false)
  let [loading, setLoading] = useState(true)
  let [searchuser, setSearching] = useState('')
  useEffect(() => {
    fetchUserData()
    setLoading(true)
  }, [])
  const [open, setOpen] = useState(false)
  const [filtervalue, setValue] = useState(null)
  const [filteritems, setFilterState] = useState([
    {label: 'Age ( Old first )', value: 'o'},
    {label: 'Age ( Young first )', value: 'y'},
    {label: 'Gender (M)', value: 'm'},
    {label: 'Gender (F)', value: 'f'},
  ])

  async function fetchUserData () {
    try {
      const res = await fetch('https://randomuser.me/api/?results=10')
      const data = await res.json()
      setLoading(false)
      if (
        data &&
        data.results &&
        Array.isArray(data.results) &&
        data.results.length > 0
      ) {
        console.log('data', data)
        let temp = []
        data.results.forEach(el => {
          temp.push({...el, isfav: false})
        })
        console.log('erew', temp)
        setUsers(temp)
        setUsersBackup(temp)
      } else {
        setEmpty(true)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const setAsFav = (el, index, bool) => {
    if (bool) {
      setFavUsersonFireBase(el, index)
    } else {
      RemoveFavUsersfromFireBase(el, index)
    }
  }

  async function setFavUsersonFireBase (el, index) {
    try {
      const ref = await firestoreDB.add({...el, isfav: true})
      await firestoreDB.doc(ref.id).update({uid: ref.id})
      let temp = [...usersbackup]
      temp.splice(index, 1, {...el, isfav: true, uid: ref.id})
      console.log(temp)
      setUsers(temp)
      setUsersBackup(temp)
    } catch (e) {
      console.log(e)
    }
  }

  async function RemoveFavUsersfromFireBase (el, index) {
    try {
      await firestoreDB.doc(el.uid).delete()
      let temp = [...usersbackup]
      temp.splice(index, 1, {...el, isfav: false})
      setUsers(temp)
      setUsersBackup(temp)
    } catch (e) {
      console.log(e)
    }
  }
  const _renderItem = ({item, index}) => {
    return (
      <Card
        user={item}
        renderstar={true}
        navigation={navigation}
        setasFav={() => setAsFav(item, index, true)}
        setasUnfav={() => setAsFav(item, index, false)}
      />
    )
  }

  const onChangeText = e => {
    setSearching(e)
    let text = e.toLowerCase()
    let x = usersbackup
    let filteredName = x.filter(item => {
      return (
        item.name.first.toLowerCase().match(text) ||
        item.name.last.match(text) ||
        item.phone.match(text) ||
        item.email.match(text)
      )
    })
    if (filteredName.length > 0 && (text || text !== '')) {
      console.log('@filteredName', filteredName)
      setUsers(filteredName)
    } else if (!text || text === '') {
      setUsers(usersbackup)
    } else if (filteredName.length === 0 && (text || text !== '')) {
      return setUsers([])
    }
  }

  function handleFilterParamChange (e) {
    if (e) {
      let temp = [...usersbackup]
      let newarr = []
      switch (e) {
        case 'o':
          newarr = temp.sort(function (a, b) {
            return b.dob.age - a.dob.age
          })
          console.log('o', temp)
          break
        case 'y':
          newarr = temp.sort(function (a, b) {
            return a.dob.age - b.dob.age
          })
          console.log('y', temp)

          break
        case 'm':
          newarr = temp.filter(function (a) {
            return a.gender === 'male'
          })
          console.log('m', newarr)
          break
        case 'f':
          newarr = temp.filter(function (a) {
            return a.gender === 'female'
          })
          console.log('fm', newarr)
          break
      }
      setUsers(newarr)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{minHeight: '15%'}}>
        <Header
          containerStyle={{paddingHorizontal: 20}}
          leftNavigation={false}
          onPress={() => navigation.goBack()}
          title={''}
          bgc={'transparent'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TextInput
          autoCompleteType={'off'}
          onChangeText={data => onChangeText(data)}
          value={searchuser}
          style={styles.input}
          placeholder={'Search user by name'}
          placeholderTextColor={colors.gray}
          autoCapitalize='sentences'
          autoCorrect={false}
          keyboardAppearance={'dark'}
          fontSize={16}
        />
        <View style={{flex: 0.3}}>
          <DropDownPicker
            open={open}
            value={filtervalue}
            items={filteritems}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setFilterState}
            onChangeValue={handleFilterParamChange}
          />
        </View>
      </View>

      <Loader loading={loading} />
      <FlatList
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{flex: 1, marginVertical: 20}}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={[styles.container, {alignItems: 'center'}]}>
            {searchuser.length > 0 && !isempty && users.length == 0 ? (
              <Text style={styles.text}>Not found.</Text>
            ) : (
              <Text style={styles.text}>
                {isempty ? 'Empty' : 'Loading...'}
              </Text>
            )}
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
  input: {
    color: colors.black,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flex: 0.6,
    alignSelf: 'center',
    fontWeight: '500',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 14,
    fontSize: 18,
    paddingHorizontal: 20,
    borderColor: colors.white,
    borderWidth: 1,
  },
})
export default HomeScreen
