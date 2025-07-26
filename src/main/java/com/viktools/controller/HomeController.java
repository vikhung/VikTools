package com.viktools.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 首頁控制器
 * 負責處理主頁面路由
 */
@Controller
public class HomeController {

    /**
     * 顯示首頁
     * @return 首頁模板
     */
    @GetMapping("/")
    public String index() {
        return "index";
    }

    /**
     * 健康檢查端點
     * @return 健康狀態頁面
     */
    @GetMapping("/health")
    public String health() {
        return "health";
    }
}