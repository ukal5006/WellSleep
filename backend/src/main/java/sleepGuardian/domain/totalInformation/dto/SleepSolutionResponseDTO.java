package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SleepSolutionResponseDTO {
    private int totalInformationId;
    private double illumination;
    private double noise;
    private double humidity;
    private double temperature;
    private String solution;
}
