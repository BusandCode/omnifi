import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

// Wallet with banknotes peeking out — used on the Amount balance card
export function WalletGraphic({ size = 90 }: { size?: number }) {
  const { colors: themeColors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="walletFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#8B5CF6" />
          <Stop offset="1" stopColor={themeColors.primaryDark} />
        </LinearGradient>
      </Defs>
      <Rect x="18" y="16" width="46" height="30" rx="4" fill="#22C55E" opacity={0.85} />
      <Rect x="14" y="34" width="72" height="50" rx="12" fill="url(#walletFill)" />
      <Rect x="14" y="34" width="72" height="14" rx="12" fill="#7C3AED" />
      <Circle cx="70" cy="59" r="6" fill="#4C1D95" />
      <Circle cx="78" cy="80" r="13" fill={themeColors.success} />
      <Path d="M72 80l4 4 8-8" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Clipboard with checklist — used on the Review card
export function ClipboardGraphic({ size = 90 }: { size?: number }) {
  const { colors: themeColors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="clipFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#8B5CF6" />
          <Stop offset="1" stopColor={themeColors.primaryDark} />
        </LinearGradient>
      </Defs>
      <Rect x="22" y="14" width="50" height="66" rx="8" fill="url(#clipFill)" />
      <Rect x="36" y="10" width="22" height="10" rx="4" fill="#4C1D95" />
      <Path d="M31 34h28M31 46h28M31 58h18" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
      <Circle cx="70" cy="72" r="14" fill={themeColors.success} />
      <Path d="M63 72l5 5 9-10" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Wallet + paper plane — used on the Complete success card
export function SuccessGraphic({ size = 90 }: { size?: number }) {
  const { colors: themeColors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="successFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#8B5CF6" />
          <Stop offset="1" stopColor={themeColors.primaryDark} />
        </LinearGradient>
      </Defs>
      <Path d="M78 18l-18 8 8 8z" fill="#A78BFA" opacity={0.9} />
      <Rect x="14" y="30" width="64" height="48" rx="12" fill="url(#successFill)" />
      <Rect x="14" y="30" width="64" height="13" rx="12" fill="#7C3AED" />
      <Circle cx="62" cy="53" r="5.5" fill="#4C1D95" />
      <Circle cx="24" cy="76" r="12" fill={themeColors.success} />
      <Path d="M19 76l3.5 3.5L29 72" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Shield with lock + coins — used on the "Secure & Reliable" card
export function ShieldGraphic({ size = 56 }: { size?: number }) {
  const { colors: themeColors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="shieldFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#8B5CF6" />
          <Stop offset="1" stopColor={themeColors.primaryDark} />
        </LinearGradient>
      </Defs>
      <Path
        d="M50 8l30 11v24c0 22-14 37-30 41-16-4-30-19-30-41V19z"
        fill="url(#shieldFill)"
      />
      <Rect x="38" y="46" width="24" height="18" rx="4" fill="#4C1D95" />
      <Path d="M42 46v-6a8 8 0 0116 0v6" stroke="#4C1D95" strokeWidth={4} fill="none" />
      <Circle cx="50" cy="55" r="3" fill="#fff" />
      <Circle cx="18" cy="80" r="10" fill={themeColors.primary} />
      <Path d="M18 76v8M14 80h8" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      <Circle cx="82" cy="80" r="10" fill="#F59E0B" />
      <Path d="M78 80h8" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}