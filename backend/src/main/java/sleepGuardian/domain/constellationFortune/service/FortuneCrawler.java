package sleepGuardian.domain.constellationFortune.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;
import sleepGuardian.domain.constellationFortune.dto.FortuneUpdateRequest;
import sleepGuardian.domain.constellationFortune.entity.Constellation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class FortuneCrawler {
    private static final Map<Constellation, String> CONSTELLATION_URLS = new EnumMap<>(Constellation.class);

    static {
        CONSTELLATION_URLS.put(Constellation.물병자리, "https://search.naver.com/search.naver?query=물병자리 운세");
        CONSTELLATION_URLS.put(Constellation.물고기자리, "https://search.naver.com/search.naver?query=물고기자리 운세");
        CONSTELLATION_URLS.put(Constellation.양자리, "https://search.naver.com/search.naver?query=양자리 운세");
        CONSTELLATION_URLS.put(Constellation.황소자리, "https://search.naver.com/search.naver?query=황소자리 운세");
        CONSTELLATION_URLS.put(Constellation.쌍둥이자리, "https://search.naver.com/search.naver?query=쌍둥이자리 운세");
        CONSTELLATION_URLS.put(Constellation.게자리, "https://search.naver.com/search.naver?query=게자리 운세");
        CONSTELLATION_URLS.put(Constellation.사자자리, "https://search.naver.com/search.naver?query=사자자리 운세");
        CONSTELLATION_URLS.put(Constellation.처녀자리, "https://search.naver.com/search.naver?query=처녀자리 운세");
        CONSTELLATION_URLS.put(Constellation.천칭자리, "https://search.naver.com/search.naver?query=천칭자리 운세");
        CONSTELLATION_URLS.put(Constellation.전갈자리, "https://search.naver.com/search.naver?query=전갈자리 운세");
        CONSTELLATION_URLS.put(Constellation.사수자리, "https://search.naver.com/search.naver?query=사수자리 운세");
        CONSTELLATION_URLS.put(Constellation.염소자리, "https://search.naver.com/search.naver?query=염소자리 운세");
    }

    public List<FortuneUpdateRequest> crawlDailyFortunes() {
        List<FortuneUpdateRequest> dailyFortunes = new ArrayList<>();

        CONSTELLATION_URLS.forEach((constellation, url) -> {
            try {
                String fortune = getFortuneFromUrl(url);
                dailyFortunes.add(new FortuneUpdateRequest(constellation, fortune));
                Thread.sleep(1000);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                dailyFortunes.add(new FortuneUpdateRequest(constellation, "운세를 가져오는 데 실패했습니다."));
            }
        });

        return dailyFortunes;
    }

    private String getFortuneFromUrl(String url) throws IOException {
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36")
                .timeout(5000) // 타임아웃을 5초로 설정
                .get();

        Element fortuneElement = doc.selectFirst("p.text._cs_fortune_text");
        String fortuneText = fortuneElement != null ? fortuneElement.text() : "운세 정보를 가져올 수 없습니다.";
        fortuneText = fortuneText.replaceFirst("\\d{1,2}월 \\d{1,2}일 ~ \\d{1,2}월 \\d{1,2}일", "").trim();

        return fortuneText;
    }

}
