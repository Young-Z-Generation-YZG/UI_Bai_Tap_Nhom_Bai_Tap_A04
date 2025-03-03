import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '@constants/images'

export default function UserCircle() {
  return (
    <View>
      <View style={styles.container}>
        <Image source={images.user} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50, // Làm tròn hoàn toàn
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Màu nền nhẹ
    overflow: 'hidden',
  },
  image: {
    width: "100%", 
    height: "100%", 
    resizeMode: "contain" 
  }
})
