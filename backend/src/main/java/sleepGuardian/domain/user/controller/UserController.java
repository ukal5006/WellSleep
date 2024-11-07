package sleepGuardian.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.user.dto.*;
import sleepGuardian.domain.user.service.KakaoService;
import sleepGuardian.domain.user.service.UserLoginService;
import sleepGuardian.domain.user.service.UserService;
import sleepGuardian.global.auth.JwtResponse;
import sleepGuardian.global.utils.JwtUtil;

@Tag(name = "카카오 로그인")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class UserController {
    private final KakaoService kakaoService;
    private final UserLoginService userLoginService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Operation(summary = "카카오 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestBody KakaoTokenDTO kakaoTokenDTO) {
        String kakaoToken = kakaoTokenDTO.getKakaoToken();
        if (kakaoToken == null || kakaoToken.isEmpty()) {
            // 유효하지 않은 카카오 토큰에 대해 예외 던짐
            throw new IllegalArgumentException("유효하지 않은 카카오 토큰");
        }

        // 카카오 사용자 정보 조회
        UserDto userInfo = kakaoService.getUserInfo(kakaoToken);

        // 사용자 정보 확인 및 신규 유저라면 가입 처리
        UserDto user = userLoginService.findOrCreateUser(userInfo);

        // JWT 토큰 발급
        String accessToken = jwtUtil.createAccessToken(user.getId());
        String refreshToken = jwtUtil.createRefreshToken(user.getId());
        userLoginService.storeRefreshToken(user.getId(), refreshToken);

        // JWT 토큰 반환
        return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken, user.isNewUser()));
    }

    @Operation(summary = "액세스 토큰 재발급")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        String refreshToken = refreshTokenDTO.getRefreshToken();
        if (jwtUtil.validateToken(refreshToken, true)) {
            int userId = jwtUtil.getUserIdFromRefreshToken(refreshToken);
            String newAccessToken = jwtUtil.createAccessToken(userId);
            return ResponseEntity.ok(new JwtResponse(newAccessToken, refreshToken));
        } else {
            throw new IllegalArgumentException("유효하지 않은 리프레시 토큰");
        }
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        if (userId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID");
        }

        userLoginService.invalidateRefreshToken(userId);
        return ResponseEntity.ok("로그아웃 성공");
    }

    @Operation(summary = "초기 데이터 저장")
    @PostMapping("/user/end-init")
    public ResponseEntity<?> userInfo(HttpServletRequest request, @RequestBody UserInitDataDTO userDto) {
        int userId = (Integer) request.getAttribute("userId");
        if (userId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID");
        }

        if (userService.updateUserInitData(userId, userDto)) {
            return ResponseEntity.ok("초기값 저장 성공");
        }
        throw new IllegalArgumentException("초기값 저장 실패");
    }

    @Operation(summary = "사용자 정보 조회")
    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        UserResponseDTO userInfo = userService.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }


    @Operation(summary = "회원 탈퇴")
    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        userService.deleteUser(userId);
        return ResponseEntity.ok("delete Successfully");
    }
}