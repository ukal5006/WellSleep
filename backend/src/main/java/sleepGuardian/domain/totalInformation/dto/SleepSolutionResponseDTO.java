package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SleepSolutionResponseDTO {
    private int totalInformationId;
    private int illumination;
    private int noise;
    private int humidity;
    private int temperature;
    private String solution;
}
