// LimitsListCard.tsx — reusable section title + card of limit rows
// Used for both "Transfer Limits" and "Wallet Limits" sections.
import React, { useMemo } from 'react';
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
import { useTheme } from '../../theme/ThemeContext';
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
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        sectionTitle: {
          color: themeColors.textPrimary,
          fontSize: 12.5,
          fontWeight: '700',
          marginBottom: 6,
        },
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: themeColors.border,
          paddingHorizontal: 10,
          marginBottom: 10,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
        },
        rowDivider: {
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
        },
        rowIcon: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: themeColors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        },
        rowLabel: {
          color: themeColors.textPrimary,
          fontSize: 11.5,
          fontWeight: '600',
        },
        rowSublabel: {
          color: themeColors.textSecondary,
          fontSize: 9.5,
          marginTop: 1,
        },
        rowValue: {
          color: themeColors.textPrimary,
          fontSize: 11,
          fontWeight: '600',
        },
      }),
    [themeColors]
  );

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
            styles={styles}
            themeColors={themeColors}
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
  styles,
  themeColors,
}: {
  row: LimitRow;
  isLast: boolean;
  onPress?: () => void;
  styles: ReturnType<typeof StyleSheet.create>;
  themeColors: ReturnType<typeof useTheme>['colors'];
}) {
  const Icon = ICON_MAP[row.icon];
  const Wrapper: any = row.showChevron ? Pressable : View;

  return (
    <Wrapper
      onPress={row.showChevron ? onPress : undefined}
      style={[styles.row, !isLast && styles.rowDivider]}
    >
      <View style={styles.rowIcon}>
        <Icon color={themeColors.primary} size={14} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{row.label}</Text>
        {row.sublabel && <Text style={styles.rowSublabel}>{row.sublabel}</Text>}
      </View>
      <Text style={[styles.rowValue, row.valueColor === 'success' && { color: themeColors.success }]}>
        {row.value}
      </Text>
      {row.showChevron && (
        <ChevronRight color={themeColors.textSecondary} size={14} style={{ marginLeft: 4 }} />
      )}
    </Wrapper>
  );
}