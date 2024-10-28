package sleepNavigator.domain.restArea.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepNavigator.domain.restArea.repository.RestAreaRepository;

@Service
@RequiredArgsConstructor
public class RestAreaService {
    private final RestAreaRepository restAreaRepository;
}
