package sleepGuardian.domain.sleepTip.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.sleepTip.service.SleepTipService;

@RestController
@RequiredArgsConstructor
public class SleepTipController {
    private final SleepTipService sleepTipService;
}
