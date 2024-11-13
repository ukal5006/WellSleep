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

public class SleepRecordResultDTO {
    private double avg;
    private LocalDateTime startSleepTime;
    private int sleepTime;
    private int realSleepTime;
}
