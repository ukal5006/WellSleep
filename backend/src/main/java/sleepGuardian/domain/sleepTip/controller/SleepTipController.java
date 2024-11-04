package sleepGuardian.domain.sleepTip.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepTip.dto.SleepTipResponseDTO;
import sleepGuardian.domain.sleepTip.entity.Category;
import sleepGuardian.domain.sleepTip.entity.SleepTip;
import sleepGuardian.domain.sleepTip.service.SleepTipService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SleepTipController {
    private final SleepTipService sleepTipService;

    @GetMapping("/tip")
    public List<SleepTipResponseDTO> getTips() {
        List<SleepTip> tips = sleepTipService.getTipsByCategory(Category.팁);
        return tips.stream()
                .map(SleepTipResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/foods")
    public List<SleepTipResponseDTO> getFoods() {
        List<SleepTip> foods = sleepTipService.getTipsByCategory(Category.음식);
        return foods.stream()
                .map(SleepTipResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
