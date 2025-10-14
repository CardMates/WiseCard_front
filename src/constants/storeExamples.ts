export interface Store {
  id: string;
  placeName: string;
  lat: number;
  lng: number;
  availableCards: StoreCard[];
}

export interface StoreCard {
  cardId: number;
  cardName: string;
  benefits: StoreBenefit[];
}

export interface StoreBenefit {
  benefitId: number;
  benefitType: string;
  rate: number;
  amount: number;
}

export const storeExamples = [
  {
    id: "id1",
    placeName: "아키",
    lat: 37.563985,
    lng: 126.944499,
    availableCards: [
      {
        cardId: 1,
        cardName: "Discount Plan",
        benefits: [
          {
            benefitId: 11,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 12,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 13,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
        ],
      },
      {
        cardId: 2,
        cardName: "Discount Plan+",
        benefits: [
          {
            benefitId: 21,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 22,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 23,
            benefitType: "cashback",
            rate: 0,
            amount: 30000,
          },
        ],
      },
    ],
  },
  {
    id: "id2",
    placeName: "다미",
    lat: 37.564337,
    lng: 126.944902,
    availableCards: [
      {
        cardId: 1,
        cardName: "Discount Plan",
        benefits: [
          {
            benefitId: 11,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 12,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 13,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
        ],
      },
      {
        cardId: 2,
        cardName: "Discount Plan+",
        benefits: [
          {
            benefitId: 21,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 22,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 23,
            benefitType: "cashback",
            rate: 0,
            amount: 30000,
          },
        ],
      },
    ],
  },
  {
    id: "id3",
    placeName: "아비꼬 연대동문점",
    lat: 37.564476,
    lng: 126.944446,
    availableCards: [
      {
        cardId: 1,
        cardName: "Discount Plan",
        benefits: [
          {
            benefitId: 11,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 12,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 13,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
        ],
      },
      {
        cardId: 2,
        cardName: "Discount Plan+",
        benefits: [
          {
            benefitId: 21,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 22,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 23,
            benefitType: "cashback",
            rate: 0,
            amount: 30000,
          },
        ],
      },
    ],
  },
  {
    id: "id4",
    placeName: "딸기골분식",
    lat: 37.563947,
    lng: 126.94382,
    availableCards: [
      {
        cardId: 1,
        cardName: "Discount Plan",
        benefits: [
          {
            benefitId: 11,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 12,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 13,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
        ],
      },
      {
        cardId: 2,
        cardName: "Discount Plan+",
        benefits: [
          {
            benefitId: 21,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 22,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 23,
            benefitType: "cashback",
            rate: 0,
            amount: 30000,
          },
        ],
      },
    ],
  },
  {
    id: "id5",
    placeName: "옥루몽",
    lat: 37.563483,
    lng: 126.943495,
    availableCards: [
      {
        cardId: 1,
        cardName: "Discount Plan",
        benefits: [
          {
            benefitId: 11,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 12,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 13,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
        ],
      },
      {
        cardId: 2,
        cardName: "Discount Plan+",
        benefits: [
          {
            benefitId: 21,
            benefitType: "discount",
            rate: 10,
            amount: 0,
          },
          {
            benefitId: 22,
            benefitType: "discount",
            rate: 5,
            amount: 0,
          },
          {
            benefitId: 23,
            benefitType: "cashback",
            rate: 0,
            amount: 30000,
          },
        ],
      },
    ],
  },
];
