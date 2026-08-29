import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors } from '../../theme/colors';

export function ChatInputBar() {
  const [text, setText] = useState('');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.attachBtn}>
        <Feather name="paperclip" size={17} color={colors.primaryLight} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={colors.textSecondary}
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.sendBtn}>
        <Ionicons name="send" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 26,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  attachBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});