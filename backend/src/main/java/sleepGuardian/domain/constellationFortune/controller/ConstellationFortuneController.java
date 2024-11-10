package sleepGuardian.domain.constellationFortune.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.constellationFortune.entity.ConstellationFortune;
import sleepGuardian.domain.constellationFortune.service.ConstellationFortuneService;
import sleepGuardian.domain.constellationFortune.service.FortuneScheduler;
import sleepGuardian.domain.user.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ConstellationFortuneController {
    private final ConstellationFortuneService constellationFortuneService;
    private final UserService userService;
    private final FortuneScheduler fortuneScheduler;

    @GetMapping("/user/constellation")
    public ResponseEntity<?> getTodayFortune(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");

        // 사용자의 별자리 가져오기
        Optional<sleepGuardian.domain.user.entity.Constellation> userConstellation = userService.getUserConstellation(userId);
        if (userConstellation.isEmpty()) {
            return ResponseEntity.status(404).body("사용자의 별자리를 찾을 수 없습니다.");
        }

        // User의 별자리를 ConstellationFortune 별자리로 변환하여 사용
        sleepGuardian.domain.constellationFortune.entity.Constellation constellationFortuneEnum =
                sleepGuardian.domain.constellationFortune.entity.Constellation.valueOf(userConstellation.get().name());

        // 사용자의 별자리에 맞는 운세 가져오기
        Optional<ConstellationFortune> fortune = constellationFortuneService.getFortuneByConstellation(constellationFortuneEnum);
        return fortune.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());
    }

    // 테스트 코드 : 개발 완료 시 삭제
//    @PostMapping("/user/constellation")
//    public ResponseEntity<?> saveFortune() {
//        // 별자리와 운세 내용이 포함된 FortuneUpdateRequest 객체를 받아서 저장
//        fortuneScheduler.scheduleDailyFortuneUpdate();
//        return ResponseEntity.ok("성공");
//    }
}
