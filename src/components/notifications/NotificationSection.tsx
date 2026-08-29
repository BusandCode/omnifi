import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type NotificationItem = {
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  title: string;
  sub: string;
  time: string;
  highlight?: string;
  highlightColor?: string;
  unread?: boolean;
};

type Props = {
  title: string;
  items: NotificationItem[];
  chevron?: boolean;
};

export function NotificationSection({ title, items, chevron }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, i) => (
          <View
            key={item.title + i}
            style={[
              styles.row,
              i !== items.length - 1 && styles.divider,
              item.unread && styles.rowUnread,
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
              <Feather name={item.icon} size={16} color="#fff" />
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub} numberOfLines={2}>
                {item.sub}
                {item.highlight ? (
                  <Text style={{ color: item.highlightColor }}> {item.highlight}</Text>
                ) : null}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.time}>{item.time}</Text>
              {chevron ? (
                <Feather name="chevron-right" size={16} color={colors.textSecondary} />
              ) : item.unread ? (
                <View style={styles.unreadDot} />
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: 10 },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14 },
  rowUnread: { backgroundColor: 'rgba(167,139,250,0.06)', marginHorizontal: -14, paddingHorizontal: 14, borderRadius: 10 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  iconCircle: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  textBlock: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '600', marginBottom: 3 },
  sub: { color: colors.textSecondary, fontSize: 11, lineHeight: 15 },
  right: { alignItems: 'flex-end', gap: 6 },
  time: { color: colors.textSecondary, fontSize: 10 },
  unreadDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.primaryLight },
});