package sleepGuardian.domain.totalInformation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.totalInformation.service.TotalInformationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TotalInformationController {
    private final TotalInformationService totalInformationService;
}
