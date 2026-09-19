import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CarProfile } from '../data/cars';

export function GarageCard({ car, selected, onPress }: { car: CarProfile; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.card, selected && { borderColor: car.color, backgroundColor: `${car.color}18` }]}>
    <View style={[styles.dot, { backgroundColor: car.color }]} />
    <View style={styles.info}><Text style={styles.name}>{car.name}</Text><Text style={styles.meta}>{car.className} · {car.topSpeed} km/h · grip {car.handling}</Text></View>
    <Text style={styles.price}>{car.price}</Text>
  </Pressable>;
}
const styles = StyleSheet.create({ card: { minHeight: 76, borderRadius: 16, borderWidth: 1, borderColor: '#264352', padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, dot: { width: 36, height: 36, borderRadius: 18, marginRight: 13 }, info: { flex: 1 }, name: { color: '#f4fbff', fontSize: 16, fontWeight: '900' }, meta: { color: '#91adbd', fontSize: 12, marginTop: 4 }, price: { color: '#ffd56b', fontWeight: '900' } });
