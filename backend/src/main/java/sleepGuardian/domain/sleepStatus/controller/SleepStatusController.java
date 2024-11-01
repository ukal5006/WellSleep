package sleepGuardian.domain.sleepStatus.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepStatus.service.SleepStatusService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SleepStatusController {
    private final SleepStatusService sleepStatusService;
}
