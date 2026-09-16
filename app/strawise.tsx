// app/strawise.tsx
import { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Pressable, BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const BRAND_PURPLE = '#6C2BD9'; // swap for exact hex once confirmed
const BG_DARK = '#0F0B1A';

export default function Strawise() {
  const router = useRouter();
  const webviewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useFocusEffect(() => {
    const onBackPress = () => {
      if (canGoBack) {
        webviewRef.current?.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable
          onPress={() => (canGoBack ? webviewRef.current?.goBack() : router.back())}
          style={styles.iconBtn}
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.title}>STRA Store</Text>
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={12}>
          <Ionicons name="close" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.webviewWrap}>
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://store.strawise.co/' }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={BRAND_PURPLE} />
            </View>
          )}
        />
        {loading && (
          <View style={styles.loadingOverlay} pointerEvents="none">
            <ActivityIndicator size="large" color={BRAND_PURPLE} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_DARK },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BG_DARK,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  webviewWrap: { flex: 1, backgroundColor: BG_DARK },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: BG_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});