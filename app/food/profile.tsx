// app/food/profile.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { foodColors } from '../../src/constants/foodColors';
import { FoodTabBar } from '../../src/components/food/FoodTabBar';

type MenuItem = {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  badge?: string;
  rightIcon?: keyof typeof Feather.glyphMap;
};

const accountItems: MenuItem[] = [
  { id: 'personal', icon: 'user', title: 'Personal Information' },
  { id: 'addresses', icon: 'map-pin', title: 'Saved Addresses' },
  { id: 'payment', icon: 'credit-card', title: 'Payment Methods' },
  { id: 'security', icon: 'shield', title: 'Security' },
];

const orderItems: MenuItem[] = [
  { id: 'my-orders', icon: 'package', title: 'My Orders' },
  { id: 'echop-orders', icon: 'coffee', title: 'E-Chop Orders' },
  { id: 'ewash-orders', icon: 'droplet', title: 'E-Wash Orders' },
  { id: 'order-history', icon: 'clock', title: 'Order History' },
];

const referralItems: MenuItem[] = [
  { id: 'refer-earn', icon: 'gift', title: 'Refer & Earn' },
];

const preferenceItems: MenuItem[] = [
  { id: 'notifications', icon: 'bell', title: 'Notifications' },
  { id: 'language', icon: 'globe', title: 'Language & Location' },
  { id: 'delivery', icon: 'truck', title: 'Delivery Preferences' },
];

const supportItems: MenuItem[] = [
  { id: 'live-chat', icon: 'message-circle', title: 'Live Chat' },
  { id: 'help', icon: 'help-circle', title: 'Help Center' },
  { id: 'contact', icon: 'phone', title: 'Contact Support' },
];

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {items.map((item, index) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.menuItem,
              index === items.length - 1 && styles.menuItemLast
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Feather name={item.icon} size={18} color={foodColors.textPrimary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={foodColors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function FoodProfileScreen() {
  const router = useRouter();

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={foodColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={15} color={foodColors.primary} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              <Image 
                source={{ uri: 'https://ui-avatars.com/api/?name=Suleiman&background=FF6B35&color=fff&size=80' }} 
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="check" size={10} color="#fff" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Suleiman</Text>
              <View style={styles.verifiedRow}>
                <Feather name="check-circle" size={13} color={foodColors.primary} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sections */}
        <MenuSection title="ACCOUNT" items={accountItems} />
        <MenuSection title="ORDERS" items={orderItems} />
        <MenuSection title="REFERRAL" items={referralItems} />
        <MenuSection title="PREFERENCES" items={preferenceItems} />
        <MenuSection title="HELP & SUPPORT" items={supportItems} />

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={18} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FoodTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: foodColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 46,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: foodColors.textPrimary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,107,53,0.08)',
  },
  editText: {
    fontSize: 13,
    fontWeight: '600',
    color: foodColors.primary,
  },
  profileCard: {
    backgroundColor: foodColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: foodColors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: foodColors.surface,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: foodColors.textPrimary,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '500',
    color: foodColors.textSecondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: foodColors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: foodColors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255,107,53,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: foodColors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: 20,
  },
});