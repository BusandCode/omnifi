import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type BaseItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
};

type ValueItem = BaseItem & {
  type?: 'value';
  value: string;
  valueColor?: string;
  onPress?: () => void;
};

type ToggleItem = BaseItem & {
  type: 'toggle';
  value: boolean;
  onToggle: (next: boolean) => void;
};

type Item = ValueItem | ToggleItem;

type Props = { title: string; items: Item[] };

export function InfoSection({ title, items }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{title}</Text>
      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        {items.map((item, i) => {
          const isToggle = item.type === 'toggle';

          return (
            <TouchableOpacity
              key={item.label}
              activeOpacity={isToggle ? 1 : 0.6}
              onPress={isToggle ? () => item.onToggle(!item.value) : item.onPress}
              disabled={!isToggle && !item.onPress}
              style={[
                styles.row,
                i !== items.length - 1 && { borderBottomWidth: 1, borderBottomColor: themeColors.border },
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
                <Feather name={item.icon} size={14} color={themeColors.primaryLight} />
              </View>
              <Text style={[styles.label, { color: themeColors.textPrimary }]}>{item.label}</Text>

              {isToggle ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: themeColors.border, true: themeColors.primaryTint }}
                  thumbColor={item.value ? themeColors.primary : themeColors.surfaceAlt}
                  ios_backgroundColor={themeColors.border}
                />
              ) : (
                <>
                  {!!item.value && (
                    <Text
                      style={[
                        styles.value,
                        { color: themeColors.textSecondary },
                        item.valueColor && { color: item.valueColor },
                      ]}
                      numberOfLines={1}
                    >
                      {item.value}
                    </Text>
                  )}
                  <Feather name="chevron-right" size={14} color={themeColors.textSecondary} />
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  card: { borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13 },
  iconBox: {
    width: 30, height: 30, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  label: { flex: 1, fontSize: 12.5, fontWeight: '600' },
  value: { fontSize: 11.5, marginRight: 4, maxWidth: '45%' },
});