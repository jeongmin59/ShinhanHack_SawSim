package com.example.backend.domain.common.redis.controller;

import com.example.backend.domain.common.exception.ResourceNotFoundException;
import com.example.backend.domain.common.redis.service.RedisService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequestMapping("/api")
@Controller
@Hidden
public class RedisController {

    @Autowired
    RedisService redisService;

    @RequestMapping(value = "/redis/test/setString")
    @ResponseBody
    public void setValue(String testKey, String testValue) {
//        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        redisService.setValues(60, testKey, testValue);
    }

    @RequestMapping(value = "/redis/test/getString")
    @ResponseBody
    public String getValue(String testKey) {
        return redisService.getValues(testKey)
                .orElseThrow(() -> new ResourceNotFoundException("Redis", testKey));
    }

    @RequestMapping(value = "/redis/test/setSets")
    @ResponseBody
    public void setSets(String testKey, String... testValues) {
        Map<String, String> map = Arrays.stream(testValues)
                .collect(Collectors.toMap(Function.identity(), Function.identity()));

        redisService.setHash(60, testKey, map);
    }

    @RequestMapping(value = "/redis/test/getSets")
    @ResponseBody
    public Map<Object, Object> getHash(String key) {
        return redisService.getHash(key);
    }
}
