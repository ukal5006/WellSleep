package sleepNavigator.domain.sleepTime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sleepNavigator.domain.sleepTime.entity.SleepTime;

public interface SleepTimeRepository extends JpaRepository<SleepTime, Integer> {
}
