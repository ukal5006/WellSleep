package sleepGuardian.domain.constellationFortune.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sleepGuardian.domain.constellationFortune.dto.FortuneUpdateRequest;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FortuneScheduler {
    private final ConstellationFortuneService constellationFortuneService;
    private final FortuneCrawler fortuneCrawler;

    // 매일 자정에 실행 (매일 00:00에 실행)
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void scheduleDailyFortuneUpdate() {
        // 별자리 운세 데이터를 크롤링하여 가져옴
        List<FortuneUpdateRequest> dailyFortunes = fortuneCrawler.crawlDailyFortunes();

        constellationFortuneService.updateDailyFortunes(dailyFortunes);
    }
}
