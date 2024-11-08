package sleepGuardian.domain.constellationFortune.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sleepGuardian.domain.constellationFortune.entity.Constellation;

@Getter
@AllArgsConstructor
public class FortuneUpdateRequest {
    private Constellation constellation;
    private String fortune;
}
