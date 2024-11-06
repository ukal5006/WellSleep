package sleepGuardian.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserInitDataDTO {
    private double emg;
    private double o2;
    private double pulse;
}
