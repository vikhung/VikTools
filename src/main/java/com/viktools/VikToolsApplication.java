package com.viktools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * VikTools 主應用程式
 * 多功能工具集合 - 包含加解密、編碼、雜湊、JWT、PlantUML等工具
 */
@SpringBootApplication
public class VikToolsApplication {

    private static final Logger logger = LoggerFactory.getLogger(VikToolsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(VikToolsApplication.class, args);
        logger.info("");
        logger.info("===========================================");
        logger.info("🚀 VikTools 已啟動！");
        logger.info("📱 訪問地址: http://localhost:8080");
        logger.info("📚 API 文件: http://localhost:8080/swagger-ui.html");
        logger.info("===========================================");
        logger.info("");
    }
}