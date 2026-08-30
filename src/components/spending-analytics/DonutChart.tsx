import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { SpendingCategory } from '../../constants/spendingData';

type Props = {
  categories: SpendingCategory[];
  size?: number;
  strokeWidth?: number;
};

export function DonutChart({ categories, size = 140, strokeWidth = 22 }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = categories.reduce((sum, c) => sum + c.amount, 0) || 1;

  let cumulativeAngle = -90; // start at 12 o'clock

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {categories.map((c) => {
            const fraction = c.amount / total;
            const dashLength = fraction * circumference;
            const gap = circumference - dashLength;
            const rotation = cumulativeAngle;
            cumulativeAngle += fraction * 360;

            return (
              <Circle
                key={c.key}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={c.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${gap}`}
                strokeLinecap="butt"
                fill="none"
                rotation={rotation}
                origin={`${size / 2}, ${size / 2}`}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}