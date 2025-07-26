package com.viktools.service;

import lombok.extern.slf4j.Slf4j;
import net.sourceforge.plantuml.FileFormat;
import net.sourceforge.plantuml.FileFormatOption;
import net.sourceforge.plantuml.SourceStringReader;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * PlantUML 服務類
 * 負責處理 PlantUML 圖表生成的業務邏輯
 */
@Service
@Slf4j
public class PlantUMLService {

    /**
     * 生成 PNG 格式的 PlantUML 圖表
     * @param plantUMLCode PlantUML 語法代碼
     * @return PNG 圖片的字節數組
     * @throws IOException 當圖表生成失敗時拋出異常
     */
    public byte[] generatePNG(String plantUMLCode) throws IOException {
        log.info("開始生成 PNG 格式的 PlantUML 圖表");
        
        if (plantUMLCode == null || plantUMLCode.trim().isEmpty()) {
            throw new IllegalArgumentException("PlantUML 代碼不能為空");
        }

        // 確保代碼以 @startuml 開始和 @enduml 結束
        String processedCode = preprocessPlantUMLCode(plantUMLCode);
        
        SourceStringReader reader = new SourceStringReader(processedCode);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        try {
            // 生成 PNG 格式圖片
            reader.outputImage(outputStream, new FileFormatOption(FileFormat.PNG));
            log.info("PNG 圖表生成成功");
            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("生成 PNG 圖表時發生錯誤", e);
            throw new IOException("無法生成 PlantUML 圖表: " + e.getMessage(), e);
        } finally {
            outputStream.close();
        }
    }

    /**
     * 生成 SVG 格式的 PlantUML 圖表
     * @param plantUMLCode PlantUML 語法代碼
     * @return SVG 圖片的字符串內容
     * @throws IOException 當圖表生成失敗時拋出異常
     */
    public String generateSVG(String plantUMLCode) throws IOException {
        log.info("開始生成 SVG 格式的 PlantUML 圖表");
        
        if (plantUMLCode == null || plantUMLCode.trim().isEmpty()) {
            throw new IllegalArgumentException("PlantUML 代碼不能為空");
        }

        // 確保代碼以 @startuml 開始和 @enduml 結束
        String processedCode = preprocessPlantUMLCode(plantUMLCode);
        
        SourceStringReader reader = new SourceStringReader(processedCode);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        try {
            // 生成 SVG 格式圖片
            reader.outputImage(outputStream, new FileFormatOption(FileFormat.SVG));
            log.info("SVG 圖表生成成功");
            return outputStream.toString(StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("生成 SVG 圖表時發生錯誤", e);
            throw new IOException("無法生成 PlantUML 圖表: " + e.getMessage(), e);
        } finally {
            outputStream.close();
        }
    }

    /**
     * 驗證 PlantUML 語法是否正確
     * @param plantUMLCode PlantUML 語法代碼
     * @return 如果語法正確返回 true，否則返回 false
     */
    public boolean validateSyntax(String plantUMLCode) {
        log.info("開始驗證 PlantUML 語法");
        
        if (plantUMLCode == null || plantUMLCode.trim().isEmpty()) {
            log.warn("PlantUML 代碼為空");
            return false;
        }

        try {
            // 嘗試生成圖表以驗證語法
            String processedCode = preprocessPlantUMLCode(plantUMLCode);
            SourceStringReader reader = new SourceStringReader(processedCode);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            
            reader.outputImage(outputStream, new FileFormatOption(FileFormat.PNG));
            outputStream.close();
            
            log.info("PlantUML 語法驗證通過");
            return true;
        } catch (Exception e) {
            log.warn("PlantUML 語法驗證失敗: {}", e.getMessage());
            return false;
        }
    }

    /**
     * 預處理 PlantUML 代碼，確保格式正確
     * @param plantUMLCode 原始 PlantUML 代碼
     * @return 處理後的 PlantUML 代碼
     */
    private String preprocessPlantUMLCode(String plantUMLCode) {
        String trimmedCode = plantUMLCode.trim();
        
        // 如果代碼沒有以 @startuml 開始，則添加
        if (!trimmedCode.startsWith("@start")) {
            trimmedCode = "@startuml\n" + trimmedCode;
        }
        
        // 如果代碼沒有以 @enduml 結束，則添加
        if (!trimmedCode.endsWith("@enduml")) {
            trimmedCode = trimmedCode + "\n@enduml";
        }
        
        return trimmedCode;
    }
}