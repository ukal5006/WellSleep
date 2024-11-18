package sleepGuardian.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import sleepGuardian.domain.user.entity.Constellation;
import sleepGuardian.domain.user.entity.Users;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private int id;
    private String email;
    private String name;
    private LocalDateTime createdAt;
    private Constellation constellation;
    private double emg;
    private double o2;
    private double pulse;

    public static UserResponseDTO fromEntity(Users user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .createdAt(user.getCreatedAt())
                .constellation(user.getConstellation())
                .emg(user.getEmg())
                .o2(user.getO2())
                .pulse(user.getPulse())
                .build();
    }
}
