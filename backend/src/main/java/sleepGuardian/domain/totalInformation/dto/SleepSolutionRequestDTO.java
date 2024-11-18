package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SleepSolutionRequestDTO {

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
