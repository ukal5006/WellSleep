package sleepGuardian.domain.sleepStatus.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepStatus.repository.SleepStatusRepository;

@Service
@RequiredArgsConstructor
public class SleepStatusService {
    private final SleepStatusRepository sleepStatusRepository;
}
