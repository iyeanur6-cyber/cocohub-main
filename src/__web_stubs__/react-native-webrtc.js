/**
 * Web stub for react-native-webrtc.
 * Browsers use the native WebRTC API directly — this stub prevents the
 * native bridge from crashing and lets the telemedicine screen handle
 * web via its own logic.
 */

import React from 'react';
import { View } from 'react-native';

export const RTCView = (props) => React.createElement(View, props);
export const RTCPeerConnection = typeof window !== 'undefined' ? window.RTCPeerConnection : null;
export const RTCIceCandidate = typeof window !== 'undefined' ? window.RTCIceCandidate : null;
export const RTCSessionDescription =
  typeof window !== 'undefined' ? window.RTCSessionDescription : null;
export const mediaDevices =
  typeof navigator !== 'undefined' ? navigator.mediaDevices : { getUserMedia: async () => null };

export default {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
};
