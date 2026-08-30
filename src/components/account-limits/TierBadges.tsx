// TierBadges.tsx — SVG hero badges: shield+"1", shield+check, gold crown hexagon
import React from 'react';
import { View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  Polygon,
  Circle,
  Ellipse,
  Text as SvgText,
  G,
} from 'react-native-svg';

const PURPLE_DARK = '#4C1D95';
const PURPLE = '#7C3AED';
const PURPLE_LIGHT = '#A78BFA';
const GOLD_DARK = '#B8860B';
const GOLD = '#F5B324';
const GOLD_LIGHT = '#FFE49A';

function Pedestal({ width = 160, glow = PURPLE }: { width?: number; glow?: string }) {
  return (
    <G>
      <Ellipse cx={width / 2} cy={148} rx={width * 0.42} ry={10} fill={glow} opacity={0.25} />
      <Ellipse cx={width / 2} cy={140} rx={width * 0.34} ry={9} fill="#2A2438" />
      <Ellipse cx={width / 2} cy={132} rx={width * 0.3} ry={8} fill="#352C4A" />
    </G>
  );
}

export function ShieldNumberBadge({ size = 160 }: { size?: number }) {
  const w = size;
  const h = size * 1.05;
  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 160 168">
        <Defs>
          <LinearGradient id="shieldFill1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={PURPLE_LIGHT} stopOpacity={0.15} />
            <Stop offset="1" stopColor={PURPLE_DARK} stopOpacity={0.35} />
          </LinearGradient>
        </Defs>
        <Pedestal width={160} glow={PURPLE} />
        <Path
          d="M80 12 L134 32 V78 C134 114 111 140 80 154 C49 140 26 114 26 78 V32 Z"
          fill="url(#shieldFill1)"
          stroke={PURPLE}
          strokeWidth={4}
        />
        <SvgText x="80" y="98" fontSize="46" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
          1
        </SvgText>
      </Svg>
    </View>
  );
}

export function ShieldCheckBadge({ size = 160 }: { size?: number }) {
  const w = size;
  const h = size * 1.05;
  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 160 168">
        <Defs>
          <LinearGradient id="shieldFill2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={PURPLE_LIGHT} />
            <Stop offset="1" stopColor={PURPLE} />
          </LinearGradient>
        </Defs>
        <Pedestal width={160} glow={PURPLE} />
        <Path
          d="M80 10 L136 31 V79 C136 116 112 143 80 156 C48 143 24 116 24 79 V31 Z"
          fill="url(#shieldFill2)"
        />
        <Path
          d="M80 10 L136 31 V79 C136 116 112 143 80 156 C48 143 24 116 24 79 V31 Z"
          fill="none"
          stroke={PURPLE_LIGHT}
          strokeWidth={2}
          opacity={0.6}
        />
        <Path
          d="M58 82 L74 98 L104 62"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function Sparkle({ x, y, s = 8, color = GOLD }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <Path
      d={`M${x} ${y - s} L${x + s * 0.3} ${y - s * 0.3} L${x + s} ${y} L${x + s * 0.3} ${y + s * 0.3} L${x} ${y + s} L${x - s * 0.3} ${y + s * 0.3} L${x - s} ${y} L${x - s * 0.3} ${y - s * 0.3} Z`}
      fill={color}
      opacity={0.85}
    />
  );
}

function Hexagon({
  cx,
  cy,
  r,
  fillId,
  stroke = GOLD,
  strokeWidth = 3,
}: {
  cx: number;
  cy: number;
  r: number;
  fillId: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const pts = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (Math.PI / 180) * (deg - 90);
    return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
  });
  return <Polygon points={pts.join(' ')} fill={`url(#${fillId})` as any} stroke={stroke} strokeWidth={strokeWidth} />;
}

export function CrownHexBadge({
  size = 180,
  locked = false,
  label = '3',
  glow = true,
}: {
  size?: number;
  locked?: boolean;
  label?: string;
  glow?: boolean;
}) {
  const w = size;
  const h = size * 1.1;
  const isFull = label.length <= 1;
  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 180 198">
        <Defs>
          <LinearGradient id="hexFillGold" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={PURPLE_DARK} />
            <Stop offset="1" stopColor="#241B3D" />
          </LinearGradient>
          <LinearGradient id="hexFillLocked" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#2A2438" />
            <Stop offset="1" stopColor="#1C1830" />
          </LinearGradient>
          <RadialGradient id="crownGlow" cx="0.5" cy="0.45" r="0.6">
            <Stop offset="0" stopColor={GOLD} stopOpacity={0.35} />
            <Stop offset="1" stopColor={GOLD} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Pedestal width={180} glow={locked ? PURPLE : GOLD} />

        {glow && <Circle cx={90} cy={80} r={78} fill="url(#crownGlow)" />}

        {!locked && (
          <>
            <Sparkle x={26} y={30} s={7} />
            <Sparkle x={152} y={44} s={5} />
            <Sparkle x={140} y={16} s={4} />
          </>
        )}

        <Hexagon
          cx={90}
          cy={92}
          r={62}
          fillId={locked ? 'hexFillLocked' : 'hexFillGold'}
          stroke={locked ? PURPLE : GOLD}
          strokeWidth={3.5}
        />

        {locked ? (
          <G>
            <Path
              d="M78 84 v-10 a12 12 0 0 1 24 0 v10"
              fill="none"
              stroke={PURPLE_LIGHT}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <Path d="M70 84 h40 v28 a4 4 0 0 1 -4 4 h-32 a4 4 0 0 1 -4 -4 Z" fill={PURPLE_LIGHT} />
          </G>
        ) : (
          <G>
            <Path
              d="M62 70 L74 92 L90 66 L106 92 L118 70 L112 100 H68 Z"
              fill={GOLD}
              stroke={GOLD_DARK}
              strokeWidth={1.5}
            />
            <Circle cx={62} cy={68} r={5} fill={GOLD_LIGHT} />
            <Circle cx={90} cy={62} r={5.5} fill={GOLD_LIGHT} />
            <Circle cx={118} cy={68} r={5} fill={GOLD_LIGHT} />
          </G>
        )}

        <SvgText
          x="90"
          y={isFull ? 138 : 132}
          fontSize={isFull ? 34 : 17}
          fontWeight="800"
          fill={locked ? '#8B7BAE' : GOLD}
          textAnchor="middle"
          letterSpacing={isFull ? 0 : 1}
        >
          {label}
        </SvgText>
      </Svg>
    </View>
  );
}