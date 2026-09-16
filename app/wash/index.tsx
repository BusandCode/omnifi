// app/wash/index.tsx
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { washColors } from '../../src/constants/washColors';
import { WashTabBar } from '../../src/components/wash/WashTabBar';

const serifFont = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

export default function WashScreen() {
  const [activeTab, setActiveTab] = useState<'order' | 'schedule'>('order');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Let help you with{'\n'}the washing today.</Text>

          <TouchableOpacity style={styles.referButton}>
            <Feather name="gift" size={16} color={washColors.red} />
            <Text style={styles.referText}>REFER</Text>
          </TouchableOpacity>
        </View>

        {/* Standard Plan Card */}
        <LinearGradient
          colors={[washColors.navyStart, washColors.navyEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.planCard}
        >
          <View style={styles.planTopRow}>
            <Text style={styles.planTitle}>Standard Plan</Text>
            <TouchableOpacity style={styles.transactionsButton}>
              <Feather name="file-text" size={13} color="#fff" />
              <Text style={styles.transactionsText}>Transactions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.expiredBadge}>
            <Feather name="clock" size={12} color="#fff" />
            <Text style={styles.expiredText}>Expired</Text>
          </View>

          <Text style={styles.planDescription}>
            Expired on July 6, 2026 — renew to keep using your plan
          </Text>

          <TouchableOpacity style={styles.renewButton}>
            <Text style={styles.renewButtonText}>Renew Plan</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionButton, styles.requestPickupButton]}>
            <MaterialCommunityIcons name="basket-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Request Pickup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.payPerOrderButton]}>
            <MaterialCommunityIcons name="moped-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Pay Per Order</Text>
          </TouchableOpacity>
        </View>

        {/* Order / Schedule quick nav */}
        <View style={styles.quickNavRow}>
          <TouchableOpacity style={styles.quickNavItem} onPress={() => setActiveTab('order')}>
            <View style={styles.quickNavCircle}>
              <Feather name="clipboard" size={20} color={washColors.textPrimary} />
            </View>
            <Text style={styles.quickNavLabel}>Order</Text>
          </TouchableOpacity>

          <View style={styles.quickNavDivider} />

          <TouchableOpacity style={styles.quickNavItem} onPress={() => setActiveTab('schedule')}>
            <View style={styles.quickNavCircle}>
              <Feather name="calendar" size={20} color={washColors.textPrimary} />
            </View>
            <Text style={styles.quickNavLabel}>Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Active Order */}
        <View style={styles.activeOrderCard}>
          <View style={styles.activeOrderHeader}>
            <Text style={styles.activeOrderTitle}>Active Order</Text>
            <View style={styles.coveredBadge}>
              <Feather name="tag" size={12} color={washColors.coveredText} />
              <Text style={styles.coveredText}>Covered by plan</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Status: <Text style={styles.statusValue}>Scheduled</Text>
            </Text>
            <View style={styles.statusDot} />
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressStep, styles.progressStepCompleted]}>
                <Feather name="check" size={14} color="#fff" />
              </View>
              <View style={[styles.progressLine, styles.progressLineRed]} />
              <View style={[styles.progressStep, styles.progressStepCompleted]}>
                <Feather name="check" size={14} color="#fff" />
              </View>
              <View style={[styles.progressLine, styles.progressLineNavy]} />
              <View style={[styles.progressStep, styles.progressStepActive]}>
                <MaterialCommunityIcons name="hanger" size={15} color={washColors.navySolid} />
              </View>
              <View style={[styles.progressLine, styles.progressLineDashed]} />
              <View style={[styles.progressStep, styles.progressStepPending]}>
                <Feather name="home" size={14} color={washColors.textMuted} />
              </View>
            </View>

            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Picked Up</Text>
              <Text style={styles.progressLabel}>Processing</Text>
              <Text style={styles.progressLabel}>Ready</Text>
              <Text style={styles.progressLabel}>Delivery</Text>
            </View>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <Text style={styles.recentOrdersTitle}>Recent Orders</Text>

          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #239604</Text>
              <TouchableOpacity style={styles.orderChevron}>
                <Feather name="chevron-right" size={16} color={washColors.textPrimary} />
              </TouchableOpacity>
            </View>
            <View style={styles.orderFooter}>
              <View style={styles.orderItems}>
                <Feather name="package" size={14} color={washColors.textSecondary} />
                <Text style={styles.orderItemsText}>10 items</Text>
              </View>
              <Text style={styles.orderDate}>July 05, 2026</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Tab Bar */}
      <WashTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: washColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 46,
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: serifFont,
    fontWeight: '700',
    color: washColors.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  referButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: washColors.gold,
    borderWidth: 1,
    borderColor: washColors.goldBorder,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  referText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: washColors.red,
  },

  // Standard Plan Card
  planCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },
  planTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  planTitle: {
    fontSize: 26,
    fontFamily: serifFont,
    fontWeight: '700',
    color: '#fff',
  },
  transactionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: washColors.overlay,
    borderWidth: 1,
    borderColor: washColors.overlayBorder,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },
  transactionsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  expiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: washColors.overlay,
    borderWidth: 1,
    borderColor: washColors.overlayBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 16,
  },
  expiredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  planDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: washColors.whiteText85,
    marginBottom: 24,
    maxWidth: '78%',
  },
  renewButton: {
    alignSelf: 'flex-end',
    backgroundColor: washColors.red,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 24,
  },
  renewButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  // Action row
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  requestPickupButton: {
    backgroundColor: washColors.red,
  },
  payPerOrderButton: {
    backgroundColor: washColors.navySolid,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  // Order / Schedule quick nav
  quickNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    marginBottom: 24,
  },
  quickNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickNavDivider: {
    width: 1,
    height: 56,
    backgroundColor: washColors.grayBorder,
  },
  quickNavCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: washColors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickNavLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: washColors.textPrimary,
  },

  // Active Order card
  activeOrderCard: {
    backgroundColor: washColors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activeOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeOrderTitle: {
    fontSize: 19,
    fontFamily: serifFont,
    fontWeight: '700',
    color: washColors.textPrimary,
  },
  coveredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: washColors.coveredBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  coveredText: {
    fontSize: 12,
    fontWeight: '600',
    color: washColors.coveredText,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusLabel: {
    fontSize: 13,
    color: washColors.textSecondary,
  },
  statusValue: {
    fontWeight: '700',
    color: washColors.textPrimary,
  },
  statusDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: washColors.grayBorder,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: washColors.divider,
    marginBottom: 18,
  },
  progressContainer: {
    marginTop: 2,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: washColors.surface,
    borderColor: washColors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepCompleted: {
    backgroundColor: washColors.red,
    borderColor: washColors.red,
  },
  progressStepActive: {
    backgroundColor: washColors.surface,
    borderColor: washColors.navySolid,
  },
  progressStepPending: {
    backgroundColor: washColors.surface,
    borderColor: washColors.grayBorder,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: washColors.grayBorder,
  },
  progressLineRed: {
    backgroundColor: washColors.red,
  },
  progressLineNavy: {
    backgroundColor: washColors.navySolid,
  },
  progressLineDashed: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderColor: washColors.grayBorder,
    height: 0,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: washColors.textPrimary,
  },

  // Recent orders
  recentOrdersSection: {
    marginTop: 4,
  },
  recentOrdersTitle: {
    fontSize: 20,
    fontFamily: serifFont,
    fontWeight: '700',
    color: washColors.textPrimary,
    marginBottom: 14,
  },
  orderCard: {
    backgroundColor: washColors.surface,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: washColors.textPrimary,
  },
  orderChevron: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.2,
    borderColor: washColors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderItemsText: {
    fontSize: 13,
    color: washColors.textSecondary,
  },
  orderDate: {
    fontSize: 13,
    color: washColors.textSecondary,
  },

  bottomSpacer: {
    height: 20,
  },
});