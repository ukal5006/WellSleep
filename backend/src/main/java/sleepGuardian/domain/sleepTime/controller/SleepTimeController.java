package sleepGuardian.domain.sleepTime.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepTime.service.SleepTimeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SleepTimeController {
    private final SleepTimeService sleepTimeService;
}
