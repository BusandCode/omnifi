import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { EditProfileHeader } from '../src/components/edit-profile/EditProfileHeader';
import { AvatarEditor } from '../src/components/edit-profile/AvatarEditor';
import { FormField } from '../src/components/edit-profile/FormField';
import { SaveButton } from '../src/components/edit-profile/SaveButton';
import { useTheme } from '../src/theme/ThemeContext';
import { useProfileStore } from '../src/store/profileStore';

export default function EditProfileScreen() {
  const { colors: themeColors } = useTheme();
  const profile = useProfileStore();

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [dob, setDob] = useState(profile.dob);
  const [gender, setGender] = useState(profile.gender);
  const [address, setAddress] = useState(profile.address);
  const [saving, setSaving] = useState(false);

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: wire up to your update-profile API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      profile.updateProfile({ fullName, email, phone, dob, gender, address });
      router.back();
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EditProfileHeader />

        <AvatarEditor
          initials={initials || 'SA'}
          onChangePhoto={() => {
            // TODO: hook up image picker
          }}
        />

        <FormField
          icon="user"
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
        <FormField
          icon="mail"
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          icon="phone"
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <FormField
          icon="calendar"
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          placeholder="DD Month YYYY"
        />
        <FormField
          icon="user"
          label="Gender"
          value={gender}
          onChangeText={setGender}
          autoCapitalize="words"
        />
        <FormField
          icon="map-pin"
          label="Residential Address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="words"
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 30, gap: 20 },
});