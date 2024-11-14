package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SleepSolutionRequestDTO {

    // 수면 분석을 위해 필요한 정보
    // 수면 점수 + 실제 수면 시간 + 단계별 수면 시간 + 기타 환경 요소
    private double avg;
    private int realSleepTime;
    private int noSleepTime;
    private int shallowSleepTime;
    private int deepSleepTime;
    private int remSleepTime;
    private int humidity;
    private int temperature;
    private int illumination;
    private int noise;
    private int caffeineIntake;
    private int alcoholIntake;
}
