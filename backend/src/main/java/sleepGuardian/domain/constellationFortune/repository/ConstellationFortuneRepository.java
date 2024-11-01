package sleepGuardian.domain.constellationFortune.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.constellationFortune.entity.ConstellationFortune;

@Repository
public interface ConstellationFortuneRepository extends JpaRepository<ConstellationFortune, Integer> {
}
