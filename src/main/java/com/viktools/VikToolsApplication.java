package com.viktools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * VikTools 主應用程式
 * 多功能工具集合 - 包含加解密、編碼、雜湊、JWT、PlantUML等工具
 */
@SpringBootApplication
public class VikToolsApplication {

    public static void main(String[] args) {
        SpringApplication.run(VikToolsApplication.class, args);
        System.out.println();
        System.out.println("===========================================");
        System.out.println("🚀 VikTools 已啟動！");
        System.out.println("📱 訪問地址: http://localhost:8080");
        System.out.println("📚 API 文件: http://localhost:8080/swagger-ui.html");
        System.out.println("===========================================");
        System.out.println();
    }
}