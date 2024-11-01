package sleepGuardian.domain.sleepTime.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepTime.repository.SleepTimeRepository;

@Service
@RequiredArgsConstructor
public class SleepTimeService {
    private final SleepTimeRepository sleepTimeRepository;
}
