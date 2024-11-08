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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SleepVideoService {
    @Value("${youtube.api.key}")
    private String apiKey;

    public List<SleepVideoResponseDTO> searchVideo(String query, int maxResults) {
        try {
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            YouTube youtube = new YouTube.Builder(
                    new NetHttpTransport(),
                    jsonFactory,
                    request -> {
                    }
            ).build();

            YouTube.Search.List search = youtube.search().list(Collections.singletonList("id,snippet"));

            // API 키와 검색어 설정
            search.setKey(apiKey);
            search.setQ(query);

            // 추가 파라미터 설정
            search.setMaxResults((long) maxResults); // 최대 검색 결과 개수

            // API 요청 및 응답 처리
            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();

            List<SleepVideoResponseDTO> videos = new ArrayList<>();
            if (searchResultList != null && !searchResultList.isEmpty()) {
                for (SearchResult searchResult : searchResultList) {
                    String videoId = searchResult.getId().getVideoId();
                    String videoTitle = searchResult.getSnippet().getTitle();
                    String channelTitle = searchResult.getSnippet().getChannelTitle();
                    String description = searchResult.getSnippet().getDescription();
                    String url = "https://www.youtube.com/watch?v=" + videoId;

                    videos.add(new SleepVideoResponseDTO(videoTitle, videoId, channelTitle, description, url));
                }
            }

            return videos;

        } catch (IOException e) {
            return Collections.emptyList();
        }
    }
}
