/**
 * Web stub for react-native-maps.
 * MapView requires native SDKs. On web we render a placeholder.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const placeholder = (name) => (props) => (
  <View style={[styles.placeholder, props.style]}>
    <Text style={styles.text}>🗺️ {name} — not available on web</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    minHeight: 200,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: { fontSize: 14, color: '#555', textAlign: 'center', padding: 16 },
});

const MapView = placeholder('MapView');
MapView.Animated = placeholder('MapView.Animated');
export default MapView;

export const Marker = placeholder('Marker');
export const Callout = placeholder('Callout');
export const UrlTile = () => null;
export const Polyline = () => null;
export const Polygon = () => null;
export const Circle = () => null;
export const Overlay = () => null;
export const Heatmap = () => null;
export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = null;
