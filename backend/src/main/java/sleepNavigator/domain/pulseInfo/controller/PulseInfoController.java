package sleepNavigator.domain.pulseInfo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepNavigator.domain.pulseInfo.service.PulseInformationService;

@RestController
@RequiredArgsConstructor
public class PulseInfoController {
    private final PulseInformationService pulseInformationService;
}
