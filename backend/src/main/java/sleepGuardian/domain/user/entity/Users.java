package sleepGuardian.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.user.dto.UserInitDataDTO;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "kakao_key", nullable = false)
    private String kakaoKey;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "constellation", nullable = true)
    private Constellation constellation;

    @Column(name = "emg")
    private double emg;

    @Column(name = "o2")
    private double o2;

    @Column(name = "pulse")
    private double pulse;

    @Column(name = "profile_image")
    private String profileImage;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<TotalInformation> totalInformationList;

    // refreshToken을 변경하는 메서드 추가
    public void updateRefreshToken(String token) {
        this.refreshToken = token;
    }

    // 별자리 update
    public void updateConstellation(Constellation newConstellation) {
        this.constellation = newConstellation;
    }

    public void updateInitData(UserInitDataDTO userInitDataDTO) {
        this.emg = userInitDataDTO.getEmg();
        this.o2 = userInitDataDTO.getO2();
        this.pulse = userInitDataDTO.getPulse();
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
