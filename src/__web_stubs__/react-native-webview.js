/**
 * Web stub for react-native-webview.
 * On web, use a regular <iframe> via react-native-web's WebView polyfill,
 * or just render a placeholder.
 */
import React from 'react';
import { View, Text } from 'react-native';

const WebView = (props) =>
  React.createElement(View, { style: [{ flex: 1, minHeight: 200 }, props.style] },
    props.source?.uri
      ? React.createElement('iframe', {
          src: props.source.uri,
          style: { flex: 1, width: '100%', height: '100%', border: 'none' },
          onLoad: props.onLoad,
        })
      : React.createElement(Text, { style: { padding: 16, color: '#666' } }, 'WebView'));

WebView.displayName = 'WebView';
export default WebView;
