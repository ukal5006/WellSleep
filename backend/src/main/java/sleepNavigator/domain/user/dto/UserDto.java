package sleepNavigator.domain.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private int id;
    private String email;
    private String name;
    private String kakaoKey;
    private String refreshToken;
    private LocalDateTime createdAt;
    private boolean isNewUser;
}
