import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Message = {
  id: string;
  from: 'agent' | 'user';
  text: string;
  time: string;
  read?: boolean;
};

const messages: Message[] = [
  {
    id: '1',
    from: 'agent',
    text: 'Hello! 👋\nThanks for contacting OmniFi Support. How can I help you today?',
    time: '9:41 AM',
  },
  {
    id: '2',
    from: 'user',
    text: 'Hi, I need help with a failed payment that was debited from my account.',
    time: '9:42 AM',
    read: true,
  },
  {
    id: '3',
    from: 'agent',
    text: "I'm sorry to hear that.\nI'd be happy to help you with this. Can you please share the transaction reference or the amount?",
    time: '9:42 AM',
  },
  {
    id: '4',
    from: 'user',
    text: 'Sure, the amount is ₦25,000 and the reference is TXN82736421.',
    time: '9:43 AM',
    read: true,
  },
  {
    id: '5',
    from: 'agent',
    text: 'Thank you! Let me check this for you.\nThis will only take a moment.',
    time: '9:43 AM',
  },
  {
    id: '6',
    from: 'agent',
    text: 'Great news! 😊\nI can see the issue has been resolved. The amount will be refunded to your account within 5–10 minutes.',
    time: '9:45 AM',
  },
  {
    id: '7',
    from: 'user',
    text: 'Thank you so much! 😊',
    time: '9:45 AM',
    read: true,
  },
];

export function ChatMessageList() {
  return (
    <View style={styles.list}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>Today</Text>
      </View>

      {messages.map((m) => {
        const isUser = m.from === 'user';
        return (
          <View
            key={m.id}
            style={[styles.bubbleWrap, isUser ? styles.alignRight : styles.alignLeft]}
          >
            <View style={[styles.bubble, isUser ? styles.userBubble : styles.agentBubble]}>
              <Text style={[styles.bubbleText, isUser && styles.userBubbleText]}>{m.text}</Text>
            </View>
            <View style={[styles.metaRow, isUser ? styles.metaRight : styles.metaLeft]}>
              <Text style={styles.timeText}>{m.time}</Text>
              {isUser && m.read && (
                <Ionicons name="checkmark-done" size={13} color={colors.primaryLight} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 4 },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
  },
  dateText: { color: colors.textSecondary, fontSize: 10.5, fontWeight: '600' },
  bubbleWrap: { marginBottom: 12, maxWidth: '82%' },
  alignLeft: { alignSelf: 'flex-start' },
  alignRight: { alignSelf: 'flex-end' },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  agentBubble: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
  },
  bubbleText: { color: colors.textPrimary, fontSize: 12.5, lineHeight: 19 },
  userBubbleText: { color: '#fff' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaLeft: { justifyContent: 'flex-start' },
  metaRight: { justifyContent: 'flex-end' },
  timeText: { color: colors.textSecondary, fontSize: 9.5 },
});