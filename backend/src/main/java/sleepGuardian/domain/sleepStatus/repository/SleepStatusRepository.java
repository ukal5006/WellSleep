package sleepGuardian.domain.sleepStatus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.sleepStatus.entity.SleepStatus;

@Repository
public interface SleepStatusRepository extends JpaRepository<SleepStatus, Integer> {
}
