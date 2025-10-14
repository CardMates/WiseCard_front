export interface Store {
  id: number;
  name: string;
  lat: number;
  lng: number;
  // 기타 필드들...
}

export const storeExamples = [
  {
    id: "id1",
    placeName: "store1",
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
    ],
  },
];
