package com.example.backend.global.scheduler;

import com.example.backend.domain.common.redis.service.RedisService;
import com.example.backend.domain.payment.Payment;
import com.example.backend.domain.payment.repository.PaymentRepository;
import com.example.backend.domain.popular.entity.Popular;
import com.example.backend.domain.popular.repository.PopularRepository;
import com.example.backend.domain.portfolio.dto.KakaoPlaceSearchResponseDto;
import com.example.backend.domain.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PopularScheduler {

    private final RedisService redisService;
    private final PaymentRepository paymentRepository;
    private final PortfolioService portfolioService;
    private final PopularRepository popularRepository;

    //    @Scheduled(cron = "0 * * * * *")
    @Scheduled(cron = "1 0 0 * * *")
    public void savePopularCount() {
        // 1. redis에서 결제내역 아이디 가져오기
        // 2. 해당 결제내역 아이디 이후 값들만 가져오기
        // 3. 상호명이 있는 가게라면 불러와서 카운트만 바꾸기
        // 3-1. 상호명이 처음인 가게라면
        // 4. 가져온 결제내역의 상호명으로 카카오 지도 api 호출하기
        // 5. 좌표와 카테고리 가져오기
        // 6. 상호명이 처음인 가게라면 save
        List<String> category = Arrays.asList("음식점", "교통,수송", "스포츠,레저", "관광지", "숙박", "의료,건강");
        long updatePopularByPaymentId = Long.parseLong(redisService.getValues("updatePopularByPaymentId")
                .orElse("0"));

        List<Payment> payments = paymentRepository.findAfterId(updatePopularByPaymentId);
        for (Payment payment : payments) {
            popularRepository.findByStoreName(payment.getStoreName())
                    .ifPresentOrElse(
                            popular -> {
                                popular.addCount();
                                popularRepository.save(popular);
                            },
                            () -> {
                                KakaoPlaceSearchResponseDto.Document document = portfolioService.findLocation(payment.getStoreName()).block().getDocuments().get(0);
                                System.out.println("document.getX() = " + document.getX());
                                System.out.println("document.getY() = " + document.getY());
                                GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
                                Coordinate coordinate = new Coordinate(document.getX(), document.getY());
                                Point point = geometryFactory.createPoint(coordinate);
                                String[] splitCategory = document.getCategory_name().split(">");
                                String categoryName = splitCategory[0].trim();
                                if (categoryName.equals("여행")) {
                                    if (splitCategory[1] != null && splitCategory[1].trim().equals("숙박")) {
                                        categoryName = "숙박";
                                    } else {
                                        categoryName = "관광지";
                                    }
                                }
                                if (!category.contains(categoryName)) categoryName = "기타";
                                popularRepository.save(Popular.toEntity(payment.getStoreName(), categoryName, point));
                            }
                    );
            updatePopularByPaymentId = Math.max(updatePopularByPaymentId, payment.getId());
        }

        redisService.setValues(86500, "updatePopularByPaymentId", String.valueOf(updatePopularByPaymentId));
    }
}
