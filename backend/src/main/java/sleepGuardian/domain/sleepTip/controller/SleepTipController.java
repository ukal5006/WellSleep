package sleepGuardian.domain.sleepTip.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepTip.dto.SleepTipResponseDTO;
import sleepGuardian.domain.sleepTip.dto.SleepVideoResponseDTO;
import sleepGuardian.domain.sleepTip.entity.Category;
import sleepGuardian.domain.sleepTip.entity.SleepTip;
import sleepGuardian.domain.sleepTip.service.SleepTipService;
import sleepGuardian.domain.sleepTip.service.SleepVideoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SleepTipController {
    private final SleepTipService sleepTipService;
    private final SleepVideoService sleepVideoService;

    @GetMapping("/tip")
    public ResponseEntity<?> getTips() {
        List<SleepTip> tips = sleepTipService.getTipsByCategory(Category.팁);
        List<SleepTipResponseDTO> response = tips.stream()
                .map(SleepTipResponseDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/foods")
    public ResponseEntity<?> getFoods() {
        List<SleepTip> foods = sleepTipService.getTipsByCategory(Category.음식);
        List<SleepTipResponseDTO> response = foods.stream()
                .map(SleepTipResponseDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/videos")
    public ResponseEntity<?> getVideos(@RequestParam String keyword) {
        SleepVideoResponseDTO sleepVideoResponseDTO = sleepVideoService.searchVideo(keyword);
        return ResponseEntity.ok(sleepVideoResponseDTO);
    }

}
