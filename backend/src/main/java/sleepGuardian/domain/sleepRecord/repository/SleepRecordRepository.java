package sleepGuardian.domain.sleepRecord.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.sleepRecord.entity.SleepRecord;

@Repository
public interface SleepRecordRepository extends JpaRepository<SleepRecord, Integer> {
}
