import {useState, useMemo} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  onSend: () => void;
  onPickImage?: () => void;
  onPickCamera?: () => void;
  onPickDocument?: () => void;
};

export function CommandInputBar({
  value,
  onChangeText,
  onSend,
  onPickImage,
  onPickCamera,
  onPickDocument,
}: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: themeColors.background,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    backgroundColor: themeColors.surface,
    borderRadius: 22,
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: themeColors.primaryTint,
  },
  micBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: themeColors.textPrimary,
    fontSize: 13,
    maxHeight: 100,
    paddingVertical: 8,
  },
  attachBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.primaryTint,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: themeColors.border },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: themeColors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: themeColors.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: themeColors.primaryTint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: { color: themeColors.textPrimary, fontSize: 13, fontWeight: '600' },
  optionSub: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 2 },
  cancelBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  cancelText: { color: themeColors.textSecondary, fontSize: 13, fontWeight: '600' },
}),
    [themeColors]
  );

  const hasText = value.trim().length > 0;
  const [attachOpen, setAttachOpen] = useState(false);

  const handleOption = (fn?: () => void) => {
    setAttachOpen(false);
    fn?.();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.wrap}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.micBtn} hitSlop={6}>
            <Feather name="mic" size={16} color={themeColors.textSecondary} />
          </TouchableOpacity>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Message AI Pay..."
            placeholderTextColor={themeColors.textSecondary}
            style={styles.input}
            multiline
          />

          <TouchableOpacity style={styles.attachBtn} onPress={() => setAttachOpen(true)} hitSlop={6}>
            <Feather name="plus" size={17} color={themeColors.primaryLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendBtn, !hasText && styles.sendBtnDisabled]}
            onPress={onSend}
            disabled={!hasText}
          >
            <Ionicons name="send" size={15} color={hasText ? '#fff' : themeColors.textSecondary} />
          </TouchableOpacity>
        </View>

        <Modal visible={attachOpen} transparent animationType="fade" onRequestClose={() => setAttachOpen(false)}>
          <Pressable style={styles.backdrop} onPress={() => setAttachOpen(false)}>
            <Pressable style={styles.sheet}>
              <View style={styles.sheetHandle} />

              <AttachOption
                icon={<Feather name="image" size={17} color={themeColors.primaryLight} />}
                label="Photo Library"
                sub="Choose an existing photo"
                onPress={() => handleOption(onPickImage)}
              />
              <AttachOption
                icon={<Feather name="camera" size={17} color={themeColors.primaryLight} />}
                label="Take Photo"
                sub="Use your camera"
                onPress={() => handleOption(onPickCamera)}
              />
              <AttachOption
                icon={<MaterialCommunityIcons name="file-document-outline" size={17} color={themeColors.primaryLight} />}
                label="Document"
                sub="Upload a file"
                onPress={() => handleOption(onPickDocument)}
              />

              <TouchableOpacity style={styles.cancelBtn} onPress={() => setAttachOpen(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

function AttachOption({
  icon,
  label,
  sub,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.optionIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionSub}>{sub}</Text>
      </View>
    </TouchableOpacity>
  );
}