import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = { referralLink: string };

export function ReferralLinkCard({ referralLink }: Props) {
  const handleCopy = () => Clipboard.setStringAsync(referralLink);
  const handleShare = () => Share.share({ message: `Join me on Omnifi: ${referralLink}` });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Referral Link</Text>
      <Text style={styles.sub}>Share your link and start earning</Text>

      <View style={styles.linkRow}>
        <View style={styles.linkBox}>
          <Feather name="link" size={13} color={colors.primaryLight} />
          <Text style={styles.linkText} numberOfLines={1}>{referralLink}</Text>
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Feather name="copy" size={12} color={colors.primaryLight} />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Feather name="share-2" size={14} color="#fff" />
        <Text style={styles.shareText}>Share Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  title: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2, marginBottom: 12 },
  linkRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  linkBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.background, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 12,
  },
  linkText: { flex: 1, color: colors.textPrimary, fontSize: 11.5 },
  copyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    paddingHorizontal: 12, justifyContent: 'center',
  },
  copyText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '600' },
  shareBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14,
  },
  shareText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
