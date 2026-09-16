import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  requestId: string;
  recipientName: string;
  recipientInitials: string;
  recipientSub: string;
  amountLabel: string;
  accountBadge?: string;
  accountFlag?: string;
  note?: string;
  dateTimeLabel: string;
};

export function RequestDetailsCard({
  requestId,
  recipientName,
  recipientInitials,
  recipientSub,
  amountLabel,
  accountBadge,
  accountFlag,
  note,
  dateTimeLabel,
}: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  idRow: { flexDirection: 'row', alignItems: 'center' },
  idLabel: { color: themeColors.textSecondary, fontSize: 9.5 },
  idValue: { color: themeColors.primaryLight, fontSize: 9.5, fontWeight: '700' },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 11.5, fontWeight: '700' },
  recipientName: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  recipientSub: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: themeColors.border, marginVertical: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  label: { color: themeColors.textSecondary, fontSize: 9.5, marginBottom: 3 },
  amount: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700' },
  accountBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(167,139,250,0.12)',
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  accountBadgeText: { color: themeColors.primaryLight, fontSize: 9.5, fontWeight: '700' },
  accountFlag: { fontSize: 11 },
  inlineRow: { flexDirection: 'row', marginTop: 4 },
  inlineLabel: { color: themeColors.textSecondary, fontSize: 10 },
  inlineValue: { flex: 1, color: themeColors.textPrimary, fontSize: 10, fontWeight: '600' },
}),
    [themeColors]
  );

  const handleCopyId = () => {
    Clipboard.setStringAsync(requestId);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Request Details</Text>
        <TouchableOpacity style={styles.idRow} onPress={handleCopyId}>
          <Text style={styles.idLabel}>ID: </Text>
          <Text style={styles.idValue}>{requestId}</Text>
          <Feather name="copy" size={11} color={themeColors.primaryLight} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.recipientRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{recipientInitials}</Text>
        </View>
        <View>
          <Text style={styles.recipientName}>{recipientName}</Text>
          <Text style={styles.recipientSub}>{recipientSub}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.label}>Amount Requested</Text>
          <Text style={styles.amount}>{amountLabel}</Text>
        </View>
        {accountBadge && (
          <View style={styles.accountBadge}>
            <Text style={styles.accountBadgeText}>{accountBadge}</Text>
            {accountFlag ? <Text style={styles.accountFlag}>{accountFlag}</Text> : null}
          </View>
        )}
      </View>

      {note ? (
        <View style={styles.inlineRow}>
          <Text style={styles.inlineLabel}>Note: </Text>
          <Text style={styles.inlineValue} numberOfLines={1}>{note}</Text>
        </View>
      ) : null}

      <View style={styles.inlineRow}>
        <Text style={styles.inlineLabel}>Date: </Text>
        <Text style={styles.inlineValue}>{dateTimeLabel}</Text>
      </View>
    </View>
  );
}

