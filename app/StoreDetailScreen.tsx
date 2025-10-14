import { categories } from "@/src/constants/categories";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import Colors from "@/src/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "./components/Button";

export default function StoreDetailScreen() {
  const params = useLocalSearchParams<{ name?: string; info?: "설명" }>();

  const shoppingCategory = categories.find((cat) => cat.value === "shopping");
  const name = params.name ?? "스토어 이름";
  const storeInfo = "서울특별시 XX구 XX동 XX번길";
  const cardList = [
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
    {
      image: require("../assets/images/card_example.png"),
      name: "신한 어쩌구 카드",
      info: "설명",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton
          icon={require("../assets/images/icons/angle-left-b.png")}
          onPress={() => router.back()}
          disabled={false}
          stylesSet={BackButtonStyles}
        />
        <View style={styles.titleContainer}>
          {/*
                    <CategoryButton
                        icon={shoppingCategory?.icon}
                        title={shoppingCategory?.label}
                        onPress={() => { }}
                        selected={true}
                        stylesSet={CategoryButtonStyles}
                    />*/}
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.storeInfo}>{storeInfo}</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionTitle}>사용할 수 있는 카드</Text>
        {cardList.map((card, i) => (
          <View key={i} style={styles.cardBlock}>
            <Image source={card.image} style={styles.cardImage} />
            <View>
              <Text style={styles.cardName}>{card.name}</Text>
              <Text style={styles.cardInfo}>{card.info}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    paddingVertical: 20,
    gap: 15,
  },
  titleContainer: {
    alignItems: "center",
    gap: 5,
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: "bold",
  },
  storeInfo: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    //marginTop: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.TEXT_SECONDARY,
  },
  cardBlock: {
    //backgroundColor: "orange",
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.TEXT_SECONDARY,
  },
  cardImage: {
    width: 110,
    height: 70,
    resizeMode: "contain",
  },
  cardName: {
    fontWeight: 700,
    fontSize: 18,
    color: Colors.TEXT_PRIMARY,
  },
  cardInfo: {},
});
