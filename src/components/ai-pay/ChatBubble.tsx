import { useMemo } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export type ChatMessage =
  | { id: string; sender: 'ai'; kind: 'intro'; title: string; text: string }
  | { id: string; sender: 'ai'; kind: 'command'; lead: string; text: string; time: string }
  | { id: string; sender: 'ai' | 'user'; kind: 'plain'; text: string };

export function ChatBubble({ message }: { message: ChatMessage }) {
  const layoutScale = useLayoutScale();
  const isUser = message.sender === 'user';

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(15),
      styles: StyleSheet.create({
        row: { flexDirection: 'row', alignItems: 'flex-end', gap: s(8) },
        rowReverse: { flexDirection: 'row-reverse' },
        avatar: {
          width: s(28), height: s(28), borderRadius: s(14), backgroundColor: '#1A1225',
          justifyContent: 'center', alignItems: 'center',
          borderWidth: 1, borderColor: 'rgba(167,139,250,0.3)',
        },
        bubble: { borderRadius: s(16), padding: s(8), maxWidth: '80%' },
        aiBubble: { backgroundColor: colors.surface, borderTopLeftRadius: s(4) },
        userBubble: { backgroundColor: colors.primary, borderTopRightRadius: s(4) },
        introTitle: { color: colors.textPrimary, fontSize: f(11), fontWeight: '700', marginBottom: s(4) },
        aiText: { color: colors.textPrimary, fontSize: f(10.5), lineHeight: s(18) },
        userText: { color: '#fff', fontSize: f(10.5), lineHeight: s(18) },
        commandText: { color: colors.primaryLight, fontSize: f(10.5), fontWeight: '700', marginTop: s(6) },
        time: { color: colors.textSecondary, fontSize: f(9.5), marginTop: s(8) },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={[styles.row, isUser && styles.rowReverse]}>
      {!isUser && (
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="robot-outline" size={iconSize} color={colors.primaryLight} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {message.kind === 'intro' && (
          <>
            <Text style={styles.introTitle}>{message.title}</Text>
            <Text style={styles.aiText}>{message.text}</Text>
          </>
        )}

        {message.kind === 'command' && (
          <>
            <Text style={styles.aiText}>{message.lead}</Text>
            <Text style={styles.commandText}>{message.text}</Text>
            <Text style={styles.time}>{message.time}</Text>
          </>
        )}

        {message.kind === 'plain' && (
          <Text style={isUser ? styles.userText : styles.aiText}>{message.text}</Text>
        )}
      </View>
    </View>
  );
}