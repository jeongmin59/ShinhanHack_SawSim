package com.example.backend.domain.common.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.BoundHashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final StringRedisTemplate redisTemplate;

    public String getValues(String key) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(key);
    }

    public void setValues(long timeout, String key, String value) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, value, timeout, TimeUnit.SECONDS);
    }

    public void setHash(long timeout, String key, Map<String, String> map) {
        BoundHashOperations<String, String, String> boundHashOperations = redisTemplate.boundHashOps(key);
        boundHashOperations.putAll(map);
        boundHashOperations.expire(timeout, TimeUnit.SECONDS);
    }

    public void setHash(String key, Map<String, String> map) {
        BoundHashOperations<String, String, String> boundHashOperations = redisTemplate.boundHashOps(key);
        boundHashOperations.putAll(map);
    }

    public Map<Object, Object> getHash(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
}
