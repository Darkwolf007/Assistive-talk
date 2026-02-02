
export interface NeedItem {
  id: string;
  label: string;
  tamilLabel: string;
  icon: string;
  color: string;
  speechText: string;
  phoneNumber?: string;
  type?: 'basic' | 'person' | 'emergency' | 'draw';
}

export type AppMode = 'GRID' | 'DRAW' | 'SETTINGS' | 'EMERGENCY_LIST';
