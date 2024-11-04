package sleepGuardian.domain.sleepRecord.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class SleepRecordValueDTO {
    private LocalDateTime measureTime;
    private double illumination;
    private double humidity;
    private double temperature;
    private double noise;
    private double emg;
    private double o2;
    private double pulse;
    private double score; //emg+o2+pulse
}
