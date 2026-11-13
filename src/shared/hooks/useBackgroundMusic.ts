import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

export const useBackgroundMusic = (source: number) => {
  // El hook carga el audio automáticamente al montar
  const player = useAudioPlayer(source);

  useEffect(() => {
    // Configurar modo de audio (opcional, para que suene en modo silencio en iOS)
    setAudioModeAsync({
      playsInSilentMode: true,
    }).catch(console.error);

    player.loop = true;
    player.volume = 0.6;
    player.play();

    // Cleanup: expo-audio libera el recurso automáticamente al desmontar
    return () => {
      player.pause();
    };
  }, [player]);

  return player;
};
