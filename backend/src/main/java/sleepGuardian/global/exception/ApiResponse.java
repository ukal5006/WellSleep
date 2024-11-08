package sleepGuardian.global.exception;

import lombok.Builder;
import lombok.Getter;

/**
 * [공통] API Response 결과의 반환 값을 관리
 */
@Getter
public class ApiResponse<T> {

    // API 응답 결과 Response
    private T result;

    // API 응답 코드 Response
    private int resultCode;

    // API 응답 코드 Message
    private String resultMsg;

    @Builder
    public ApiResponse(final T result, final int resultCode, final String resultMsg) {
        this.result = result;
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

    // 성공 응답을 쉽게 생성할 수 있는 메서드
    public static <T> ApiResponse<T> success(T result, SuccessCode code) {
        return ApiResponse.<T>builder()
                .result(result)
                .resultCode(code.getStatus())
                .resultMsg(code.getMessage())
                .build();
    }

    // 에러 응답을 쉽게 생성할 수 있는 메서드
    public static <T> ApiResponse<T> error(ErrorCode code, String errorMsg) {
        return ApiResponse.<T>builder()
                .result(null)
                .resultCode(code.getStatus())
                .resultMsg(errorMsg != null ? errorMsg : code.getMessage())
                .build();
    }
}