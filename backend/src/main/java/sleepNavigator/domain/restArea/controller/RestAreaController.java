package sleepNavigator.domain.restArea.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepNavigator.domain.restArea.service.RestAreaService;

@RestController
@RequiredArgsConstructor
public class RestAreaController {
    private final RestAreaService restAreaService;
}
