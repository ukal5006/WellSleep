package sleepNavigator.domain.restArea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.restArea.entity.RestAreas;

@Repository
public interface RestAreaRepository extends JpaRepository<RestAreas, Integer> {
}
