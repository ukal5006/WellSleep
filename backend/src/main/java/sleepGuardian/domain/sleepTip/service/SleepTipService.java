package sleepGuardian.domain.sleepTip.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepTip.entity.Category;
import sleepGuardian.domain.sleepTip.entity.SleepTip;
import sleepGuardian.domain.sleepTip.repository.SleepTipRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SleepTipService {

    private final SleepTipRepository sleepTipRepository;

    public List<SleepTip> getTipsByCategory(Category category) {
        return sleepTipRepository.findAll().stream()
                .filter(tip -> tip.getCategory() == category)
                .collect(Collectors.toList());
    }
}
