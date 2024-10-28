package sleepNavigator.domain.driveInfo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import sleepNavigator.domain.driveInfo.service.DriveInformationService;

@RestController
@RequiredArgsConstructor
public class DriveInformationController {
    private final DriveInformationService driveInformationService;
}
