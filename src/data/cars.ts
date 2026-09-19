export type CarProfile = {
  id: string;
  name: string;
  className: string;
  color: string;
  accent: string;
  topSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;
  price: string;
};

// Original fictional profiles inspired by broad performance-car categories.
// Do not use manufacturer logos or unlicensed proprietary models.
export const CAR_PROFILES: CarProfile[] = [
  { id: 'aurora-v12', name: 'Aurora V12', className: 'Italian V12', color: '#ef315e', accent: '#ffb6c7', topSpeed: 326, acceleration: 9.8, handling: 8.7, braking: 8.6, price: '$420K' },
  { id: 'coast-gt3', name: 'Coast GT3', className: 'German GT', color: '#32bdf2', accent: '#b7f2ff', topSpeed: 304, acceleration: 8.8, handling: 9.5, braking: 9.2, price: '$310K' },
  { id: 'monarch-m8', name: 'Monarch M8', className: 'M Performance', color: '#eeb93f', accent: '#fff0a9', topSpeed: 311, acceleration: 9.2, handling: 8.9, braking: 8.9, price: '$340K' },
];
