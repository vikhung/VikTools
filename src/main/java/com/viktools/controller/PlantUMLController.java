package com.viktools.controller;

import com.viktools.service.PlantUMLService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * PlantUML 控制器
 * 負責處理 PlantUML 圖表生成的 API 請求
 */
@Controller
@RequestMapping("/plantuml")
@RequiredArgsConstructor
public class PlantUMLController {

    private final PlantUMLService plantUMLService;

    /**
     * 顯示 PlantUML 頁面
     * @return PlantUML 模板頁面
     */
    @GetMapping
    public String plantUMLPage() {
        return "plantuml";
    }

    /**
     * 生成 PlantUML 圖表（PNG 格式）
     * @param plantUMLCode PlantUML 語法代碼
     * @return PNG 圖片的 ResponseEntity
     */
    @PostMapping(value = "/generate/png", produces = MediaType.IMAGE_PNG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> generatePNG(@RequestBody String plantUMLCode) {
        try {
            byte[] imageBytes = plantUMLService.generatePNG(plantUMLCode);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(imageBytes.length);
            
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 生成 PlantUML 圖表（SVG 格式）
     * @param plantUMLCode PlantUML 語法代碼
     * @return SVG 圖片的 ResponseEntity
     */
    @PostMapping(value = "/generate/svg", produces = "image/svg+xml")
    @ResponseBody
    public ResponseEntity<String> generateSVG(@RequestBody String plantUMLCode) {
        try {
            String svgContent = plantUMLService.generateSVG(plantUMLCode);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("image/svg+xml"));
            
            return new ResponseEntity<>(svgContent, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 驗證 PlantUML 語法
     * @param plantUMLCode PlantUML 語法代碼
     * @return 驗證結果的 ResponseEntity
     */
    @PostMapping(value = "/validate", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> validateSyntax(@RequestBody String plantUMLCode) {
        try {
            boolean isValid = plantUMLService.validateSyntax(plantUMLCode);
            String result = "{\"valid\": " + isValid + "}";
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            String result = "{\"valid\": false, \"error\": \"" + e.getMessage() + "\"}";
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}