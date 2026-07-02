/**
 * Web stub for react-native-pager-view.
 * react-navigation/material-top-tabs falls back to ScrollView on web anyway.
 */
import React from 'react';
import { ScrollView } from 'react-native';

const PagerView = ({ children, ...props }) =>
  React.createElement(ScrollView, { horizontal: true, pagingEnabled: true, ...props }, children);

PagerView.displayName = 'PagerView';
export default PagerView;
