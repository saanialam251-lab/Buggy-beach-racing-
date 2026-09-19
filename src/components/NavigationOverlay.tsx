import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { distance: number; lap: number; maxLaps?: number; route: string; onMapPress?: () => void };

export function NavigationOverlay({ distance, lap, maxLaps = 3, route, onMapPress }: Props) {
  const progress = Math.min(1, (distance % 1000) / 1000);
  return <View pointerEvents="box-none" style={styles.root}>
    <Pressable style={styles.map} onPress={onMapPress}>
      <View style={styles.mapRoad}><View style={[styles.mapCar, { left: `${18 + progress * 62}%` }]} /></View>
      <Text style={styles.mapLabel}>MAP</Text>
    </Pressable>
    <View style={styles.route}><Text style={styles.routeLabel}>ROUTE</Text><Text style={styles.routeName}>{route}</Text><View style={styles.progress}><View style={[styles.progressFill, { width: `${progress * 100}%` }]} /></View><Text style={styles.lap}>LAP {Math.min(lap, maxLaps)} / {maxLaps}</Text></View>
  </View>;
}

const styles = StyleSheet.create({ root: { position: 'absolute', top: 82, left: 18, right: 18, flexDirection: 'row', justifyContent: 'space-between' }, map: { width: 92, height: 92, borderRadius: 46, backgroundColor: '#06141dcc', borderWidth: 1, borderColor: '#5b8396', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, mapRoad: { width: 58, height: 38, borderWidth: 5, borderColor: '#75e8ff', borderRadius: 24, transform: [{ rotate: '-20deg' }] }, mapCar: { position: 'absolute', top: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff5578' }, mapLabel: { position: 'absolute', bottom: 7, color: '#a9d7e7', fontSize: 8, letterSpacing: 2, fontWeight: '900' }, route: { alignSelf: 'flex-start', minWidth: 150, padding: 11, borderRadius: 13, backgroundColor: '#06141dcc', borderWidth: 1, borderColor: '#35596b' }, routeLabel: { color: '#80aabd', fontSize: 9, letterSpacing: 2, fontWeight: '800' }, routeName: { color: '#f5fcff', fontSize: 13, fontWeight: '900', marginTop: 3 }, progress: { height: 5, backgroundColor: '#223c48', borderRadius: 5, marginTop: 8, overflow: 'hidden' }, progressFill: { height: '100%', backgroundColor: '#73e8ff' }, lap: { color: '#9bc1d0', fontSize: 9, marginTop: 6, fontWeight: '800' } });
