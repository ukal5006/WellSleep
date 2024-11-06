package sleepGuardian.domain.totalInformation.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.totalInformation.dto.SleepImpactRequestDTO;
import sleepGuardian.domain.totalInformation.dto.SleepImpactResponseDTO;
import sleepGuardian.domain.totalInformation.service.TotalInformationService;

import java.util.HashMap;
import java.util.Map;

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

    //알코올, 카페인 조회
    @GetMapping("/sleepImpact/{totalInformationId}")
    public ResponseEntity<?> getSleepImpact(@PathVariable int totalInformationId) {
        SleepImpactResponseDTO sleepImpact = totalInformationService.getSleepImpact(totalInformationId);
        return ResponseEntity.ok(sleepImpact);
    }


    //알코올, 카페인 저장
    @PostMapping("/sleepImpact")
    public ResponseEntity<Map<String, Object>> saveSleepImpact(@RequestBody SleepImpactRequestDTO sleepImpactRequestDTO) {
        int id = totalInformationService.saveSleepImpact(sleepImpactRequestDTO);
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "카페인, 알코올 저장 완료");
        responseMap.put("number", id);
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/end-sleep/{totalInformationId}")
    public ResponseEntity<?> endSleep(HttpServletRequest request, @PathVariable int totalInformationId) {
        totalInformationService.endSleep(totalInformationId);
        return ResponseEntity.ok("수면 측정 완료");
    }
}
