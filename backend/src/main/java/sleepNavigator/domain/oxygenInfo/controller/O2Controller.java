package sleepNavigator.domain.oxygenInfo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepNavigator.domain.oxygenInfo.service.O2InformationService;

@RestController
@RequiredArgsConstructor
public class O2Controller {
    private final O2InformationService o2InformationService;
}
