import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../types';

export function TaskRow({ task, toggle, remove }: { task: Task; toggle: () => void; remove: () => void }) {
  return <View style={styles.row}><Pressable onPress={toggle} style={[styles.checkbox, task.done && styles.done]}><Text style={styles.check}>{task.done ? '✓' : ''}</Text></Pressable><Text style={[styles.text, task.done && styles.strike]}>{task.title}</Text><Pressable onPress={remove}><Text style={styles.delete}>×</Text></Pressable></View>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#0b1d27', borderRadius: 13, padding: 13, marginBottom: 9 }, checkbox: { width: 25, height: 25, borderWidth: 1, borderColor: '#5d8ba2', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }, done: { backgroundColor: '#67dff6', borderColor: '#67dff6' }, check: { color: '#03131c', fontWeight: '900' }, text: { flex: 1, color: '#e8f5fb', fontSize: 15 }, strike: { color: '#72909e', textDecorationLine: 'line-through' }, delete: { color: '#ff6a83', fontSize: 25 } });
