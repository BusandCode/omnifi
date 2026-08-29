import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40 - 56;
const ITEM_WIDTH = CARD_WIDTH + 10;
const AUTOPLAY_INTERVAL = 3500;
const RESUME_DELAY = 4000;

const featured = [
  { tag: "20% OFF", title: "Book top hotels", sub: "Enjoy up to 20% off on selected hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  { tag: "CASHBACK", title: "Eat out, get back", sub: "Get up to 10% cashback at your favorite spots", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
  { tag: "15% OFF", title: "Fly out this weekend", sub: "Save 15% on domestic flight bookings", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600" },
  { tag: "NEW", title: "Movie night deals", sub: "Buy 1 get 1 free on select cinema tickets", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600" },
  { tag: "10% OFF", title: "Shop electronics", sub: "10% off gadgets and accessories this week", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600" },
  { tag: "FREE RIDE", title: "Ride, then rest", sub: "First ride free with select partners", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600" },
];

export function FeaturedCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const activeRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeRef.current + 1) % featured.length;
      scrollRef.current?.scrollTo({ x: next * ITEM_WIDTH, animated: true });
      activeRef.current = next;
      setActive(next);
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleManualScrollStart = () => {
    stopAutoplay();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleManualScrollEnd = (idx: number) => {
    activeRef.current = idx;
    setActive(idx);
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, RESUME_DELAY);
  };

  return (
    <View>
      <Text style={styles.title}>Featured for you</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ gap: 10 }}
        onScrollBeginDrag={handleManualScrollStart}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
          handleManualScrollEnd(idx);
        }}
      >
        {featured.map((f) => (
          <ImageBackground
            key={f.title}
            source={{ uri: f.image }}
            style={[styles.card, { width: CARD_WIDTH }]}
            imageStyle={{ borderRadius: 14 }}
          >
            <View style={styles.overlay} />
            <View style={styles.tag}>
              <Text style={styles.tagText}>{f.tag}</Text>
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardSub} numberOfLines={1}>{f.sub}</Text>
            </View>
            <TouchableOpacity style={styles.arrowBtn}>
              <Feather name="chevron-right" size={13} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {featured.map((_, i) => (
          <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 11, fontWeight: "600", marginBottom: 8 },
  card: { height: 150, borderRadius: 14, padding: 9, justifyContent: "space-between", overflow: "hidden" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 14 },
  tag: { alignSelf: "flex-start", backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5 },
  tagText: { color: "#fff", fontSize: 8.5, fontWeight: "700" },
  textBlock: { gap: 2 },
  cardTitle: { color: "#fff", fontSize: 10.5, fontWeight: "700" },
  cardSub: { color: "rgba(255,255,255,0.85)", fontSize: 8.5 },
  arrowBtn: {
    position: "absolute", bottom: 10, right: 10,
    width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center", alignItems: "center",
  },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 5, marginTop: 8 },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#3A3A3C" },
  dotActive: { backgroundColor: colors.primary, width: 12 },
});