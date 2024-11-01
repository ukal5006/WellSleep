package sleepGuardian.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class KakaoUserDto {
    private Long id;  // 카카오 고유 ID
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Properties {
        private String nickname;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        public static class Profile {
            private String nickname;
        }
    }
}
