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
                  <Check color="#fff" size={9} strokeWidth={3} />
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.badgeGraphic}>
          {isTier1 && <ShieldNumberBadge size={64} />}
          {isTier2 && <ShieldCheckBadge size={64} />}
          {isTier3 && <CrownHexBadge size={70} label="3" />}
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  cardTier3: {
    borderColor: 'rgba(245, 179, 36, 0.35)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 10.5,
    marginBottom: 3,
  },
  tier: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  badgeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 5,
  },
  badgeLabelText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedDot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGraphic: {
    width: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  pairCol: {
    flex: 1,
  },
  pairDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  pairLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 2,
  },
  pairValue: {
    color: colors.textPrimary,
    fontSize: 13.5,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  progressPercent: {
    color: colors.textSecondary,
    fontSize: 10.5,
    fontWeight: '600',
    width: 28,
    textAlign: 'right',
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 10.5,
    marginTop: 6,
    lineHeight: 14,
  },
});