import { useBackgroundMusic } from '@/shared/hooks/useBackgroundMusic';
import { useRouter } from 'expo-router';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const menuMusic = require('@/assets/audio/menu_theme.mp3');
const menuBg = require('@/assets/ui/menu_background.png');
const playIcon = require('@/assets/ui/icons/crossed_swords.png');
const shopIcon = require('@/assets/ui/icons/treasure_chest.png');

interface MenuCardProps {
  title: string;
  icon: any;
  onPress: () => void;
  disabled?: boolean;
}

const MenuCard = ({
  title,
  icon,
  onPress,
  disabled = false,
}: MenuCardProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.card,
      pressed && styles.cardPressed,
      disabled && styles.cardDisabled,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Image
      source={icon}
      style={styles.cardIcon}
      resizeMode='contain'
    />
    <Text style={styles.cardTitle}>{title}</Text>
  </Pressable>
);

export default function MenuScreen() {
  const router = useRouter();
  useBackgroundMusic(menuMusic);

  return (
    <ImageBackground
      source={menuBg}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.overlay}>
        <Text style={styles.gameTitle}>SAVAGE DUNGEON</Text>

        <View style={styles.cardGrid}>
          <MenuCard
            title='PLAY'
            icon={playIcon}
            onPress={() => router.push('/quiz')}
          />
          <MenuCard
            title='MULTIPLAYER'
            icon={playIcon} // Reemplaza con icono adecuado
            onPress={() => {}}
            disabled
          />
          <MenuCard
            title='SHOP'
            icon={shopIcon}
            onPress={() => {}}
          />
          <MenuCard
            title='SETTINGS'
            icon={shopIcon} // Reemplaza
            onPress={() => {}}
          />
          <MenuCard
            title='EXIT'
            icon={playIcon} // Reemplaza
            onPress={() => {}}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)', // Oscurece el fondo para que resalten las tarjetas
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameTitle: {
    fontSize: 52,
    fontWeight: '900',
    color: '#F5E6D3',
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    marginBottom: 50,
    letterSpacing: 2,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: 'rgba(139, 69, 19, 0.85)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D2B48C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    // Sombra para dar profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  cardPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: 'rgba(139, 69, 19, 1)',
  },
  cardDisabled: {
    opacity: 0.4,
  },
  cardIcon: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
