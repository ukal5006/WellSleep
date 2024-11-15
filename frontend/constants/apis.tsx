// 기본 도메인
const DOMAIN = "https://k11b108.p.ssafy.io/api/";

// 로그인, 로그아웃
export const LOGIN = `${DOMAIN}login`;
export const LOGOUT = `${DOMAIN}logout`;

// 회원 정보 조회, 회원 탈퇴
export const USER = `${DOMAIN}user`;

// 수면 지원
export const TIP = `${DOMAIN}support/tip`;
export const FOODS = `${DOMAIN}support/foods`;
export const VIDEOS = `https://k11b108.p.ssafy.io/api/support/videos?keyword=잠잘오는`;

// 먼슬리 차트 조회
export const MONTHLY = (date: string) =>
  `${DOMAIN}totalInformation/sleepRecords?date=${date}`;

// 데일리 차트 조회
export const DAILY = (totalInformationId: string) =>
  `${DOMAIN}totalInformation/sleepRecords/${totalInformationId}`;

// 솔루션 조회
export const SOLUTION = (totalInformationId: string) =>
  `${DOMAIN}totalInformation/solution/${totalInformationId}`;

// 별자리 운세 조회
export const CONSTELLATION = `${DOMAIN}user/constellation`;

// 별자리 저장
export const CONSTELLATION_SAVE = `${DOMAIN}user/constellation`;

// 수면 측정
export const START_SLEEP = `${DOMAIN}totalInformation/start-sleep`;
export const END_SLEEP = `${DOMAIN}totalInformation/end-sleep`;
export const LIVE_SLEEP = `${DOMAIN}live-record/save`;

// 카페인 및 알코올 섭취 기록 저장
export const INTAKE_SAVE = `${DOMAIN}totalInformation/sleepImpact`;
