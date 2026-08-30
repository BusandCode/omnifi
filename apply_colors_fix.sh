rm -f src/config/theme.ts
cat > src/components/account-limits/AccountLimitsHeader.tsx << 'EOF'
// AccountLimitsHeader.tsx — back button, title, shield status icon
import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface Props {
  onBack?: () => void;
  filledShield?: boolean; // true for Tier 3 (solid purple badge)
}

export default function AccountLimitsHeader({ onBack, filledShield }: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconBtn} onPress={onBack} hitSlop={10}>
        <ChevronLeft color={colors.textPrimary} size={22} />
      </Pressable>
      <Text style={styles.title}>Account Limits</Text>
      <View style={[styles.iconBtn, filledShield && styles.iconBtnFilled]}>
        <ShieldCheck
          color={filledShield ? '#0A0812' : colors.primary}
          size={20}
          fill={filledShield ? colors.primary : 'transparent'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : 24,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
});
EOF

cat > src/components/account-limits/TierBadges.tsx << 'EOF'
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
EOF

cat > src/components/account-limits/VerificationLevelCard.tsx << 'EOF'
// VerificationLevelCard.tsx — tier name, badge graphic, daily/monthly limits, progress bar
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { TierConfig } from '../../config/tierConfig';
import { ShieldNumberBadge, ShieldCheckBadge, CrownHexBadge } from './TierBadges';

interface Props {
  config: TierConfig;
}

export default function VerificationLevelCard({ config }: Props) {
  const isTier1 = config.tier === 1;
  const isTier2 = config.tier === 2;
  const isTier3 = config.tier === 3;

  return (
    <View style={[styles.card, isTier3 && styles.cardTier3]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Current Verification Level</Text>
          <Text style={styles.tier}>{config.levelName}</Text>
          {config.badgeLabel && (
            <View style={styles.badgeLabelRow}>
              <Text style={[styles.badgeLabelText, isTier3 && { color: colors.primary }]}>
                {config.badgeLabel}
              </Text>
              {isTier3 && (
                <View style={styles.verifiedDot}>
                  <Check color="#fff" size={10} strokeWidth={3} />
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.badgeGraphic}>
          {isTier1 && <ShieldNumberBadge size={110} />}
          {isTier2 && <ShieldCheckBadge size={110} />}
          {isTier3 && <CrownHexBadge size={120} label="3" />}
        </View>
      </View>

      <View style={styles.pairRow}>
        <View style={styles.pairCol}>
          <Text style={styles.pairLabel}>Daily Limit</Text>
          <Text style={styles.pairValue}>{config.dailyLimit}</Text>
        </View>
        <View style={styles.pairDivider} />
        <View style={styles.pairCol}>
          <Text style={styles.pairLabel}>Monthly Limit</Text>
          <Text style={styles.pairValue}>{config.monthlyLimit}</Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${config.progressPercent}%` }]}
          />
        </View>
        <Text style={styles.progressPercent}>{config.progressPercent}%</Text>
      </View>

      <Text style={styles.caption}>{config.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginTop: 4,
    marginBottom: 22,
  },
  cardTier3: {
    borderColor: 'rgba(245, 179, 36, 0.35)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12.5,
    marginBottom: 6,
  },
  tier: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  badgeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  badgeLabelText: {
    color: colors.primary,
    fontSize: 13.5,
    fontWeight: '600',
  },
  verifiedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGraphic: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  pairCol: {
    flex: 1,
  },
  pairDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 14,
  },
  pairLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  pairValue: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 10,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercent: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: '600',
    width: 34,
    textAlign: 'right',
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    marginTop: 10,
    lineHeight: 18,
  },
});
EOF

cat > src/components/account-limits/LimitsListCard.tsx << 'EOF'
// LimitsListCard.tsx — reusable section title + card of limit rows
// Used for both "Transfer Limits" and "Wallet Limits" sections.
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  ChevronRight,
  Landmark,
  CreditCard,
  Globe,
  Repeat,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { LimitRow } from '../../config/tierConfig';

const ICON_MAP: Record<LimitRow['icon'], React.ComponentType<any>> = {
  bank: Landmark,
  card: CreditCard,
  globe: Globe,
  swap: Repeat,
  wallet: Wallet,
  deposit: ArrowUpCircle,
  withdraw: ArrowDownCircle,
  virtualCard: CreditCard,
};

interface Props {
  title: string;
  rows: LimitRow[];
  onRowPress?: (rowKey: string) => void;
}

export default function LimitsListCard({ title, rows, onRowPress }: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, idx) => (
          <LimitRowItem
            key={row.key}
            row={row}
            isLast={idx === rows.length - 1}
            onPress={() => onRowPress?.(row.key)}
          />
        ))}
      </View>
    </>
  );
}

function LimitRowItem({
  row,
  isLast,
  onPress,
}: {
  row: LimitRow;
  isLast: boolean;
  onPress?: () => void;
}) {
  const Icon = ICON_MAP[row.icon];
  const Wrapper: any = row.showChevron ? Pressable : View;

  return (
    <Wrapper
      onPress={row.showChevron ? onPress : undefined}
      style={[styles.row, !isLast && styles.rowDivider]}
    >
      <View style={styles.rowIcon}>
        <Icon color={colors.primary} size={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{row.label}</Text>
        {row.sublabel && <Text style={styles.rowSublabel}>{row.sublabel}</Text>}
      </View>
      <Text style={[styles.rowValue, row.valueColor === 'success' && { color: colors.success }]}>
        {row.value}
      </Text>
      {row.showChevron && (
        <ChevronRight color={colors.textSecondary} size={18} style={{ marginLeft: 6 }} />
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15.5,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: 14.5,
    fontWeight: '600',
  },
  rowSublabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  rowValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
EOF

cat > src/components/account-limits/UnlockTierCard.tsx << 'EOF'
// UnlockTierCard.tsx — "Unlock More with Tier X" / "You're at the Highest Level" card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, Infinity as InfinityIcon, TrendingUp, Headphones } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { TierConfig } from '../../config/tierConfig';
import { CrownHexBadge } from './TierBadges';

interface Props {
  config: TierConfig;
}

export default function UnlockTierCard({ config }: Props) {
  const isTier1 = config.tier === 1;
  const isTier2 = config.tier === 2;
  const highest = !!config.unlockCard.highestLevel;

  return (
    <View style={[styles.card, highest && styles.cardHighest]}>
      <Text style={styles.title}>
        {config.unlockCard.title}
        {highest ? '  \uD83D\uDC51' : ''}
      </Text>

      <View style={styles.body}>
        <View style={styles.checklist}>
          {config.unlockCard.items.map((item) => (
            <View key={item.key} style={styles.itemRow}>
              <View style={styles.checkDot}>
                <Check color="#fff" size={11} strokeWidth={3} />
              </View>
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.graphic}>
          <View style={styles.miniCol}>
            <MiniIcon>
              <InfinityIcon color={colors.primary} size={16} />
            </MiniIcon>
            <MiniIcon style={{ marginTop: 46 }}>
              <TrendingUp color={colors.primary} size={16} />
            </MiniIcon>
          </View>

          <CrownHexBadge
            size={isTier1 ? 96 : 100}
            locked={isTier1 || isTier2}
            label={highest ? '3' : isTier1 ? 'TIER 2' : 'TIER 3'}
            glow={highest}
          />

          <View style={[styles.miniCol, { marginLeft: -10 }]}>
            <MiniIcon>
              <TrendingUp color={colors.primary} size={16} />
            </MiniIcon>
            <MiniIcon style={{ marginTop: 46 }}>
              <Headphones color={colors.primary} size={16} />
            </MiniIcon>
          </View>
        </View>
      </View>
    </View>
  );
}

function MiniIcon({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.miniIconBubble, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.35)',
    padding: 18,
    marginBottom: 22,
  },
  cardHighest: {
    borderColor: 'rgba(245, 179, 36, 0.4)',
    shadowColor: '#F5B324',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16.5,
    fontWeight: '700',
    marginBottom: 16,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checklist: {
    flex: 1,
    gap: 12,
    paddingRight: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: colors.textSecondary,
    fontSize: 13,
    flexShrink: 1,
  },
  graphic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
  },
  miniCol: {
    justifyContent: 'center',
  },
  miniIconBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
EOF

cat > src/components/account-limits/AccountLimitsFooter.tsx << 'EOF'
// AccountLimitsFooter.tsx — gradient CTA button + "Need help? Contact Support"
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface Props {
  ctaLabel: string;
  showFooterHelp: boolean;
  onCtaPress?: () => void;
  onContactSupport?: () => void;
}

export default function AccountLimitsFooter({
  ctaLabel,
  showFooterHelp,
  onCtaPress,
  onContactSupport,
}: Props) {
  return (
    <>
      <Pressable onPress={onCtaPress}>
        <LinearGradient
          colors={[colors.primary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.label}>{ctaLabel}</Text>
          <ChevronRight color="#fff" size={18} />
        </LinearGradient>
      </Pressable>

      {showFooterHelp && (
        <Pressable onPress={onContactSupport} style={styles.footerRow}>
          <Text style={styles.footerText}>
            Need help? <Text style={styles.footerLink}>Contact Support</Text>
          </Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  label: {
    color: '#fff',
    fontSize: 15.5,
    fontWeight: '700',
  },
  footerRow: {
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
EOF

cat > app/account-limits.tsx << 'EOF'
// app/account-limits.tsx — Expo Router screen composing the account-limits components
import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { TIER_CONFIGS, TierNumber } from '../src/config/tierConfig';
import AccountLimitsHeader from '../src/components/account-limits/AccountLimitsHeader';
import VerificationLevelCard from '../src/components/account-limits/VerificationLevelCard';
import LimitsListCard from '../src/components/account-limits/LimitsListCard';
import UnlockTierCard from '../src/components/account-limits/UnlockTierCard';
import AccountLimitsFooter from '../src/components/account-limits/AccountLimitsFooter';

// Swap this for the logged-in user's real verification tier.
const CURRENT_TIER: TierNumber = 1;

export default function AccountLimitsScreen() {
  const router = useRouter();
  const config = useMemo(() => TIER_CONFIGS[CURRENT_TIER], []);

  return (
    <View style={styles.screen}>
      <AccountLimitsHeader
        onBack={() => router.back()}
        filledShield={config.tier === 3}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <VerificationLevelCard config={config} />

        <LimitsListCard
          title="Transfer Limits"
          rows={config.transferLimits}
          onRowPress={(key) => router.push(`/account-limits/${key}`)}
        />

        <LimitsListCard title="Wallet Limits" rows={config.walletLimits} />

        <UnlockTierCard config={config} />

        <AccountLimitsFooter
          ctaLabel={config.ctaLabel}
          showFooterHelp={config.showFooterHelp}
          onCtaPress={() => router.push(`/kyc/upgrade?target=${config.tier + 1}`)}
          onContactSupport={() => router.push('/support')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});
EOF

