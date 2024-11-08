package sleepGuardian.domain.sleepRecord.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class SleepRecordRequestDTO {
    private SleepRecordKeyDTO key;
    private SleepRecordValueDTO value;
}