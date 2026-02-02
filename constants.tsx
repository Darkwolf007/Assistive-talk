
import { NeedItem } from './types';

export const ALL_NEEDS: NeedItem[] = [
  {
    id: 'water',
    label: 'Water',
    tamilLabel: 'தண்ணீர்',
    icon: '💧',
    color: 'bg-blue-500/10 border-blue-400/30 text-blue-100',
    speechText: 'எனக்கு தண்ணீர் வேண்டும்'
  },
  {
    id: 'food',
    label: 'Food',
    tamilLabel: 'உணவு',
    icon: '🍲',
    color: 'bg-orange-500/10 border-orange-400/30 text-orange-100',
    speechText: 'எனக்கு பசிக்கிறது, உணவு வேண்டும்'
  },
  {
    id: 'toilet',
    label: 'Toilet',
    tamilLabel: 'கழிப்பறை',
    icon: '🚽',
    color: 'bg-purple-500/10 border-purple-400/30 text-purple-100',
    speechText: 'நான் கழிப்பறைக்குச் செல்ல வேண்டும்'
  },
  {
    id: 'warm',
    label: 'Warm',
    tamilLabel: 'வெப்பம்',
    icon: '🔥',
    color: 'bg-red-500/10 border-red-400/30 text-red-100',
    speechText: 'எனக்கு குளிராக இருக்கிறது'
  },
  {
    id: 'sleep',
    label: 'Sleep',
    tamilLabel: 'தூக்கம்',
    icon: '😴',
    color: 'bg-indigo-500/10 border-indigo-400/30 text-indigo-100',
    speechText: 'எனக்கு தூக்கம் வருகிறது'
  },
  {
    id: 'medicine',
    label: 'Medicine',
    tamilLabel: 'மருந்து',
    icon: '💊',
    color: 'bg-teal-500/10 border-teal-400/30 text-teal-100',
    speechText: 'எனக்கு மருந்து வேண்டும்'
  },
  {
    id: 'ashok',
    label: 'Ashok',
    tamilLabel: 'அசோக்',
    icon: '👨‍🦳',
    color: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-100',
    speechText: 'அசோக்கை கூப்பிடுங்கள்',
    phoneNumber: '9444549650',
    type: 'person'
  },
  {
    id: 'mathu',
    label: 'Mathu',
    tamilLabel: 'மது',
    icon: '👩‍🦳',
    color: 'bg-pink-500/10 border-pink-400/30 text-pink-100',
    speechText: 'மதுவை கூப்பிடுங்கள்',
    phoneNumber: '9940322325',
    type: 'person'
  },
  {
    id: 'shylesh',
    label: 'Shylesh',
    tamilLabel: 'சைலேஷ்',
    icon: '👦',
    color: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-100',
    speechText: 'சைலேஷை கூப்பிடுங்கள்',
    phoneNumber: '8122327669',
    type: 'person'
  },
  {
    id: 'krishna',
    label: 'Krishna',
    tamilLabel: 'கிருஷ்ணா',
    icon: '🧔',
    color: 'bg-yellow-500/10 border-yellow-400/30 text-yellow-100',
    speechText: 'கிருஷ்ணாவை கூப்பிடுங்கள்',
    phoneNumber: '7358387750',
    type: 'person'
  }
];

export const EMERGENCY_CONTACTS = ALL_NEEDS.filter(n => n.type === 'person');

export const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' }
];

export const PEN_SIZES = [4, 8, 16, 24];
