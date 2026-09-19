import type { CarProfile } from './cars';

export const FEATURED_CARS: CarProfile[] = [
  { id: 'aurora-v12', name: 'Aurora V12', className: 'Italian V12', color: '#ef315e', accent: '#ffb6c7', topSpeed: 326, acceleration: 9.8, handling: 8.7, braking: 8.6, price: '$420K' },
  { id: 'coast-gt3', name: 'Coast GT3', className: 'German GT', color: '#32bdf2', accent: '#b7f2ff', topSpeed: 304, acceleration: 8.8, handling: 9.5, braking: 9.2, price: '$310K' },
  { id: 'monarch-m8', name: 'Monarch M8', className: 'M Performance', color: '#eeb93f', accent: '#fff0a9', topSpeed: 311, acceleration: 9.2, handling: 8.9, braking: 8.9, price: '$340K' },
  { id: 'veloce-strada', name: 'Veloce Strada', className: 'Track Wedge', color: '#a85cff', accent: '#e4caff', topSpeed: 338, acceleration: 10, handling: 8.4, braking: 9.1, price: '$510K' },
  { id: 'solaris-gt', name: 'Solaris GT', className: 'Grand Tourer', color: '#f07f36', accent: '#ffd1a4', topSpeed: 298, acceleration: 8.4, handling: 9.1, braking: 8.8, price: '$285K' },
  { id: 'tempest-r', name: 'Tempest R', className: 'Hypercar', color: '#2de0a5', accent: '#b4ffe9', topSpeed: 351, acceleration: 10, handling: 9, braking: 9.4, price: '$620K' },
];
