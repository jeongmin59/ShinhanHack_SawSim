package com.example.backend.domain.common.redis.controller;

import com.example.backend.domain.common.redis.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Set;

@Controller
public class RedisController {

    @Autowired
    RedisService redisService;

    @RequestMapping(value = "/redis/test/setString")
    @ResponseBody
    public void setValue(String testKey, String testValue) {
//        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        redisService.setValues(testKey, testValue);
    }

    @RequestMapping(value = "/redis/test/getString")
    @ResponseBody
    public String getValue(String testKey){
        return redisService.getValues(testKey);
    }

    @RequestMapping(value = "/redis/test/setSets")
    @ResponseBody
    public void setSets(String testKey, String... testValues){
        redisService.setSets(testKey, testValues);
    }

    @RequestMapping(value = "/redis/test/getSets")
    @ResponseBody
    public Set getSets(String key){
        return redisService.getSets(key);
    }
}
