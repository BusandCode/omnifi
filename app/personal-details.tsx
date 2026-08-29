import { ScrollView, StyleSheet } from 'react-native';
import { PersonalDetailsHeader } from '../src/components/personal-details/PersonalDetailsHeader';
import { ProfileCard } from '../src/components/personal-details/ProfileCard';
import { InfoBanner } from '../src/components/personal-details/InfoBanner';
import { InfoSection } from '../src/components/personal-details/InfoSection';
import { LogoutButton } from '../src/components/personal-details/LogoutButton';
import { colors } from '../src/theme/colors';

export default function PersonalDetailsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PersonalDetailsHeader />
      <ProfileCard />
      <InfoBanner />

      <InfoSection
        title="Basic Information"
        items={[
          { icon: 'user', label: 'Full Name', value: 'Silver Abdul' },
          { icon: 'mail', label: 'Email Address', value: 'silverabdul@email.com' },
          { icon: 'phone', label: 'Phone Number', value: '+234 803 123 4567' },
          { icon: 'calendar', label: 'Date of Birth', value: '12 March 1999' },
          { icon: 'user', label: 'Gender', value: 'Male' },
          { icon: 'map-pin', label: 'Residential Address', value: 'Abuja, FCT, Nigeria' },
        ]}
      />

      <InfoSection
        title="Security Information"
        items={[
          { icon: 'lock', label: 'Password', value: '********' },
          { icon: 'shield', label: 'Two-Factor Authentication', value: 'Enabled', valueColor: colors.success },
          { icon: 'smartphone', label: 'Biometric Login', value: 'Enabled', valueColor: colors.success },
        ]}
      />

      <InfoSection
        title="Preferences"
        items={[
          { icon: 'globe', label: 'Language', value: 'English' },
          { icon: 'bell', label: 'Notification Preferences', value: '' },
          { icon: 'moon', label: 'Theme', value: 'Dark' },
        ]}
      />

      <LogoutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 30, gap: 20 },
});