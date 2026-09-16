// src/components/food/PromoBanner.tsx
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { foodColors } from '../../constants/foodColors';

export function PromoBanner() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80' }}
      style={styles.banner}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>Feed Your{'\n'}<Text style={styles.titleAccent}>Cravings.</Text></Text>
        <Text style={styles.subtitle}>Hot meals • Fast delivery</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: { height: 160, borderRadius: 18, overflow: 'hidden', justifyContent: 'center' },
  image: { resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,10,20,0.45)' },
  textBlock: { paddingHorizontal: 20 },
  title: { fontFamily: undefined, fontSize: 26, fontWeight: '700', color: '#fff', lineHeight: 30 },
  titleAccent: { color: foodColors.primary, fontStyle: 'italic' },
  subtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 6 },
});