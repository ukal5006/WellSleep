package sleepGuardian.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sleepGuardian.domain.user.entity.Constellation;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserConstellationRequestDTO {
    private Constellation constellation;
}
