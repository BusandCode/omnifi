import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = {
  requestId: string;
  onRequestAgain: () => void;
};

export function RequestSuccessActions({ requestId, onRequestAgain }: Props) {
  const handleShare = () => {
    Share.share({ message: `View my payment request: omnifi.app/r/${requestId}` });
  };

  const handleCopyLink = () => {
    Clipboard.setStringAsync(`omnifi.app/r/${requestId}`);
  };

  const actions = [
    { icon: 'share' as const, label: 'Share Request', onPress: handleShare },
    { icon: 'link' as const, label: 'Copy Link', onPress: handleCopyLink },
    { icon: 'eye' as const, label: 'View Request', onPress: () => {} },
    { icon: 'plus-circle' as const, label: 'Request Again', onPress: onRequestAgain },
  ];

  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <TouchableOpacity key={a.label} style={styles.item} onPress={a.onPress}>
          <View style={styles.iconCircle}>
            <Feather name={a.icon} size={17} color={colors.primaryLight} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  item: { flex: 1, alignItems: 'center', gap: 8 },
  iconCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  label: { color: colors.textPrimary, fontSize: 9.5, textAlign: 'center' },
});