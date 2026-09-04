import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

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
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>
        {title}
      </Text>
      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        {items.map((item, i) => (
          <View
            key={item.title + i}
            style={[
              styles.row,
              i !== items.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: themeColors.border,
              },
              item.unread && {
                backgroundColor: themeColors.primaryTint,
                marginHorizontal: -14,
                paddingHorizontal: 14,
                borderRadius: 10,
              },
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
              <Feather name={item.icon} size={16} color="#fff" />
            </View>

            <View style={styles.textBlock}>
              <Text style={[styles.title, { color: themeColors.textPrimary }]}>
                {item.title}
              </Text>
              <Text
                style={[styles.sub, { color: themeColors.textSecondary }]}
                numberOfLines={2}
              >
                {item.sub}
                {item.highlight ? (
                  <Text style={{ color: item.highlightColor }}> {item.highlight}</Text>
                ) : null}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={[styles.time, { color: themeColors.textSecondary }]}>
                {item.time}
              </Text>
              {chevron ? (
                <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
              ) : item.unread ? (
                <View style={[styles.unreadDot, { backgroundColor: themeColors.primaryLight }]} />
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  card: { borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14 },
  iconCircle: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  textBlock: { flex: 1 },
  title: { fontSize: 13, fontWeight: '600', marginBottom: 3 },
  sub: { fontSize: 11, lineHeight: 15 },
  right: { alignItems: 'flex-end', gap: 6 },
  time: { fontSize: 10 },
  unreadDot: { width: 7, height: 7, borderRadius: 3.5 },
});