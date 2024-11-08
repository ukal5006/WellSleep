package sleepGuardian.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RefreshTokenDTO {
    private String refreshToken;
}
