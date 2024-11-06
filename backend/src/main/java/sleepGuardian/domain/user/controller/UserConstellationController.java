package sleepGuardian.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.user.dto.UserConstellationRequestDTO;
import sleepGuardian.domain.user.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserConstellationController {
    private final UserService userService;
    @PutMapping("/user/{id}/constellation")
    public ResponseEntity<?> updateUserConstellation(@PathVariable int id, @RequestBody UserConstellationRequestDTO requestDTO) {
        boolean isUpdated = userService.updateUserConstellation(id, requestDTO.getConstellation());
        if (isUpdated) {
            return ResponseEntity.ok("사용자의 별자리가 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }
    }
}
