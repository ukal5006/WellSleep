package sleepNavigator.domain.driveInfo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepNavigator.domain.driveInfo.repository.DriveInformationRepository;

@Service
@RequiredArgsConstructor
public class DriveInformationService {
    private final DriveInformationRepository driveInformationRepository;
}
