import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

const IconGenerator = () => {
  const iconRef = React.useRef();
  const splashRef = React.useRef();
  const adaptiveRef = React.useRef();

  const generateIcons = async () => {
    // Generate app icon
    const iconUri = await iconRef.current.capture();
    await FileSystem.moveAsync({
      from: iconUri,
      to: FileSystem.documentDirectory + 'icon.png'
    });

    // Generate splash screen
    const splashUri = await splashRef.current.capture();
    await FileSystem.moveAsync({
      from: splashUri,
      to: FileSystem.documentDirectory + 'splash.png'
    });

    // Generate adaptive icon
    const adaptiveUri = await adaptiveRef.current.capture();
    await FileSystem.moveAsync({
      from: adaptiveUri,
      to: FileSystem.documentDirectory + 'adaptive-icon.png'
    });
  };

  return (
    <View>
      <ViewShot ref={iconRef} options={{ width: 1024, height: 1024, format: 'png' }}>
        <View style={{ width: 1024, height: 1024, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name="map-marker-radius" size={512} color="white" />
        </View>
      </ViewShot>

      <ViewShot ref={splashRef} options={{ width: 1242, height: 2436, format: 'png' }}>
        <View style={{ width: 1242, height: 2436, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name="map-marker-radius" size={512} color="white" />
          <Text style={{ color: 'white', fontSize: 64, marginTop: 32, fontWeight: 'bold' }}>Jwandoon</Text>
        </View>
      </ViewShot>

      <ViewShot ref={adaptiveRef} options={{ width: 1024, height: 1024, format: 'png' }}>
        <View style={{ width: 1024, height: 1024, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name="map-marker-radius" size={512} color="white" />
        </View>
      </ViewShot>
    </View>
  );
}; 