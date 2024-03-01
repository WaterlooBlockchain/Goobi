import React, {useCallback, useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking} from 'react-native';
import { Colors } from '../components/Colors';
import {Camera, CameraType} from 'react-native-camera-kit';
import Send from '../components/Send';

export default function MainScreen() {
  const [targetAddress, setTargetAddress] = useState<string | undefined>();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>();
  const [isMinted, setIsMinted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isMinted) {
    return (
      <View style={styles.mainContainer}>
          <Text>Successfully minted assset!</Text>
          <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(`https://xray.helius.xyz/tx/${txHash}`)}>
              <Text style={styles.buttonText}>View Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {setTargetAddress(undefined); setTxHash(undefined); setIsMinted(false)}}>
              <Text style={styles.buttonText}>Mint another</Text>
            </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.mainContainer}>

      {
        targetAddress ? (
          <> 
            <Text>Mint to {targetAddress}</Text>
              <Send targetAddress={targetAddress} />
              <Text style={styles.buttonText}>{ isLoading ? 'Minting...' : 'Mint Compressed NFT'}</Text>
          </>
        ) : (
          <>
            <Text>Scan a QR code to mint a compressed NFT</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCameraOpen(true)}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </>
        )
      }


      <Modal visible={isCameraOpen} onDismiss={() => setIsCameraOpen(false)} animationType="slide" transparent={true}>
      <Camera
        cameraType={CameraType.Back}
        scanBarcode={true}
        showFrame={true}
        laserColor={Colors.primary}
        frameColor={Colors.primary}
        onReadCode={(event: any) => {
          const codeContents = event.nativeEvent.codeStringValue;
          console.log(codeContents);
          setTargetAddress(codeContents);
          setIsCameraOpen(false);
        }}
        style={styles.camera}
      />
      </Modal>

    </View>
  )
}



const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    padding: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    rowGap: 8
  },
  banner: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 256,
    height: 56,
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 256,
    width: 256,
    backgroundColor: Colors.white,
  },
  camera: {
    width: '100%',
    height: '100%',
  }
});
