import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import {useState, useMemo} from 'react';
import { useTheme } from '../../theme/ThemeContext';

export function ChatInputBar() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 26,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: themeColors.border,
  },
  attachBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: themeColors.textPrimary,
    fontSize: 13,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
}),
    [themeColors]
  );

  const [text, setText] = useState('');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.attachBtn}>
        <Feather name="paperclip" size={17} color={themeColors.primaryLight} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={themeColors.textSecondary}
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.sendBtn}>
        <Ionicons name="send" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

