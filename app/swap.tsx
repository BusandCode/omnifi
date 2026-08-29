import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SwapHeader } from '../src/components/swap/SwapHeader';
import { RatesBanner } from '../src/components/swap/RatesBanner';
import { SwapCard } from '../src/components/swap/SwapCard';
import { ExchangeRateBar } from '../src/components/swap/ExchangeRateBar';
import { CurrencyChooser } from '../src/components/swap/CurrencyChooser';
import { SwapSummary } from '../src/components/swap/SwapSummary';
import { SwapFooter } from '../src/components/swap/SwapFooter';
import { currencies, CurrencyCode } from '../src/data/currencies';
import { colors } from '../src/theme/colors';

export default function SwapScreen() {
  const [sendCurrency, setSendCurrency] = useState<CurrencyCode>('USD');
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyCode>('NGN');
  const [sendAmount, setSendAmount] = useState('1000.00');

  const rate = 1542.35;
  const receiveAmount = (parseFloat(sendAmount || '0') * rate).toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

  const handleFlip = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const handleChooseCurrency = (code: CurrencyCode) => {
    if (code === sendCurrency) return;
    setReceiveCurrency(code);
  };

  return (
    <View style={styles.container}>
      <SwapHeader />
      <RatesBanner />

      <SwapCard
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
        sendAmount={sendAmount}
        receiveAmount={receiveAmount}
        rate={rate}
        onChangeSendAmount={setSendAmount}
        onFlip={handleFlip}
      />

      <ExchangeRateBar sendCurrency={sendCurrency} receiveCurrency={receiveCurrency} rate={rate} />

      <CurrencyChooser selected={receiveCurrency} onSelect={handleChooseCurrency} excluding={sendCurrency} />

      <SwapSummary
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
        sendAmount={sendAmount}
        receiveAmount={receiveAmount}
        rate={rate}
      />

      <SwapFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 46, paddingBottom: 10, gap: 7 },
});