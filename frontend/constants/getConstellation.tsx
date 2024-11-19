import React from "react";

export function getConstellation(month: number, day: number): string {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "물병자리";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return "물고기자리";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "양자리";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "황소자리";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21))
    return "쌍둥이자리";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "게자리";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return "사자자리";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "처녀자리";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23))
    return "천칭자리";
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22))
    return "전갈자리";
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21))
    return "사수자리";
  return "염소자리";
}
