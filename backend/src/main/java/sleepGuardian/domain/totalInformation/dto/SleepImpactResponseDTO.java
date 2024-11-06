package sleepGuardian.domain.totalInformation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SleepImpactResponseDTO {
    private int id;
    private int alcoholIntake;
    private int caffeineIntake;
}
