import { EnemyEntity, PlayerEntity } from '@/shared/types/game';

export const EnemyAISystem = (entities: { [key: string]: any }, { time }: { time: number }) => {
  const player = Object.values(entities).find((e: any) => e.type === 'player') as PlayerEntity | undefined;
  const enemies = Object.values(entities).filter((e: any) => e.type === 'enemy') as EnemyEntity[];

  if (!player) return entities;

  enemies.forEach(enemy => {
    const dx = player.position[0] - enemy.position[0];
    const dy = player.position[1] - enemy.position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Lógica de IA simple basada en estados
    if (distance < enemy.detectionRange) {
      enemy.aiState = 'chase';
    } else {
      enemy.aiState = 'idle';
    }

    if (enemy.aiState === 'chase') {
      // Movimiento hacia el jugador
      const angle = Math.atan2(dy, dx);
      enemy.position[0] += Math.cos(angle) * enemy.speed * (time.delta / 1000);
      enemy.position[1] += Math.sin(angle) * enemy.speed * (time.delta / 1000);
    }

    // Actualizar el renderizador con la nueva posición
    if (enemy.renderer) {
      enemy.renderer = <enemy.renderer.type {...enemy.renderer.props} position={enemy.position} />;
    }
  });

  return entities;
};