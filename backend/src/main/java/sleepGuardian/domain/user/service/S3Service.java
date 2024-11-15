package sleepGuardian.domain.user.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Value("${cloud.aws.s3.url}")
    private String s3Url;

    public List<String> getImages() {
        List<String> imageUrls = new ArrayList<>();
        List<S3ObjectSummary> objects = amazonS3.listObjects(bucketName, "profileImage/").getObjectSummaries();
        for (S3ObjectSummary os : objects) {
            String imageUrl = s3Url + "/" + os.getKey();
            imageUrls.add(imageUrl);
        }
        return imageUrls;
    }
}
