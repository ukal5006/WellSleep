package sleepGuardian.domain.sleepRecord.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.sleepRecord.entity.SleepRecord;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

import java.util.List;

@Repository
public interface SleepRecordRepository extends JpaRepository<SleepRecord, Integer> {
    public List<SleepRecord> findAllByTotalInformation(TotalInformation totalInformation);
    List<SleepRecord> findAllByTotalInformationId(int totalInformationId);
}
