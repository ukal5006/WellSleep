package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class SleepRecordDetailResponseDTO {
    private LocalDate date; // 수면 기록 날짜
    private double avg; // 평균 수면 점수
    private long sleepTime; // 총 수면 시간 (초 단위)
    private long realSleepTime; // 실제 수면 시간 (초 단위)
    private int isCaffeine; // 카페인 섭취 여부
    private int isAlcohol; // 음주 여부
    private LocalDateTime startTime; // 수면 시작 시각
    private LocalDateTime endTime; // 수면 종료 시각
    private LocalDateTime startSleep; // 입면 시작 시각
    private long shallowSleepTime; // 얕은 잠 시간 (초 단위)
    private long deepSleepTime; // 깊은 잠 시간 (초 단위)
    private long remSleepTime; // 렘 수면 시간 (초 단위)
    private long noSleepTime; // 비수면 시간 (초 단위)
    private List<SleepRecordDTO> sleepRecord; // 수면 기록 리스트

    // SleepRecordDTO 내부 클래스 추가
    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @Builder
    public static class SleepRecordDTO {
        private LocalDateTime measureTime; // 측정 시간
        private double illumination; // 조도
        private double humidity; // 습도
        private double temperature; // 온도
        private double noise; // 소음
        private double emg; // 근전도
        private double o2; // 산소 농도
        private double pulse; // 맥박
        private double score; // 수면 점수
    }
}
