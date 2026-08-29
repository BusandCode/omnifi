// src/components/cards/CardCarousel.tsx
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40 - 56;
const GOLD = '#E8C77A';

const cards = [
  {
    name: 'Suleiman A.Silver',
    number: '5397 7512 3412 4837',
    last4: '4837',
    exp: '09/28',
    cvv: '482',
    balance: '320.00',
    currency: '$',
    variant: 'luxury' as const,
  },
  {
    name: 'Suleiman Abdulsalam',
    number: '4921 3387 0056 2201',
    last4: '2201',
    exp: '01/27',
    cvv: '117',
    balance: '128,600.00',
    currency: '₦',
    variant: 'purple' as const,
  },
];

export type CardCarouselHandle = {
  flipActiveCard: () => void;
};

function Chip() {
  return (
    <Svg width={30} height={22} viewBox="0 0 32 24">
      <Rect x={0} y={0} width={32} height={24} rx={5} fill="#E8C77A" />
      <Line x1={11} y1={0} x2={11} y2={24} stroke="#B8975A" strokeWidth={0.7} />
      <Line x1={21} y1={0} x2={21} y2={24} stroke="#B8975A" strokeWidth={0.7} />
      <Line x1={0} y1={8.5} x2={32} y2={8.5} stroke="#B8975A" strokeWidth={0.7} />
      <Line x1={0} y1={16} x2={32} y2={16} stroke="#B8975A" strokeWidth={0.7} />
    </Svg>
  );
}

function Contactless({ color = 'rgba(255,255,255,0.8)' }: { color?: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 18 18">
      <Path d="M3 6 A8 8 0 0 1 3 12" fill="none" stroke={color} strokeWidth={1.3} strokeLinecap="round" opacity={0.5} />
      <Path d="M6.5 4 A11 11 0 0 1 6.5 14" fill="none" stroke={color} strokeWidth={1.3} strokeLinecap="round" opacity={0.7} />
      <Path d="M10 2 A14 14 0 0 1 10 16" fill="none" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

function OmniFiLogo({ color = GOLD, size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} fill="none" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.6} fill="none" />
      <Line x1={12} y1={2.5} x2={12} y2={8.3} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={12} y1={15.7} x2={12} y2={21.5} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={2.5} y1={12} x2={8.3} y2={12} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={15.7} y1={12} x2={21.5} y2={12} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function generateWaveDots() {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const cx = 160;
  const cy = 102;
  const count = 260;
  for (let i = 0; i < count; i++) {
    const angle = i * 0.33;
    const radius = 4 + i * 0.42;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * 0.55;
    if (x < 8 || x > 312 || y < 8 || y > 197) continue;
    dots.push({ x, y, r: 0.7 + (i % 3) * 0.35, o: Math.max(0.08, 0.85 - i * 0.003) });
  }
  return dots;
}
const waveDots = generateWaveDots();

function WaveField() {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 320 205" preserveAspectRatio="none">
      {waveDots.map((d, i) => (
        <Circle key={i} cx={d.x} cy={d.y} r={d.r} fill={GOLD} opacity={d.o} />
      ))}
    </Svg>
  );
}

// ---------- FRONT (default, shown at rest — brand + balance) ----------
function CardFront({ c }: { c: (typeof cards)[number] }) {
  const [revealed, setRevealed] = useState(true);
  const isLuxury = c.variant === 'luxury';

  return (
    <View style={styles.face}>
      <LinearGradient
        colors={isLuxury ? ['#161616', '#0A0A0A', '#000000'] : ['#5A3FD9', '#2A1560', '#0D0612']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {isLuxury ? (
        <WaveField />
      ) : (
        <LinearGradient
          colors={['transparent', 'rgba(167,139,250,0.25)', 'transparent']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={styles.brandRow}>
        <View style={styles.brandLeft}>
          <OmniFiLogo color={isLuxury ? GOLD : '#fff'} size={26} />
          <Text style={[styles.brandName, { color: isLuxury ? GOLD : '#fff' }]}>OmniFi Pay</Text>
        </View>
        <TouchableOpacity onPress={() => setRevealed((v) => !v)} hitSlop={8} style={styles.eyeBtn}>
          <Ionicons
            name={revealed ? 'eye-outline' : 'eye-off-outline'}
            size={17}
            color={isLuxury ? GOLD : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.brandCenterRow}>
        <Text style={[styles.frontBalance, { color: isLuxury ? GOLD : '#fff' }]}>
          {revealed ? `${c.currency}${c.balance}` : '••••••'}
        </Text>
      </View>

      <View style={styles.brandBottomRow}>
        <View>
          <Text style={[styles.detailLabel, { color: isLuxury ? GOLD : 'rgba(255,255,255,0.6)' }]}>CARD HOLDER</Text>
          <Text style={styles.detailValue}>{c.name.toUpperCase()}</Text>
        </View>
        <Text style={isLuxury ? styles.visaGold : styles.visa}>VISA</Text>
      </View>

      {isLuxury && <View style={styles.goldBorder} pointerEvents="none" />}
    </View>
  );
}

// ---------- BACK (revealed via "Show details") ----------
function CardBack({ c }: { c: (typeof cards)[number] }) {
  const [revealed, setRevealed] = useState(false);
  const isLuxury = c.variant === 'luxury';

  const maskedNumber = `••••  ••••  ••••  ${c.last4}`;

  return (
    <View style={styles.face}>
      <LinearGradient
        colors={isLuxury ? ['#161616', '#0A0A0A', '#000000'] : ['#5A3FD9', '#2A1560', '#0D0612']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.brandRow}>
        <View style={styles.brandLeft}>
          <OmniFiLogo color={isLuxury ? GOLD : '#fff'} />
          <Text style={[styles.brandName, { color: isLuxury ? GOLD : '#fff' }]}>OmniFi Pay</Text>
        </View>
        <TouchableOpacity onPress={() => setRevealed((v) => !v)} hitSlop={8} style={styles.eyeBtn}>
          <Ionicons
            name={revealed ? 'eye-outline' : 'eye-off-outline'}
            size={17}
            color={isLuxury ? GOLD : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chipNumberRow}>
        <View style={styles.chipContactlessGroup}>
          <Chip />
          <Contactless color={isLuxury ? GOLD : undefined} />
        </View>
        <Text style={styles.cardNumber}>{revealed ? c.number : maskedNumber}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View>
          <Text style={[styles.detailLabel, { color: isLuxury ? GOLD : 'rgba(255,255,255,0.6)' }]}>EXPIRES</Text>
          <Text style={styles.detailValue}>{revealed ? c.exp : '••/••'}</Text>
        </View>
        <View style={styles.cvvBlock}>
          <Text style={[styles.detailLabel, { color: isLuxury ? GOLD : 'rgba(255,255,255,0.6)' }]}>CVV</Text>
          <Text style={styles.detailValue}>{revealed ? c.cvv : '•••'}</Text>
        </View>
      </View>

      {isLuxury && <View style={styles.goldBorder} pointerEvents="none" />}
    </View>
  );
}

// ---------- FLIPPABLE CARD ----------
function FlippableCard({
  c,
  flipped,
  isFlipped,
}: {
  c: (typeof cards)[number];
  flipped: Animated.Value;
  isFlipped: boolean;
}) {
  // At rest (flipped = 0): CardFront shows. Flipped (flipped = 1): CardBack shows.
  const frontRotate = flipped.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flipped.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  const frontOpacity = flipped.interpolate({ inputRange: [0, 0.5, 0.5, 1], outputRange: [1, 1, 0, 0] });
  const backOpacity = flipped.interpolate({ inputRange: [0, 0.5, 0.5, 1], outputRange: [0, 0, 1, 1] });

  return (
    <View style={{ width: CARD_WIDTH }}>
      <Animated.View
        pointerEvents={isFlipped ? 'none' : 'auto'}
        style={[
          styles.faceWrap,
          { opacity: frontOpacity, transform: [{ perspective: 1000 }, { rotateY: frontRotate }] },
        ]}
      >
        <CardFront c={c} />
      </Animated.View>
      <Animated.View
        pointerEvents={isFlipped ? 'auto' : 'none'}
        style={[
          styles.faceWrap,
          styles.faceWrapAbsolute,
          { opacity: backOpacity, transform: [{ perspective: 1000 }, { rotateY: backRotate }] },
        ]}
      >
        <CardBack c={c} />
      </Animated.View>
    </View>
  );
}

export const CardCarousel = forwardRef<CardCarouselHandle>((_props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flipValues = useRef(cards.map(() => new Animated.Value(0))).current;
  const [flippedArr, setFlippedArr] = useState(cards.map(() => false));

  useImperativeHandle(ref, () => ({
    flipActiveCard: () => {
      setFlippedArr((prev) => {
        const next = [...prev];
        next[activeIndex] = !next[activeIndex];
        Animated.timing(flipValues[activeIndex], {
          toValue: next[activeIndex] ? 1 : 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
        return next;
      });
    },
  }));

  const onMomentumScrollEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 12));
    setActiveIndex(Math.max(0, Math.min(cards.length - 1, idx)));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={{ gap: 12 }}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {cards.map((c, i) => (
          <FlippableCard key={i} c={c} flipped={flipValues[i]} isFlipped={flippedArr[i]} />
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {cards.map((_, i) => (
          <View key={i} style={[styles.pageDot, i === activeIndex && styles.pageDotActive]} />
        ))}
      </View>
    </View>
  );
});

CardCarousel.displayName = 'CardCarousel';

const styles = StyleSheet.create({
  container: { marginTop: -11.5 },
  faceWrap: { backfaceVisibility: 'hidden' },
  faceWrapAbsolute: { position: 'absolute', top: 0, left: 0, right: 0 },
  face: {
    height: 205,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  goldBorder: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(232,199,122,0.5)',
  },

  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandName: { fontSize: 12, fontWeight: '400', letterSpacing: 0.3 },
  brandCenterRow: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
  frontBalance: { fontSize: 12, fontWeight: '700', letterSpacing: 0.3 },
  brandBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  eyeBtn: { padding: 2 },
  chipNumberRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chipContactlessGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardNumber: { color: '#fff', fontSize: 14, fontWeight: '600', letterSpacing: 1, marginRight: 22 },
  detailsRow: { flexDirection: 'row', alignItems: 'flex-start' },
  cvvBlock: { marginLeft: 28 },
  detailLabel: { fontSize: 8.5, fontWeight: '600', letterSpacing: 1, marginBottom: 4 },
  detailValue: { color: '#fff', fontSize: 11.5, fontWeight: '600' },
  visa: { color: '#fff', fontSize: 20, fontWeight: '800', fontStyle: 'italic', letterSpacing: 0.3 },
  visaGold: {
    color: GOLD, fontSize: 20, fontWeight: '800', fontStyle: 'italic', letterSpacing: 1,
    textShadowColor: 'rgba(232,199,122,0.45)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6,
  },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#3A3A3C' },
  pageDotActive: { backgroundColor: colors.primary, width: 16 },
});