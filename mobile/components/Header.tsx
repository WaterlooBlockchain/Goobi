import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from './Colors';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>mtndao minter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    paddingTop: 48,
    paddingHorizontal: 32,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
  },
  title: {
    color: Colors.primary,
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
});
