package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class SleepSummariesResponseDTO {
    private int totalInformationId;
    private LocalDate date;
    private double avg;
    private int sleepTime;
    private int realSleepTime;
    private int isCaffeine;
    private int isAlcohol;
}
