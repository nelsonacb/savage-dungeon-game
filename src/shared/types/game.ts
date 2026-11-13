export interface Entity {
  id: string;
  position: [number, number];
  velocity: [number, number];
  health: number;
  maxHealth: number;
}

export interface PlayerEntity extends Entity {
  type: 'player';
  name: string;
  class: 'Knight' | 'Mage' | 'Healer' | 'Archer';
}

export interface EnemyEntity extends Entity {
  type: 'enemy';
  aiState: 'idle' | 'chase' | 'attack';
  speed: number;
  detectionRange: number;
  attackRange: number;
}
