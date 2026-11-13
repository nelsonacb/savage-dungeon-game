import { GameCanvas } from '@/features/game/rendering/GameCanvas';
import { useGameStore } from '@/shared/stores/gameStore';
import { EnemyEntity } from '@/shared/types/game';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFrameCallback } from 'react-native-reanimated';

export default function GameScreen() {
  const { player } = useGameStore();
  const [enemies, setEnemies] = useState<EnemyEntity[]>([
    {
      id: 'enemy1',
      type: 'enemy',
      position: [300, 200],
      velocity: [0, 0],
      health: 50,
      maxHealth: 50,
      aiState: 'idle',
      speed: 60,
      detectionRange: 150,
      attackRange: 30,
    },
  ]);

  // Game loop: se ejecuta en cada frame
  useFrameCallback((frameInfo) => {
    if (!player) return;

    const deltaTime = (frameInfo.timeSincePreviousFrame ?? 16) / 1000; // en segundos

    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const dx = player.position[0] - enemy.position[0];
        const dy = player.position[1] - enemy.position[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        let newState = enemy.aiState;
        if (distance < enemy.detectionRange) {
          newState = 'chase';
        } else {
          newState = 'idle';
        }

        const newPosition: [number, number] = [...enemy.position];

        if (newState === 'chase') {
          const angle = Math.atan2(dy, dx);
          newPosition[0] += Math.cos(angle) * enemy.speed * deltaTime;
          newPosition[1] += Math.sin(angle) * enemy.speed * deltaTime;
        }

        return { ...enemy, position: newPosition, aiState: newState };
      }),
    );
  });

  if (!player) return null;

  return (
    <View style={styles.container}>
      <GameCanvas
        player={player}
        enemies={enemies}
      />
      {/* Diálogo, HUD, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2E1A0F' },
});
