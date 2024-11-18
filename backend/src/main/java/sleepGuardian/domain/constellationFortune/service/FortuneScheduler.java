package sleepGuardian.domain.constellationFortune.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sleepGuardian.domain.constellationFortune.dto.FortuneUpdateRequest;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FortuneScheduler {
    private final ConstellationFortuneService constellationFortuneService;
    private final FortuneCrawler fortuneCrawler;

    // 매일 오전 6시에 실행 
    @Scheduled(cron = "0 0,1 6 * * *")
    @Transactional
    public void scheduleDailyFortuneUpdate() {

        log.info("스케줄러가 실행되어 오늘의 별자리 운세가 갱신되었습니다!");

        // 별자리 운세 데이터를 크롤링하여 가져옴
        List<FortuneUpdateRequest> dailyFortunes = fortuneCrawler.crawlDailyFortunes();

        constellationFortuneService.updateDailyFortunes(dailyFortunes);
    }
}
