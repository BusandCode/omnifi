// src/components/statements/AccountStatementsList.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Statement = {
  id: string;
  month: string;
  range: string;
  size: string;
};

const statements: Statement[] = [
  { id: '1', month: 'June 2026 Statement', range: '1 Jun 2026 – 30 Jun 2026', size: '2.45 MB' },
  { id: '2', month: 'May 2026 Statement', range: '1 May 2026 – 31 May 2026', size: '2.32 MB' },
  { id: '3', month: 'April 2026 Statement', range: '1 Apr 2026 – 30 Apr 2026', size: '2.28 MB' },
  { id: '4', month: 'March 2026 Statement', range: '1 Mar 2026 – 31 Mar 2026', size: '2.18 MB' },
  { id: '5', month: 'February 2026 Statement', range: '1 Feb 2026 – 28 Feb 2026', size: '2.12 MB' },
];

export function AccountStatementsList() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Account Statements</Text>
      <Text style={[styles.sub, { color: themeColors.textSecondary }]}>Download your account statements</Text>

      {statements.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: themeColors.surface }]}>
          <Feather name="file-text" size={28} color={themeColors.textSecondary} style={styles.emptyIcon} />
          <Text style={[styles.emptyText, { color: themeColors.textPrimary }]}>No statements available</Text>
          <Text style={[styles.emptySub, { color: themeColors.textSecondary }]}>Your statements will appear here once available.</Text>
        </View>
      ) : (
        <>
          <View style={styles.list}>
            {statements.map((s) => (
              <TouchableOpacity key={s.id} style={[styles.row, { backgroundColor: themeColors.surface }]}>
                <View style={[styles.iconBox, { backgroundColor: themeColors.primary }]}>
                  <Feather name="file-text" size={17} color="#fff" />
                  <Text style={styles.pdfTag}>PDF</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.month, { color: themeColors.textPrimary }]}>{s.month}</Text>
                  <Text style={[styles.range, { color: themeColors.textSecondary }]}>{s.range}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={[styles.size, { color: themeColors.textSecondary }]}>{s.size}</Text>
                  <Feather name="download" size={16} color={themeColors.primaryLight} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.loadMore}>
            <Text style={[styles.loadMoreText, { color: themeColors.primaryLight }]}>Load more statements</Text>
            <Feather name="chevron-down" size={14} color={themeColors.primaryLight} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 15.5, fontWeight: '700', marginBottom: 3 },
  sub: { fontSize: 11.5, marginBottom: 12 },
  emptyCard: {
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { marginBottom: 12 },
  emptyText: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  emptySub: { fontSize: 11.5, marginTop: 6, textAlign: 'center' },
  list: { gap: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfTag: {
    position: 'absolute',
    bottom: -3,
    color: '#fff',
    fontSize: 7,
    fontWeight: '800',
    backgroundColor: '#3A2B7A',
    paddingHorizontal: 3,
    borderRadius: 3,
  },
  textContainer: { flex: 1 },
  month: { fontSize: 13, fontWeight: '700' },
  range: { fontSize: 10.5, marginTop: 2 },
  rightCol: { alignItems: 'flex-end', gap: 6 },
  size: { fontSize: 10.5 },
  loadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
  },
  loadMoreText: { fontSize: 12.5, fontWeight: '600' },
});