package sleepGuardian.domain.totalInformation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordResultDTO;
import sleepGuardian.domain.sleepRecord.entity.SleepRecord;
import sleepGuardian.domain.sleepRecord.repository.SleepRecordRepository;
import sleepGuardian.domain.sleepRecord.service.SleepRecordService;
import sleepGuardian.domain.sleepTime.entity.SleepTime;
import sleepGuardian.domain.sleepTime.repository.SleepTimeRepository;
import sleepGuardian.domain.totalInformation.dto.*;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TotalInformationService {

    private final UserRepository userRepository;
    private final TotalInformationRepository totalInformationRepository;
    private final SleepRecordService sleepRecordService;
    private final SleepRecordRepository sleepRecordRepository;
    private final SleepTimeRepository sleepTimeRepository;

    public int startSleep(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보가 잘못되었습니다"));
        TotalInformation totalInformation = new TotalInformation(user);
        System.out.println(totalInformation);
        totalInformationRepository.save(totalInformation);
        return totalInformation.getId();
    }

    // 알코올, 카페인 기록 조회
    public SleepImpactResponseDTO getSleepImpact(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 수면정보가 존재하지 않습니다."));

        return new SleepImpactResponseDTO(totalInfo.getId(), totalInfo.getAlcoholIntake(), totalInfo.getCaffeineIntake());
    }

    // 알코올, 카페인 기록 저장
    public int saveSleepImpact(SleepImpactRequestDTO dto) {
        TotalInformation totalInfo = totalInformationRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        totalInfo.setSleepImpact(dto.getAlcoholIntake(), dto.getCaffeineIntake());
        return totalInformationRepository.save(totalInfo).getId();
    }

    // 수면 기록 가공
    private SleepSolutionRequestDTO getSleepData(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 수면정보가 존재하지 않습니다."));
        double avg = totalInfo.getAvg();
        int realSleepTime = totalInfo.getRealSleepTime();
        int caffeineIntake = totalInfo.getCaffeineIntake();
        int alcoholIntake = totalInfo.getAlcoholIntake();

        SleepTime sleepTimeInfo = sleepTimeRepository.findByTotalInformationId(totalInformationId);
        int noSleepTime = sleepTimeInfo.getNoSleepTime();
        int shallowSleepTime = sleepTimeInfo.getShallowSleepTime();
        int deepSleepTime = sleepTimeInfo.getDeepSleepTime();
        int remSleepTime = sleepTimeInfo.getRemSleepTime();

        List<SleepRecord> sleepRecords = sleepRecordRepository.findAllByTotalInformationId(totalInformationId);

        double totalHumidity = 0;
        double totalTemperature = 0;
        double totalIllumination = 0;
        double totalNoise = 0;
        int count = sleepRecords.size();

        for (SleepRecord record : sleepRecords) {
            totalHumidity += record.getHumidity();
            totalTemperature += record.getTemperature();
            totalIllumination += record.getIllumination();
            totalNoise += record.getNoise();
        }

        totalHumidity /= count;
        totalTemperature /= count;
        totalIllumination /= count;
        totalNoise /= count;

        return new SleepSolutionRequestDTO(
                avg,
                realSleepTime,
                noSleepTime,
                shallowSleepTime,
                deepSleepTime,
                remSleepTime,
                totalHumidity,
                totalTemperature,
                totalIllumination,
                totalNoise,
                caffeineIntake,
                alcoholIntake
        );
    }

    // 수면 솔루션 저장
    public String generateSolution(int totalInformationId, SleepSolutionRequestDTO sleepSolutionRequestDTO) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        double avgScore = totalInfo.getAvg();
        int realSleepTime = totalInfo.getRealSleepTime();
        int noSleepTime = sleepSolutionRequestDTO.getNoSleepTime();
        int shallowSleepTime = sleepSolutionRequestDTO.getShallowSleepTime();
        int deepSleepTime = sleepSolutionRequestDTO.getDeepSleepTime();
        int remSleepTime = sleepSolutionRequestDTO.getRemSleepTime();

        double illumination = sleepSolutionRequestDTO.getIllumination();
        double humidity = sleepSolutionRequestDTO.getHumidity();
        double temperature = sleepSolutionRequestDTO.getTemperature();
        double noise = sleepSolutionRequestDTO.getNoise();
        int caffeineIntake = sleepSolutionRequestDTO.getCaffeineIntake();
        int alcoholIntake = sleepSolutionRequestDTO.getAlcoholIntake();

        boolean isWellSleep = true; //수면의 질
        boolean isSufficientSleep = true; // 수면의 양
        boolean isEfficiencySleep = true; // 수면의 효율

        // 환경 요소
        boolean isGoodIllumination = true;
        boolean isGoodNoise = true;
        boolean isGoodHumidity = true;
        boolean isGoodTemperature = true;

        // 수면 솔루션 생성
        StringBuilder solution = new StringBuilder();

        // 수면 점수 및 실제 수면 시간 평가
        if (avgScore >= 90 && realSleepTime >= 390 && realSleepTime <= 540) {
            solution.append("수면의 질이 좋고, 적절한 수면 시간입니다. 현재 수면 습관을 유지하세요.");
        } else if (avgScore >= 75) {
            solution.append("수면의 질이 양호합니다. 더 나은 수면 환경을 위해 환경 요소를 확인해보세요.");
        } else if (avgScore >= 60) {
            solution.append("수면의 질이 보통입니다. 충분한 회복을 위해 더 자는 것이 좋습니다.");
        } else {
            solution.append("수면의 질이 낮습니다. 수면 습관과 환경을 개선해보세요.");
        }

        // 실제 수면 시간 평가
        if (realSleepTime > 540) { // 9시간 이상
            solution.append("수면 주기가 깨져 피로감이 증가할 수 있습니다. ");
        } else if (realSleepTime >= 390) { // 6시간 30분 이상 9시간 이하
            solution.append("적절한 수면 시간입니다. ");
        } else { // 6시간 30분 미만
            solution.append("충분한 회복을 위해 더 자는 것이 좋습니다.");
        }

        // 수면 단계 평가 추가
        if (deepSleepTime < 60) {
            solution.append(" 깊은 수면 시간이 부족하니, 일찍 잠자리에 드는 것을 추천합니다.");
        }
        if (remSleepTime < 90) {
            solution.append(" 렘 수면 시간이 부족하니, 수면의 연속성을 높이세요.");
        }
        if (noSleepTime > 30) {
            solution.append(" 수면 중 자주 깼습니다. 스트레스 관리나 환경 개선이 필요합니다.");
        }

        // 환경 요소 평가 추가
        if (illumination > 30) {
            solution.append(" 방을 어둡게 유지하세요.");
        }
        if (humidity < 40 || humidity > 60) {
            solution.append(" 습도를 40-60%로 유지하세요.");
        }
        if (temperature < 18 || temperature > 22) {
            solution.append(" 온도를 18-22°C로 조절하세요.");
        }
        if (noise > 30) {
            solution.append(" 조용한 환경을 만들면 수면의 질이 높아질 수 있습니다.");
        }

        // 카페인 및 알코올 섭취 평가 추가
        if (caffeineIntake > 0) {
            solution.append(" 카페인 섭취가 수면에 영향을 줄 수 있습니다. 잠들기 최소 6시간 전에는 카페인을 피하세요.");
        }
        if (alcoholIntake > 0) {
            solution.append(" 알코올 섭취가 수면 패턴에 영향을 줄 수 있습니다. 더 나은 수면을 위해 취침 전 음주를 삼가세요.");
        }

        // SleepSolutionResponseDTO 생성 및 반환
        return solution.toString();
    }

    // 수면 솔루션 제공
    public SleepSolutionResponseDTO getSolutionInfo(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 수면 정보 ID입니다."));

        SleepSolutionRequestDTO sleepDataDTO = getSleepData(totalInformationId);
        String solution = totalInfo.getSolution();
        return new SleepSolutionResponseDTO(
                totalInformationId,
                sleepDataDTO.getIllumination(),
                sleepDataDTO.getNoise(),
                sleepDataDTO.getHumidity(),
                sleepDataDTO.getTemperature(),
                solution
        );
    }


    public void endSleep(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        LocalDateTime date = LocalDateTime.now();
        LocalDateTime endTime = LocalDateTime.now(); //수면 측정 완료 시각
        System.out.println("레디스 접근?? 전");
        SleepRecordResultDTO sleepRecord = sleepRecordService.getSleepRecord(totalInformationId);
        System.out.println("레디스 접근?? 후");

        int sleepTime = sleepRecord.getSleepTime();
        int realSleepTime = sleepRecord.getRealSleepTime();

        LocalDateTime startSleepTime = sleepRecord.getStartSleepTime();
        double avg = sleepRecord.getAvg();
        System.out.println(avg + " " + totalInfo.getStartTime() + " " + startSleepTime);

        if (startSleepTime == null) {
            startSleepTime = endTime;
        }

        totalInfo.setSleepEnd(avg, date, sleepTime, realSleepTime, endTime, startSleepTime);

        SleepSolutionRequestDTO sleepDataDTO = getSleepData(totalInformationId);
        String solution = generateSolution(totalInformationId, sleepDataDTO);
        totalInfo.setSleepSolution(solution);

        totalInformationRepository.save(totalInfo);
    }

    public List<SleepSummariesResponseDTO> getSleepRecords(int userId, String date) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("찾는 유저가 없습니다"));
        List<TotalInformation> allByUserId = totalInformationRepository.findAllByUsers(user);

        List<SleepSummariesResponseDTO> result = new ArrayList<>();

        // "2024-11"에서 연도와 월을 추출
        int year = Integer.parseInt(date.split("-")[0]);
        int month = Integer.parseInt(date.split("-")[1]);

        for (TotalInformation totalInformation : allByUserId) {
            if (totalInformation.getDate().getYear() == year && totalInformation.getDate().getMonthValue() == month) {
                result.add(SleepSummariesResponseDTO.builder()
                        .totalInformationId(totalInformation.getId())
                        .date(totalInformation.getDate().toLocalDate())
                        .avg(totalInformation.getAvg())
                        .sleepTime(totalInformation.getSleepTime())
                        .realSleepTime(totalInformation.getRealSleepTime())
                        .isCaffeine(totalInformation.getCaffeineIntake())
                        .isAlcohol(totalInformation.getAlcoholIntake())
                        .build());
            }
        }

        return result;
    }

    public SleepRecordDetailResponseDTO getSleepRecordDetail(int totalInformationId) {
        TotalInformation totalInformation = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 TotalInformationID"));
        List<SleepRecord> allByTotalInformation = sleepRecordRepository.findAllByTotalInformation(totalInformation);
        SleepTime sleepTimes = sleepTimeRepository.findByTotalInformation(totalInformation);
        // SleepRecord를 SleepRecordDTO로 변환
        List<SleepRecordDetailResponseDTO.SleepRecordDTO> sleepRecordDTOList = new ArrayList<>();
        for (SleepRecord sleepRecord : allByTotalInformation) {
            sleepRecordDTOList.add(SleepRecordDetailResponseDTO.SleepRecordDTO.builder()
                    .measureTime(sleepRecord.getMeasureTime())
                    .illumination(sleepRecord.getIllumination())
                    .humidity(sleepRecord.getHumidity())
                    .temperature(sleepRecord.getTemperature())
                    .noise(sleepRecord.getNoise())
                    .emg(sleepRecord.getEmg())
                    .o2(sleepRecord.getO2())
                    .pulse(sleepRecord.getPulse())
                    .score(sleepRecord.getScore())
                    .build());
        }

        return SleepRecordDetailResponseDTO.builder()
                .date(totalInformation.getDate().toLocalDate())
                .avg(totalInformation.getAvg())
                .sleepTime(totalInformation.getSleepTime())
                .realSleepTime(totalInformation.getRealSleepTime())
                .isCaffeine(totalInformation.getCaffeineIntake())
                .isAlcohol(totalInformation.getAlcoholIntake())
                .startTime(totalInformation.getStartTime())
                .endTime(totalInformation.getEndTime())
                .startSleep(totalInformation.getStartSleepTime())
                .shallowSleepTime(sleepTimes.getShallowSleepTime())
                .deepSleepTime(sleepTimes.getDeepSleepTime())
                .remSleepTime(sleepTimes.getRemSleepTime())
                .noSleepTime(sleepTimes.getNoSleepTime())
                .sleepRecord(sleepRecordDTOList)
                .build();
    }
}