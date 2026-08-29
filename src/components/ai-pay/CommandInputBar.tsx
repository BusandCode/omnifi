import { useMemo, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

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
  const layoutScale = useLayoutScale();
  const insets = useSafeAreaInsets();
  const hasText = value.trim().length > 0;
  const [attachOpen, setAttachOpen] = useState(false);

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(16),
      styles: StyleSheet.create({
        wrap: {
          paddingHorizontal: s(12), 
          paddingTop: s(8),
          backgroundColor: colors.background,
          marginBottom: s(-25),
        },
        inputRow: {
          flexDirection: 'row', 
          alignItems: 'flex-end', 
          gap: s(6),
          backgroundColor: colors.surface, 
          borderRadius: s(22),
          paddingLeft: s(6), 
          paddingRight: s(6), 
          paddingVertical: s(6),
          borderWidth: 1, 
          borderColor: 'rgba(167,139,250,0.25)',
        },
        micBtn: { 
          width: s(32), 
          height: s(32), 
          justifyContent: 'center', 
          alignItems: 'center' 
        },
        input: { 
          flex: 1, 
          color: colors.textPrimary, 
          fontSize: f(13), 
          maxHeight: s(100), 
          paddingVertical: s(8) 
        },
        attachBtn: {
          width: s(32), 
          height: s(32), 
          borderRadius: s(16), 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: 'rgba(167,139,250,0.12)',
        },
        sendBtn: {
          width: s(34), 
          height: s(34), 
          borderRadius: s(17), 
          backgroundColor: colors.primary,
          justifyContent: 'center', 
          alignItems: 'center',
        },
        sendBtnDisabled: { backgroundColor: '#2C2C2E' },

        backdrop: { 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'flex-end' 
        },
        sheet: {
          backgroundColor: colors.surface, 
          borderTopLeftRadius: s(20), 
          borderTopRightRadius: s(20),
          paddingHorizontal: s(16), 
          paddingTop: s(10),
        },
        sheetHandle: {
          width: s(36), 
          height: s(4), 
          borderRadius: s(2), 
          backgroundColor: '#3A3A3C',
          alignSelf: 'center', 
          marginBottom: s(12),
        },
        optionRow: {
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(12),
          paddingVertical: s(12), 
          borderBottomWidth: 1, 
          borderBottomColor: '#2C2C2E',
        },
        optionIcon: {
          width: s(36), 
          height: s(36), 
          borderRadius: s(18), 
          backgroundColor: 'rgba(167,139,250,0.12)',
          justifyContent: 'center', 
          alignItems: 'center',
        },
        optionLabel: { color: colors.textPrimary, fontSize: f(13), fontWeight: '600' },
        optionSub: { color: colors.textSecondary, fontSize: f(10.5), marginTop: s(2) },
        cancelBtn: { paddingVertical: s(14), alignItems: 'center', marginTop: s(4) },
        cancelText: { color: colors.textSecondary, fontSize: f(13), fontWeight: '600' },
      }),
    };
  }, [layoutScale]);

  const handleOption = (fn?: () => void) => {
    setAttachOpen(false);
    fn?.();
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.micBtn} hitSlop={6}>
          <Feather name="mic" size={iconSize} color={colors.textSecondary} />
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Message AI Pay..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          multiline
        />

        <TouchableOpacity style={styles.attachBtn} onPress={() => setAttachOpen(true)} hitSlop={6}>
          <Feather name="plus" size={iconSize + 1} color={colors.primaryLight} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendBtn, !hasText && styles.sendBtnDisabled]}
          onPress={onSend}
          disabled={!hasText}
        >
          <Ionicons name="send" size={iconSize - 1} color={hasText ? '#fff' : colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Modal visible={attachOpen} transparent animationType="fade" onRequestClose={() => setAttachOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setAttachOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <View style={styles.sheetHandle} />

            <AttachOption
              icon={<Feather name="image" size={iconSize + 1} color={colors.primaryLight} />}
              label="Photo Library"
              sub="Choose an existing photo"
              onPress={() => handleOption(onPickImage)}
              styles={styles}
            />
            <AttachOption
              icon={<Feather name="camera" size={iconSize + 1} color={colors.primaryLight} />}
              label="Take Photo"
              sub="Use your camera"
              onPress={() => handleOption(onPickCamera)}
              styles={styles}
            />
            <AttachOption
              icon={<MaterialCommunityIcons name="file-document-outline" size={iconSize + 1} color={colors.primaryLight} />}
              label="Document"
              sub="Upload a file"
              onPress={() => handleOption(onPickDocument)}
              styles={styles}
            />

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setAttachOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function AttachOption({
  icon, label, sub, onPress, styles,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onPress: () => void;
  styles: {
    optionRow: object;
    optionIcon: object;
    optionLabel: object;
    optionSub: object;
  };
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