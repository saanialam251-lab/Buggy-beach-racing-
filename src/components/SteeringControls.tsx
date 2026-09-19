import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { onSteer: (value: number) => void; onThrottle: () => void; onBrake: () => void; onNitro: () => void };

export function SteeringControls({ onSteer, onThrottle, onBrake, onNitro }: Props) {
  return <View style={styles.controls}>
    <View style={styles.steering}><Pressable style={styles.button} onPressIn={() => onSteer(-1)} onPressOut={() => onSteer(0)}><Text style={styles.icon}>◀</Text></Pressable><Pressable style={styles.button} onPressIn={() => onSteer(1)} onPressOut={() => onSteer(0)}><Text style={styles.icon}>▶</Text></Pressable></View>
    <View style={styles.actions}><Pressable style={styles.action} onPress={onBrake}><Text style={styles.text}>BRAKE</Text></Pressable><Pressable style={styles.action} onPress={onThrottle}><Text style={styles.text}>ACCEL</Text></Pressable><Pressable style={[styles.action, styles.nitro]} onPress={onNitro}><Text style={styles.text}>NITRO</Text></Pressable></View>
  </View>;
}
const styles = StyleSheet.create({ controls: { position: 'absolute', left: 18, right: 18, bottom: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, steering: { flexDirection: 'row', gap: 10 }, actions: { flexDirection: 'row', gap: 8 }, button: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#07151ee8', borderWidth: 1, borderColor: '#4c7185', alignItems: 'center', justifyContent: 'center' }, icon: { color: '#eafaff', fontSize: 22, fontWeight: '900' }, action: { paddingHorizontal: 14, paddingVertical: 15, borderRadius: 12, backgroundColor: '#07151ee8', borderWidth: 1, borderColor: '#4c7185' }, nitro: { borderColor: '#71e6ff' }, text: { color: '#f4fbff', fontSize: 10, fontWeight: '900', letterSpacing: 1 }
});
