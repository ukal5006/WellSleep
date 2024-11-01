package sleepGuardian.domain.sleepRecord.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepRecord.service.SleepRecordService;

@RestController
@RequiredArgsConstructor
public class SleepRecordController {
    private final SleepRecordService sleepRecordService;
}
