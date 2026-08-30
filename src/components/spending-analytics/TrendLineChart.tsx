import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { TrendPoint } from '../../constants/spendingData';

type Props = {
  points: TrendPoint[];
  symbol: string;
  width: number;
  height?: number;
};

export function TrendLineChart({ points, symbol, width, height = 130 }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    points.length ? points.reduce((maxI, p, i, arr) => (p.amount > arr[maxI].amount ? i : maxI), 0) : null,
  );

  const paddingLeft = 4;
  const paddingRight = 4;
  const paddingTop = 28;
  const paddingBottom = 4;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...points.map((p) => p.amount), 1);
  const minVal = 0;

  const xFor = (i: number) => paddingLeft + (i / Math.max(points.length - 1, 1)) * chartWidth;
  const yFor = (v: number) => paddingTop + chartHeight - ((v - minVal) / (maxVal - minVal || 1)) * chartHeight;

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(p.amount)}`)
    .join(' ');

  const areaPath = `${linePath} L ${xFor(points.length - 1)} ${paddingTop + chartHeight} L ${xFor(0)} ${paddingTop + chartHeight} Z`;

  const active = activeIndex !== null ? points[activeIndex] : null;
  const activeX = activeIndex !== null ? xFor(activeIndex) : 0;
  const activeY = activeIndex !== null ? yFor(points[activeIndex].amount) : 0;

  const handlePress = (evt: any) => {
    const x = evt.nativeEvent.locationX;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((_, i) => {
      const dist = Math.abs(xFor(i) - x);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const tooltipWidth = 110;
  let tooltipX = activeX - tooltipWidth / 2;
  if (tooltipX < 0) tooltipX = 0;
  if (tooltipX + tooltipWidth > width) tooltipX = width - tooltipWidth;

  return (
    <Pressable onPress={handlePress}>
      <View style={{ width, height }}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.primary} stopOpacity={0.35} />
              <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
            </LinearGradient>
          </Defs>

          <Path d={areaPath} fill="url(#trendFill)" />
          <Path d={linePath} stroke={colors.primary} strokeWidth={2} fill="none" strokeLinejoin="round" strokeLinecap="round" />

          {active && (
            <>
              <Line
                x1={activeX} y1={paddingTop} x2={activeX} y2={paddingTop + chartHeight}
                stroke={colors.primary} strokeWidth={1} strokeDasharray="3 4" opacity={0.5}
              />
              <Circle cx={activeX} cy={activeY} r={5} fill={colors.primary} stroke="#fff" strokeWidth={1.5} />
            </>
          )}
        </Svg>

        {active && (
          <View style={[styles.tooltip, { left: tooltipX, top: 0 }]}>
            <Text style={styles.tooltipDate}>{active.label}</Text>
            <Text style={styles.tooltipAmount}>{symbol}{money(active.amount)}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 110,
    alignItems: 'center',
  },
  tooltipDate: { color: colors.textSecondary, fontSize: 9 },
  tooltipAmount: { color: colors.textPrimary, fontSize: 11, fontWeight: '700', marginTop: 1 },
});