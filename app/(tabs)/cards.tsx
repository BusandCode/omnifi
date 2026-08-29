import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppleWalletCard } from "../../src/components/cards/AppleWalletCard";
import { CardActions } from "../../src/components/cards/CardActions";
import {
    CardCarousel,
    CardCarouselHandle,
} from "../../src/components/cards/CardCarousel";
import { CardLimits } from "../../src/components/cards/CardLimits";
import {
    CardsHeader,
    CardsTitle,
} from "../../src/components/cards/CardsHeader";
import { CardsTabs } from "../../src/components/cards/CardsTabs";
import { RecentCardTransactions } from "../../src/components/cards/RecentCardTransactions";
import { colors } from "../../src/theme/colors";

export default function CardsScreen() {
  const carouselRef = useRef<CardCarouselHandle>(null);

  return (
    <View style={styles.container}>
      <View style={styles.fixedTop}>
        <CardsHeader />
        <CardsTitle />
        <CardsTabs />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CardCarousel ref={carouselRef} />
        <CardActions
          onShowDetails={() => carouselRef.current?.flipActiveCard()}
        />
        <RecentCardTransactions />
        <CardLimits />
        <AppleWalletCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedTop: {
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 8,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
});