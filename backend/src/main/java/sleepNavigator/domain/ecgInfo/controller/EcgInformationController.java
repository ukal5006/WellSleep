package sleepNavigator.domain.ecgInfo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepNavigator.domain.ecgInfo.service.EcgInformationService;

@RestController
@RequiredArgsConstructor
public class EcgInformationController {
    private final EcgInformationService ecgInformationService;
}
