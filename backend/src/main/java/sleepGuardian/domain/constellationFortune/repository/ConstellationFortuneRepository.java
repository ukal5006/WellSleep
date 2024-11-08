package sleepGuardian.domain.constellationFortune.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.constellationFortune.entity.Constellation;
import sleepGuardian.domain.constellationFortune.entity.ConstellationFortune;

import java.util.Optional;

@Repository
public interface ConstellationFortuneRepository extends JpaRepository<ConstellationFortune, Integer> {
    Optional<ConstellationFortune> findByConstellation(Constellation constellation);
}
