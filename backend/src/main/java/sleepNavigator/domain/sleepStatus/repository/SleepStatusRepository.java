package sleepNavigator.domain.sleepStatus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sleepNavigator.domain.sleepStatus.entity.SleepStatus;

public interface SleepStatusRepository extends JpaRepository<SleepStatus, Integer> {
}
