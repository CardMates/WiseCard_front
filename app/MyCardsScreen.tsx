import { cardCompanies } from "@/src/constants/cardCompanies";
import { Card, cardExamples } from "@/src/constants/cardExamples";
import {
  CardFilters,
  getUserCards,
  removeUserCard,
} from "@/src/hooks/useCards";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import Colors from "@/src/styles/colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton, CategoryButton, MenuButton } from "./components/Button";
import { Dropdown } from "./components/DropDown";
import SearchBar from "./components/SearchBar";

const CARD_PREVIEW_WIDTH = 25;
const CARD_SPACING = 10;

export default function MyCardsScreen() {
  const CARD_TYPES = [
    { key: "credit", title: "신용카드" },
    { key: "check", title: "체크카드" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카드 타입 (credit/check) 선택 핸들러
  const handleCardTypeSelect = (cardType: string) => {
    if (selectedCardType === cardType) {
      setSelectedCardType(null);
    } else {
      setSelectedCardType(cardType);
    }
  };

  const [cardList, setCardList] = useState<Card[]>([]);

  // 카드 리스트 너비 변수
  const [cardWidth, setCardWidth] = useState(0);
  const [snapOffsets, setSnapOffsets] = useState<number[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth + CARD_SPACING));
    setActiveIndex(index);
  };

  // 카드 목록 요청 함수
  const fetchUserCards = async () => {
    const cardFilter: CardFilters = {};

    if (selectedBank) cardFilter.cardBank = selectedBank;
    if (selectedCardType) cardFilter.cardType = selectedCardType;
    if (searchQuery !== "") cardFilter.cardName = searchQuery;

    console.log("📤 카드 필터 요청 데이터:", cardFilter);

    try {
      const data = await getUserCards(cardFilter);
      console.log(data);

      if (data.length == 0) {
        setCardList([
          ...cardExamples,
          {
            cardId: 0,
            cardName: "",
            cardBank: undefined,
            imgUrl: undefined,
            type: "add",
            benefits: {
              discounts: [],
              points: [],
              cashbacks: [],
              applicableCategory: [],
              applicableTargets: [],
            },
          },
        ]); // 리스트 마지막에 카드 추가 버튼
      } else {
        setCardList([
          ...data,
          {
            cardId: 0,
            cardName: "",
            cardBank: undefined,
            imgUrl: undefined,
            type: "add",
            benefits: {
              discounts: [],
              points: [],
              cashbacks: [],
              applicableCategory: [],
              applicableTargets: [],
            },
          },
        ]);
      }
    } catch (err) {
      console.error("검색 요청 실패:", err);
    }
  };

  const handleRemoveUserCard = async () => {
    console.log("delete card num:", cardList[activeIndex]?.cardName);
    try {
      const result = removeUserCard(cardList[activeIndex].cardId);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, [selectedBank, selectedCardType, searchQuery]);

  useEffect(() => {
    if (cardList.length === 0 || cardWidth === 0) {
      setSnapOffsets([]);
      return;
    }

    const interval = cardWidth + CARD_SPACING;
    const offsets = cardList.map((_, i) => {
      return Math.round(i * interval);
    });

    setSnapOffsets(offsets);
  }, [cardList, cardWidth]);

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
          <Text style={styles.title}>나의 카드</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="카드 검색 (카드명 혹은 별명)"
          onSubmitEditing={() => {}}
        />
        <View style={styles.categoryContainer}>
          <Dropdown
            options={cardCompanies}
            selectedValue={selectedBank}
            onSelect={setSelectedBank}
            placeholder="카드사 선택"
          />
          {CARD_TYPES.map((type) => (
            <CategoryButton
              icon={null}
              key={type.key}
              title={type.title}
              onPress={() => handleCardTypeSelect(type.key)}
              selected={selectedCardType === type.key}
              stylesSet={CategoryButtonStyles}
            />
          ))}
        </View>
      </View>
      <View
        style={{ marginHorizontal: -30 }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardWidth(width - 60);
        }}
      >
        <FlatList
          data={cardList}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          contentContainerStyle={{
            paddingHorizontal: CARD_PREVIEW_WIDTH, // 양옆 여백 → 첫/마지막 카드도 가운데에 위치
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToOffsets={snapOffsets}
          renderItem={({ item }) => (
            <View
              style={{
                width: cardWidth,
                marginHorizontal: CARD_SPACING / 2,
                alignItems: "center",
              }}
            >
              {item.type === "add" ? (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    router.push("../AddCardsScreen");
                  }}
                >
                  <Text
                    style={{ color: "#666", fontSize: 18, fontWeight: "bold" }}
                  >
                    + 카드 추가
                  </Text>
                </TouchableOpacity>
              ) : (
                <Image
                  source={{ uri: item.imgUrl }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 180,
                    // aspectRatio: 1.586,
                    borderRadius: 12,
                    backgroundColor: "red",
                  }}
                />
              )}
            </View>
          )}
        />
      </View>
      {/* 카드 정보 영역 */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {cardList[activeIndex]?.cardName}
        </Text>
        {/* 모든 혜택 description 출력 */}
        {[
          ...(cardList[activeIndex]?.benefits?.discounts || []),
          ...(cardList[activeIndex]?.benefits?.points || []),
          ...(cardList[activeIndex]?.benefits?.cashbacks || []),
        ]
          .filter((b) => b.description)
          .map((benefit, id) => (
            <Text
              key={id}
              style={{ fontSize: 14, color: "gray", marginTop: 5 }}
            >
              • {benefit.description}
            </Text>
          ))}
        {cardList[activeIndex]?.type !== "add" && (
          <ActionButton
            title={"카드 삭제하기"}
            onPress={() => handleRemoveUserCard()}
            stylesSet={DeleteActionButtonStyles}
          />
        )}
      </View>
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
    // paddingVertical: 10,
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  filterContainer: {
    flexDirection: "column",
    width: "100%",
    gap: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    paddingBottom: 15,
    gap: 5,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
});

const DeleteActionButtonStyles = StyleSheet.create({
  materialButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
    paddingHorizontal: 60,
    height: 40,
    borderRadius: 28,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  buttonContents: {
    color: "red",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    overflow: "hidden",
    includeFontPadding: false, // Android에서 불필요한 여백 제거
    textAlignVertical: "center",
  },
});
