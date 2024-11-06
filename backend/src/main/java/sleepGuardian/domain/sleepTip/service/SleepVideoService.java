package sleepGuardian.domain.sleepTip.service;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepTip.dto.SleepVideoResponseDTO;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
public class SleepVideoService {
    @Value("${youtube.api.key}")
    private String apiKey;

    public SleepVideoResponseDTO  searchVideo(String query) {
        try {
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            YouTube youtube = new YouTube.Builder(
                    new NetHttpTransport(),
                    jsonFactory,
                    request -> {
                    })
                    .build();

            YouTube.Search.List search = youtube.search().list(Collections.singletonList("id,snippet"));

            // API 키 설정
            search.setKey(apiKey);

            // 검색어 설정
            search.setQ(query);

            SearchListResponse searchResponse = search.execute();

            List<SearchResult> searchResultList = searchResponse.getItems();
            if (searchResultList != null && !searchResultList.isEmpty()) {
                // 검색 결과 중 첫 번째 동영상 정보 가져오기
                SearchResult searchResult = searchResultList.get(0);

                String videoId = searchResult.getId().getVideoId();
                String videoTitle = searchResult.getSnippet().getTitle();
                String channelTitle = searchResult.getSnippet().getChannelTitle();
                String description = searchResult.getSnippet().getDescription();
                String url = "https://www.youtube.com/watch?v=" + videoId; // URL 생성

                return new SleepVideoResponseDTO(videoTitle, videoId, channelTitle, description, url);
            }
            return null;

        } catch (IOException e) {
            return null;
        }
    }
}
