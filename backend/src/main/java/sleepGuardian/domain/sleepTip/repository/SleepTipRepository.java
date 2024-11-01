package sleepGuardian.domain.sleepTip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.sleepTip.entity.SleepTip;

@Repository
public interface SleepTipRepository extends JpaRepository<SleepTip, Integer> {

}
