import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PersonalDetailsHeader } from '../src/components/personal-details/PersonalDetailsHeader';
import { ProfileCard } from '../src/components/personal-details/ProfileCard';
import { InfoBanner } from '../src/components/personal-details/InfoBanner';
import { InfoSection } from '../src/components/personal-details/InfoSection';
import { LogoutButton } from '../src/components/personal-details/LogoutButton';
import { useTheme } from '../src/theme/ThemeContext';
import { useProfileStore } from '../src/store/profileStore';

export default function PersonalDetailsScreen() {
  const { colors: themeColors } = useTheme();
  const { fullName, email, phone, dob, gender, address } = useProfileStore();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PersonalDetailsHeader />
      <ProfileCard />
      <InfoBanner />

      <InfoSection
        title="Basic Information"
        items={[
          { icon: 'user', label: 'Full Name', value: fullName },
          { icon: 'mail', label: 'Email Address', value: email },
          { icon: 'phone', label: 'Phone Number', value: phone },
          { icon: 'calendar', label: 'Date of Birth', value: dob },
          { icon: 'user', label: 'Gender', value: gender },
          { icon: 'map-pin', label: 'Residential Address', value: address },
        ]}
      />

      <InfoSection
        title="Security Information"
        items={[
          { icon: 'lock', label: 'Password', value: '********' },
          {
            icon: 'shield',
            label: 'Two-Factor Authentication',
            type: 'toggle',
            value: twoFactorEnabled,
            onToggle: setTwoFactorEnabled,
          },
          {
            icon: 'smartphone',
            label: 'Biometric Login',
            type: 'toggle',
            value: biometricEnabled,
            onToggle: setBiometricEnabled,
          },
        ]}
      />

      <InfoSection
        title="Preferences"
        items={[
          { icon: 'globe', label: 'Language', value: 'English' },
          { icon: 'bell', label: 'Notification Preferences', value: '' },
          // { icon: 'moon', label: 'Theme', value: 'Dark' },
        ]}
      />

      <LogoutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 30, gap: 20 },
});