package com.example.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS")
                .allowedHeaders("User-Content", "Content-Type")
                .exposedHeaders("Content-Type") // 서버가 클라이언트로 보내고, 브라우저가 접근 가능하게 할 response 헤더를 설정
                .allowCredentials(true)
                .maxAge(3600); // preflight request를 3600초동안 캐시하도록 설정
    }
}
