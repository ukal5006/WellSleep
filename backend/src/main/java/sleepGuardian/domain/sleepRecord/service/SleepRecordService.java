package sleepGuardian.domain.sleepRecord.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.repository.SleepRecordRepository;

@Service
@RequiredArgsConstructor
public class SleepRecordService {
    private final SleepRecordRepository repository;
}
