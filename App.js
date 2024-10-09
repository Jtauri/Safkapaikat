import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import axios from 'axios'
import Constants from 'expo-constants'
import { APIKEY } from './config'

export default function App() {
  const [location, setLocation] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [radius, setRadius] = useState(null)

  //tämän olisi varmaankin voinut tehdä myös useEffectin avulla suoraan, mutta kopioin tämän toisesta harkasta ja toimii ni en koske
  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    try {
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
      setLocation({ "latitude": position.coords.latitude, "longitude": position.coords.longitude })
      console.log('Location:', location)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getUserPosition()
  } ,[])


  const fetchRestaurants = async () => {
    if (location) {
      const lat = location.latitude
      const lon = location.longitude

      try {
        const response = await axios.get(
          `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=${radius}&categories=13065&limit=5&fields=rating,location,name,fsq_id&sort=rating`,
          {
            headers: {
              accept: 'application/json',
              'Authorization': APIKEY
            },
          }
        )
        setRestaurants(response.data.results)
        setStatusMessage('Restaurants found:')
      } catch (error) {
        console.error(error)
        setStatusMessage('Error fetching restaurants.')
        setRestaurants([])
      }
    } else {
      statusMessage('Waiting for location...')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find restaurants near you</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={radius}
        placeholder="Enter search radius (meters)"
        onChangeText={text => setRadius(text)}
      />
      <Button title="Get Restaurants" onPress={fetchRestaurants} />
      {statusMessage ? <Text>{statusMessage}</Text> : null}
      {/* fsq_id on foursquaressa ja tässä koodissa käytettävä id ravintoloille */}
      <FlatList
        data={restaurants}
        keyExtractor={item => item.fsq_id}
        renderItem={({ item }) => (
          <View style={styles.restaurants}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.location.address || 'No address'}</Text>
            <Text>{item.rating || 'No rating'}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    flex: 1,
    },
    input: {
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      padding: 10,
    },
    restaurants: {
      marginVertical: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },

  })