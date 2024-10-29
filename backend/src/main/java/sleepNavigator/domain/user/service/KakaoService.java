package sleepNavigator.domain.user.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import sleepNavigator.domain.user.dto.KakaoUserDto;
import sleepNavigator.domain.user.dto.UserDto;

@Service
public class KakaoService {

    private final RestTemplate restTemplate;

    public KakaoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserDto getUserInfo(String kakaoToken) {
        String url = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + kakaoToken);  // 카카오 API에서는 반드시 Authorization 헤더 사용
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<KakaoUserDto> response = restTemplate.exchange(url, HttpMethod.GET, entity, KakaoUserDto.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return toUserDto(response.getBody());
        }
        else {
            throw new RuntimeException("카카오 사용자 정보 요청 실패");
        }
    }

    private UserDto toUserDto(KakaoUserDto kakaoUserDto) {
        return UserDto.builder()
                .kakaoKey(kakaoUserDto.getId().toString())  // 카카오 고유 ID를 사용자 식별자로 사용
                .email(kakaoUserDto.getKakao_account().getEmail())  // 이메일 가져오기
                .name(kakaoUserDto.getProperties().getNickname())  // 닉네임 가져오기
                .build();
    }
}
