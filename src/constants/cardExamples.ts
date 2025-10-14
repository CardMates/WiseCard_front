interface BenefitDetail {
  rate: number;
  amount: number;
  minimumAmount: number;
  benefitLimit: number;
  channel: string;
  description: string;
}

interface PointBenefit {
  rate: number;
  minimumAmount: number;
  benefitLimit: number;
  channel: string;
  description: string;
}

interface Benefits {
  discounts: BenefitDetail[];
  points: PointBenefit[];
  cashbacks: BenefitDetail[];
  applicableCategory: string[];
  applicableTargets: string[];
  summary?: string;
}

interface Performance {
  currentAmount: number; // 현재 실적
  targetAmount: number; // 목표 실적
  isAchieved: boolean; // 달성 여부
}

interface Limit {
  usedDiscountAmount: number; // 사용된 할인 금액
  totalDiscountLimit: number; // 할인 한도
  usedPointAmount: number; // 사용된 포인트 금액
  totalPointLimit: number; // 포인트 한도
  usedCashbackAmount: number; // 사용된 캐시백 금액
  totalCashbackLimit: number; // 캐시백 한도
}

export interface Card {
  cardId: number;
  cardName: string;
  cardBank?: string; // undefined 허용
  imgUrl?: string; // undefined 허용
  type: string;
  benefits: Benefits;
}

export interface MatchingCard {
  cardName: string;
  imgUrl: string;
  type: string;
  benefits: Benefits;
  performance: Performance;
  limits: Limit;
}

export const cardExamples = [
  {
    cardId: 1,
    cardName: "Discount Plan",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditPODDR1.png",
    type: "credit",
    benefits: {
      discounts: [
        {
          rate: 10,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "외식·배달·편의점 10% 할인",
        },
        {
          rate: 5,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "쇼핑·주유·생활 5~10% 할인",
        },
        {
          rate: 10,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "공과금·디지털구독 10~20% 할인",
        },
      ],
      points: [],
      cashbacks: [],
      applicableCategory: [
        "외식",
        "배달",
        "편의점",
        "쇼핑",
        "주유",
        "생활",
        "공과금",
        "디지털구독",
      ],
      applicableTargets: [
        "음식점",
        "배달앱",
        "편의점",
        "온라인쇼핑",
        "주유소",
        "공과금",
        "구독서비스",
      ],
    },
  },
  {
    cardId: 2,
    cardName: "Discount Plan+",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditPOEDR2s.png",
    type: "credit",
    benefits: {
      discounts: [
        {
          rate: 10,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "외식·배달·편의점 10% 할인",
        },
        {
          rate: 5,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "쇼핑·주유·생활 5~10% 할인",
        },
        {
          rate: 0,
          amount: 30000,
          minimumAmount: 0,
          benefitLimit: 30000,
          channel: "BOTH",
          description: "장보기 3만원 캐시백",
        },
      ],
      points: [],
      cashbacks: [
        {
          rate: 0,
          amount: 30000,
          minimumAmount: 0,
          benefitLimit: 30000,
          channel: "BOTH",
          description: "장보기 3만원 캐시백",
        },
      ],
      applicableCategory: [
        "외식",
        "배달",
        "편의점",
        "쇼핑",
        "주유",
        "생활",
        "장보기",
      ],
      applicableTargets: [
        "음식점",
        "배달앱",
        "편의점",
        "온라인쇼핑",
        "주유소",
        "마트",
        "슈퍼마켓",
      ],
    },
  },
  {
    cardId: 3,
    cardName: "Point Plan+",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditPOCDMGs.gif",
    type: "credit",
    benefits: {
      discounts: [],
      points: [
        {
          rate: 0.7,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "일상 생활비 0.7~3% 적립",
        },
        {
          rate: 5,
          minimumAmount: 0,
          benefitLimit: 50000,
          channel: "BOTH",
          description: "주말 외식비 최대 5천 포인트 적립",
        },
        {
          rate: 1,
          minimumAmount: 0,
          benefitLimit: 20000,
          channel: "BOTH",
          description: "공과금·통신·OTT 최대 1만2천 포인트 적립",
        },
      ],
      cashbacks: [],
      applicableCategory: ["일상생활", "외식", "공과금", "통신", "OTT"],
      applicableTargets: [
        "모든가맹점",
        "음식점",
        "공과금",
        "통신요금",
        "OTT서비스",
      ],
    },
  },
  {
    cardId: 4,
    cardName: "Haru (Hoshino Resorts)",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditBUFDQAs.gif",
    type: "credit",
    benefits: {
      discounts: [
        {
          rate: 30,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "호시노리조트 계열 최대 30% 할인",
        },
      ],
      points: [
        {
          rate: 3.5,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "일본 이용 3.5% 적립",
        },
        {
          rate: 1,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "국내 이용 1% 적립",
        },
      ],
      cashbacks: [],
      applicableCategory: ["여행", "숙박", "해외이용", "국내이용"],
      applicableTargets: ["호시노리조트", "일본가맹점", "국내가맹점"],
    },
  },
  {
    cardId: 5,
    cardName: "Point Plan",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditPOADHLs.gif",
    type: "credit",
    benefits: {
      discounts: [],
      points: [
        {
          rate: 0.5,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "일상생활비 0.5~3% 적립",
        },
        {
          rate: 0,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "주말 외식비 포인트 적립",
        },
        {
          rate: 0,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "정기결제 자동납부 포인트 적립",
        },
      ],
      cashbacks: [],
      applicableCategory: ["일상생활", "외식", "정기결제", "자동납부"],
      applicableTargets: ["모든가맹점", "음식점", "공과금", "정기결제"],
    },
  },
  {
    cardId: 6,
    cardName: "Simple Platinum# Splendor Plus",
    cardBank: "SHINHAN",
    imgUrl:
      "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditBA7DT7s.png",
    type: "credit",
    benefits: {
      discounts: [
        {
          rate: 0,
          amount: 30000,
          minimumAmount: 0,
          benefitLimit: 30000,
          channel: "ONLINE",
          description: "온라인 영화 예매 최대 3천원 할인",
        },
      ],
      points: [],
      cashbacks: [
        {
          rate: 1,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "국내외 가맹점 1% 캐시백",
        },
        {
          rate: 0.7,
          amount: 0,
          minimumAmount: 0,
          benefitLimit: 0,
          channel: "BOTH",
          description: "생활 필수 가맹점 +0.7% 캐시백",
        },
      ],
      applicableCategory: ["국내외가맹점", "생활필수", "영화", "온라인예매"],
      applicableTargets: [
        "모든가맹점",
        "생활필수가맹점",
        "영화관",
        "온라인예매",
      ],
    },
  },
];
