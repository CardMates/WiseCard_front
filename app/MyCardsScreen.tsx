import { BackButtonStyles } from '@/src/styles/buttons/BackBtn';
import { CategoryButtonStyles } from '@/src/styles/buttons/CategoryBtn';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CategoryButton, MenuButton } from './components/Button';
import SearchBar from './components/SearchBar';

const CARD_PREVIEW_WIDTH = 25;
const CARD_SPACING = 10;

export default function MyCardsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카드 리스트 너비 변수
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [snapOffsets, setSnapOffsets] = useState<number[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  type CardItem = { image: any; name: string; type: string; info: string };
  const [cardList, setCardList] = useState<CardItem[]>([]);

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카테고리 선택 핸들러
  /*
  const handleCategorySelect = (category: string) => {
    // 토글 선택: 같은 카테고리 클릭 시 선택 해제
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  */

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth + CARD_SPACING));
    setActiveIndex(index);
  };

  // 백엔드 요청 함수
  const fetchResults = async () => {
    const data = {
      query: searchQuery,
      category: selectedCategory,
    }
    try {
      /*
      const response = await axios.post('https://your-backend.com/api/search', data);
      */
      console.log(data);

      setCardList([
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드1', type: 'credit', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드2', type: 'credit', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드3', type: 'check', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드4', type: 'credit', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드5', type: 'check', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드6', type: 'credit', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드7', type: 'check', info: '설명' },
        { image: require('../assets/images/card_example.png'), name: '신한 어쩌구 카드8', type: 'check', info: '설명' },
      ])
    } catch (error) {
      console.error('검색 요청 실패:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchQuery]);

  useEffect(() => {
    if (cardList.length === 0 || cardWidth === 0) {
      setSnapOffsets([]);
      return;
    }

    const interval = cardWidth + CARD_SPACING;
    const offsets = cardList.map((_, i) => {
      return Math.round(i * interval);
    })

    setSnapOffsets(offsets);
  }, [cardList, cardWidth]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton
          icon={require('../assets/images/icons/angle-left-b.png')}
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
          placeholder='카드 검색 (카드명 혹은 별명)'
          onSubmitEditing={() => { }}
        />
        <View style={styles.categoryContainer}>
          <CategoryButton
            icon={require('../assets/images/icons/credit-card.png')}
            key={'credit'}
            title={'신용카드'}
            onPress={() => { }}
            selected={false}
            stylesSet={CategoryButtonStyles}
          />
          <CategoryButton
            icon={require('../assets/images/icons/credit-card.png')}
            key={'check'}
            title={'체크카드'}
            onPress={() => { }}
            selected={false}
            stylesSet={CategoryButtonStyles}
          />
        </View>
      </View>
      <View
        style={{ marginHorizontal: -30 }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
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
                alignItems: 'center',
              }}
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          )}
        />
      </View>
      {/* 카드 정보 영역 */}
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {cardList[activeIndex]?.name}
        </Text>
        <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
          {cardList[activeIndex]?.info}
        </Text>
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
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
