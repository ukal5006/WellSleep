package sleepGuardian.domain.constellationFortune.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepGuardian.domain.constellationFortune.service.ConstellationFortuneService;

@RestController
@RequiredArgsConstructor
public class ConstellationFortuneController {
    private final ConstellationFortuneService constellationFortuneService;
}
