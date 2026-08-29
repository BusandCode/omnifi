import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ReportIssueHeader } from "../src/components/report-issue/ReportIssueHeader";
import { ReportIssueIntro } from "../src/components/report-issue/ReportIssueIntro";
import { CategoryField, IssueCategory } from "../src/components/report-issue/CategoryField";
import { SubjectField } from "../src/components/report-issue/SubjectField";
import { DescribeIssueField } from "../src/components/report-issue/DescribeIssueField";
import { ScreenshotUpload } from "../src/components/report-issue/ScreenshotUpload";
import { ContactMethodToggle, ContactMethod } from "../src/components/report-issue/ContactMethodToggle";
import { EmailField } from "../src/components/report-issue/EmailField";
import { ResponseTimeNote } from "../src/components/report-issue/ResponseTimeNote";
import { colors } from "../src/theme/colors";

export default function ReportIssueScreen() {
  const insets = useSafeAreaInsets();

  const [category, setCategory] = useState<IssueCategory | null>(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [email, setEmail] = useState("");

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <ReportIssueHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ReportIssueIntro />
        <CategoryField value={category} onChange={setCategory} />
        <SubjectField value={subject} onChangeText={setSubject} />
        <DescribeIssueField value={description} onChangeText={setDescription} />
        <ScreenshotUpload />
        <ContactMethodToggle value={contactMethod} onChange={setContactMethod} />
        {contactMethod === "email" && (
          <EmailField value={email} onChangeText={setEmail} />
        )}
      </ScrollView>

      <View style={styles.fixedBottom}>
        <ResponseTimeNote />
        <TouchableOpacity style={styles.submitBtn}>
          <Feather name="send" size={15} color="#fff" />
          <Text style={styles.submitText}>Submit Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
    gap: 20,
  },
  fixedBottom: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom:-20,
    backgroundColor: colors.background,
    gap: 10,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  submitText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
});