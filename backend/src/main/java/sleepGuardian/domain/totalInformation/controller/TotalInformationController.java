package sleepGuardian.domain.totalInformation.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.totalInformation.dto.SleepImpactRequestDTO;
import sleepGuardian.domain.totalInformation.service.TotalInformationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TotalInformationController {
    private final TotalInformationService totalInformationService;

    //수면을 시작하는 API
    //total_information 생성
    @PostMapping("/start-sleep")
    public ResponseEntity<?> startSleep(HttpServletRequest request) {
        totalInformationService.startSleep((Integer) request.getAttribute("userId"));
        return ResponseEntity.ok("수면측정 시작");
    }

    //알코올, 카페인 저장
    @PostMapping("/sleepImpact")
    public ResponseEntity<?> savesleepImpact(@RequestBody SleepImpactRequestDTO dto) {
        System.out.println(dto);
        totalInformationService.savesleepImpact(dto);
        return ResponseEntity.ok("카페인, 알코올 저장 완료");
    }

    @PostMapping("/end-sleep")
    public ResponseEntity<?> endSleep(HttpServletRequest request) {

    }
}
