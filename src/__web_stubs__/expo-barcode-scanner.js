/**
 * Web stub for expo-barcode-scanner.
 * Camera/barcode scanning is handled differently on web.
 */
import React from 'react';
import { View, Text } from 'react-native';

export const BarCodeScanner = (props) =>
  React.createElement(View, { style: props.style },
    React.createElement(Text, { style: { textAlign: 'center', padding: 16, color: '#666' } },
      '📷 Barcode scanner not available on web'));

BarCodeScanner.Constants = { BarCodeType: {} };
BarCodeScanner.requestPermissionsAsync = async () => ({ status: 'denied' });
BarCodeScanner.getPermissionsAsync = async () => ({ status: 'denied' });

export default BarCodeScanner;
