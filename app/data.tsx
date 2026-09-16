import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataHeader } from '../src/components/data/DataHeader';
import { DataWalletCard } from '../src/components/data/DataWalletCard';
import { NetworkSelector, Network } from '../src/components/airtime/NetworkSelector';
import { PhoneNumberInput } from '../src/components/airtime/PhoneNumberInput';
import { PhoneHint } from '../src/components/data/PhoneHint';
import { PlanTypeTabs, PlanType } from '../src/components/data/PlanTypeTabs';
import { DataPlanGrid } from '../src/components/data/DataPlanGrid';
import { OtherAmountRow } from '../src/components/data/OtherAmountRow';
import { DataTransactionSummary } from '../src/components/data/DataTransactionSummary';
import { useTheme } from '../src/theme/ThemeContext';

export type DataPlan = { size: string; validity: string; price: number; popular?: boolean };

const plansByType: Record<PlanType, DataPlan[]> = {
  daily: [
    { size: '250MB', validity: '1 Day', price: 75 },
    { size: '500MB', validity: '1 Day', price: 110 },
    { size: '1GB', validity: '1 Day', price: 160 },
    { size: '2GB', validity: '1 Day', price: 260 },
    { size: '3GB', validity: '1 Day', price: 360 },
    { size: '5GB', validity: '1 Day', price: 560, popular: true },
  ],
  weekly: [
    { size: '1GB', validity: '7 Days', price: 350 },
    { size: '1.5GB', validity: '7 Days', price: 500 },
    { size: '2.5GB', validity: '7 Days', price: 750 },
    { size: '3.5GB', validity: '7 Days', price: 1000 },
    { size: '6GB', validity: '7 Days', price: 1500, popular: true },
    { size: '10GB', validity: '7 Days', price: 2500 },
  ],
  monthly: [
    { size: '1.5GB', validity: '30 Days', price: 1000 },
    { size: '2GB', validity: '30 Days', price: 1200 },
    { size: '3.5GB', validity: '30 Days', price: 1500 },
    { size: '5GB', validity: '30 Days', price: 2500 },
    { size: '10GB', validity: '30 Days', price: 4000, popular: true },
    { size: '20GB', validity: '30 Days', price: 8000 },
  ],
  special: [
    { size: '500MB', validity: '2 Days', price: 200 },
    { size: '1.5GB', validity: '2 Days', price: 500 },
    { size: '3.2GB', validity: '2 Days', price: 1000, popular: true },
    { size: '10GB Night', validity: '30 Days', price: 1500 },
    { size: '20GB Weekend', validity: '4 Days', price: 2000 },
    { size: '32GB', validity: '30 Days', price: 10000 },
  ],
  night: [
    { size: '250MB Night', validity: '1 Day', price: 30 },
    { size: '500MB Night', validity: '1 Day', price: 50 },
    { size: '1GB Night', validity: '1 Day', price: 90, popular: true },
    { size: '2GB Night', validity: '1 Day', price: 150 },
    { size: '3GB Night', validity: '1 Day', price: 200 },
    { size: '5GB Night', validity: '1 Day', price: 300 },
  ],
};

export default function DataScreen() {
  const { colors: themeColors } = useTheme();
  const [network, setNetwork] = useState<Network>('mtn');
  const [phone, setPhone] = useState('');
  const [planType, setPlanType] = useState<PlanType>('daily');
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);

  const plans = plansByType[planType];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <DataHeader />
      <DataWalletCard />
      <NetworkSelector selected={network} onSelect={setNetwork} />
      <PhoneNumberInput value={phone} onChangeText={setPhone} />
      <PhoneHint />
      <PlanTypeTabs
        active={planType}
        onChange={(t) => {
          setPlanType(t);
          setSelectedPlan(null);
        }}
      />
      <DataPlanGrid plans={plans} selected={selectedPlan} onSelect={setSelectedPlan} />
      <OtherAmountRow />
      <DataTransactionSummary
        network={network}
        phone={phone || '0803 123 4567'}
        plan={selectedPlan}
        planTypeLabel={planType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, gap: 8 },
});