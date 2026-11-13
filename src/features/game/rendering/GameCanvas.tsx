import { EnemyEntity, PlayerEntity } from '@/shared/types/game';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';

const playerSprite = require('@/assets/sprites/knight.png');
const enemySprite = require('@/assets/sprites/goblin.png');

interface GameCanvasProps {
  player: PlayerEntity;
  enemies: EnemyEntity[];
}

export const GameCanvas = ({ player, enemies }: GameCanvasProps) => {
  const playerImage = useImage(playerSprite);
  const enemyImage = useImage(enemySprite);

  // En un caso real, aquí usarías SharedValues para actualizar posiciones
  // a 60 FPS sin re-renderizar el componente de React.
  // Por simplicidad en este ejemplo, usamos las posiciones directamente.

  if (!playerImage || !enemyImage) return null;

  return (
    <Canvas style={{ flex: 1 }}>
      {/* Dibujar al jugador */}
      <Image
        image={playerImage}
        x={player.position[0]}
        y={player.position[1]}
        width={64}
        height={64}
        fit='contain'
      />

      {/* Dibujar a los enemigos */}
      {enemies.map((enemy) => (
        <Image
          key={enemy.id}
          image={enemyImage}
          x={enemy.position[0]}
          y={enemy.position[1]}
          width={48}
          height={48}
          fit='contain'
        />
      ))}
    </Canvas>
  );
};
