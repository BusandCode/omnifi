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
                <Check color="#fff" size={9} strokeWidth={3} />
              </View>
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.graphic}>
          <View style={styles.miniCol}>
            <MiniIcon>
              <InfinityIcon color={colors.primary} size={13} />
            </MiniIcon>
            <MiniIcon style={{ marginTop: 28 }}>
              <TrendingUp color={colors.primary} size={13} />
            </MiniIcon>
          </View>

          <CrownHexBadge
            size={isTier1 ? 60 : 62}
            locked={isTier1}
            label={highest ? '3' : isTier1 ? 'TIER 2' : 'TIER 3'}
            glow={highest}
          />

          <View style={[styles.miniCol, { marginLeft: -6 }]}>
            <MiniIcon>
              <TrendingUp color={colors.primary} size={13} />
            </MiniIcon>
            <MiniIcon style={{ marginTop: 28 }}>
              <Headphones color={colors.primary} size={13} />
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.35)',
    padding: 12,
    marginBottom: 10,
  },
  cardHighest: {
    borderColor: 'rgba(245, 179, 36, 0.4)',
    shadowColor: '#F5B324',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 10,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checklist: {
    flex: 1,
    gap: 7,
    paddingRight: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: colors.textSecondary,
    fontSize: 10.5,
    flexShrink: 1,
  },
  graphic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
  },
  miniCol: {
    justifyContent: 'center',
  },
  miniIconBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});