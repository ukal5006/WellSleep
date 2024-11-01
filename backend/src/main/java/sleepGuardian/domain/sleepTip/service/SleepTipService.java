package sleepGuardian.domain.sleepTip.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepTip.repository.SleepTipRepository;

@Service
@RequiredArgsConstructor
public class SleepTipService {

    private final SleepTipRepository sleepTipRepository;
}
