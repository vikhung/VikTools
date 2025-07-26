/**
 * VikTools - 主要 JavaScript 功能
 * 處理頁籤切換和工具功能
 */

// 頁籤切換功能
function showTab(tabName) {
    // 隱藏所有頁籤內容
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 移除所有按鈕的 active 狀態
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 顯示選中的頁籤
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // 設置按鈕為 active 狀態
    const selectedButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// JWT 子頁籤切換
function showJWTTab(tabName) {
    // 隱藏所有 JWT 頁籤內容
    const jwtTabContents = document.querySelectorAll('.jwt-tab-content');
    jwtTabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 移除所有 JWT 按鈕的 active 狀態
    const jwtTabButtons = document.querySelectorAll('.jwt-tab-btn');
    jwtTabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 顯示選中的 JWT 頁籤
    const selectedJWTTab = document.getElementById(`jwt-${tabName}`);
    if (selectedJWTTab) {
        selectedJWTTab.classList.add('active');
    }

    // 設置按鈕為 active 狀態
    const selectedJWTButton = document.querySelector(`[onclick="showJWTTab('${tabName}')"]`);
    if (selectedJWTButton) {
        selectedJWTButton.classList.add('active');
    }
}

// 複製到剪貼板功能
async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        await navigator.clipboard.writeText(element.value);
        showMessage('已複製到剪貼板！', 'success');
    } catch (err) {
        // 備用方法
        element.select();
        element.setSelectionRange(0, 99999);
        document.execCommand('copy');
        showMessage('已複製到剪貼板！', 'success');
    }
}

// 顯示訊息
function showMessage(message, type = 'info') {
    // 移除現有訊息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 創建新訊息
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // 插入到頁面頂部
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);

    // 3秒後自動移除
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// =========================
// 加解密工具功能 (前端模擬)
// =========================

function encrypt() {
    const input = document.getElementById('crypto-input').value;
    const algorithm = document.getElementById('crypto-algorithm').value;
    const key = document.getElementById('crypto-key').value;
    const output = document.getElementById('crypto-output');

    if (!input.trim()) {
        showMessage('請輸入要加密的文字', 'error');
        return;
    }

    if (!key.trim()) {
        showMessage('請輸入密鑰', 'error');
        return;
    }

    // 前端模擬加密 (實際應該調用後端 API)
    try {
        const encrypted = btoa(unescape(encodeURIComponent(input + '_' + key + '_' + algorithm)));
        output.value = encrypted;
        showMessage('加密成功！', 'success');
    } catch (error) {
        showMessage('加密失敗：' + error.message, 'error');
    }
}

function decrypt() {
    const input = document.getElementById('crypto-input').value;
    const key = document.getElementById('crypto-key').value;
    const output = document.getElementById('crypto-output');

    if (!input.trim()) {
        showMessage('請輸入要解密的文字', 'error');
        return;
    }

    if (!key.trim()) {
        showMessage('請輸入密鑰', 'error');
        return;
    }

    // 前端模擬解密 (實際應該調用後端 API)
    try {
        const decrypted = decodeURIComponent(escape(atob(input)));
        const parts = decrypted.split('_');
        if (parts.length >= 3) {
            output.value = parts[0];
            showMessage('解密成功！', 'success');
        } else {
            throw new Error('無效的加密數據');
        }
    } catch (error) {
        showMessage('解密失敗：' + error.message, 'error');
    }
}

// =========================
// 編碼工具功能
// =========================

function encode() {
    const input = document.getElementById('encoding-input').value;
    const type = document.getElementById('encoding-type').value;
    const output = document.getElementById('encoding-output');

    if (!input.trim()) {
        showMessage('請輸入要編碼的文字', 'error');
        return;
    }

    try {
        let encoded;
        switch (type) {
            case 'base64':
                encoded = btoa(unescape(encodeURIComponent(input)));
                break;
            case 'url':
                encoded = encodeURIComponent(input);
                break;
            case 'html':
                encoded = input.replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/"/g, '&quot;')
                              .replace(/'/g, '&#39;');
                break;
            case 'hex':
                encoded = Array.from(input)
                             .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
                             .join('');
                break;
            default:
                throw new Error('不支援的編碼類型');
        }
        output.value = encoded;
        showMessage('編碼成功！', 'success');
    } catch (error) {
        showMessage('編碼失敗：' + error.message, 'error');
    }
}

function decode() {
    const input = document.getElementById('encoding-input').value;
    const type = document.getElementById('encoding-type').value;
    const output = document.getElementById('encoding-output');

    if (!input.trim()) {
        showMessage('請輸入要解碼的文字', 'error');
        return;
    }

    try {
        let decoded;
        switch (type) {
            case 'base64':
                decoded = decodeURIComponent(escape(atob(input)));
                break;
            case 'url':
                decoded = decodeURIComponent(input);
                break;
            case 'html':
                decoded = input.replace(/&amp;/g, '&')
                              .replace(/&lt;/g, '<')
                              .replace(/&gt;/g, '>')
                              .replace(/&quot;/g, '"')
                              .replace(/&#39;/g, "'");
                break;
            case 'hex':
                decoded = input.match(/.{1,2}/g)
                              ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
                              .join('') || '';
                break;
            default:
                throw new Error('不支援的解碼類型');
        }
        output.value = decoded;
        showMessage('解碼成功！', 'success');
    } catch (error) {
        showMessage('解碼失敗：' + error.message, 'error');
    }
}

// =========================
// 雜湊工具功能
// =========================

async function generateHash() {
    const input = document.getElementById('hash-input').value;
    const algorithm = document.getElementById('hash-algorithm').value;
    const output = document.getElementById('hash-output');

    if (!input.trim()) {
        showMessage('請輸入要計算雜湊的文字', 'error');
        return;
    }

    try {
        let hash;
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        switch (algorithm) {
            case 'sha1':
                hash = await crypto.subtle.digest('SHA-1', data);
                break;
            case 'sha256':
                hash = await crypto.subtle.digest('SHA-256', data);
                break;
            case 'sha512':
                hash = await crypto.subtle.digest('SHA-512', data);
                break;
            case 'md5':
                // MD5 需要外部函式庫或後端 API
                showMessage('MD5 功能需要後端 API 支援', 'error');
                return;
            default:
                throw new Error('不支援的雜湊演算法');
        }

        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        output.value = hashHex;
        showMessage('雜湊計算成功！', 'success');
    } catch (error) {
        showMessage('雜湊計算失敗：' + error.message, 'error');
    }
}

// =========================
// JWT 工具功能
// =========================

function generateJWT() {
    const header = document.getElementById('jwt-header').value;
    const payload = document.getElementById('jwt-payload').value;
    const secret = document.getElementById('jwt-secret').value;
    const output = document.getElementById('jwt-output');

    if (!header.trim() || !payload.trim() || !secret.trim()) {
        showMessage('請填寫所有必要欄位', 'error');
        return;
    }

    try {
        // 驗證 JSON 格式
        JSON.parse(header);
        JSON.parse(payload);

        // 前端模擬 JWT 生成 (實際應該調用後端 API)
        const encodedHeader = btoa(header).replace(/=/g, '');
        const encodedPayload = btoa(payload).replace(/=/g, '');
        const signature = btoa(secret + encodedHeader + encodedPayload).replace(/=/g, '').substring(0, 20);
        
        const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
        output.value = jwt;
        showMessage('JWT 生成成功！注意：這是前端模擬，實際應使用後端 API', 'success');
    } catch (error) {
        showMessage('JWT 生成失敗：' + error.message, 'error');
    }
}

function decodeJWT() {
    const token = document.getElementById('jwt-token').value;
    const output = document.getElementById('jwt-output');

    if (!token.trim()) {
        showMessage('請輸入 JWT token', 'error');
        return;
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('無效的 JWT 格式');
        }

        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));

        const result = {
            header: header,
            payload: payload,
            signature: parts[2]
        };

        output.value = JSON.stringify(result, null, 2);
        showMessage('JWT 解碼成功！', 'success');
    } catch (error) {
        showMessage('JWT 解碼失敗：' + error.message, 'error');
    }
}

function verifyJWT() {
    const token = document.getElementById('jwt-token-verify').value;
    const secret = document.getElementById('jwt-secret-verify').value;
    const output = document.getElementById('jwt-output');

    if (!token.trim() || !secret.trim()) {
        showMessage('請輸入 JWT token 和密鑰', 'error');
        return;
    }

    // 前端無法真正驗證 JWT，這需要後端 API
    showMessage('JWT 驗證功能需要後端 API 支援', 'error');
    output.value = 'JWT 驗證功能需要後端 API 支援\n實際開發中應該調用 /api/jwt/verify 端點';
}

// =========================
// PlantUML 工具功能
// =========================

function generateDiagram() {
    const input = document.getElementById('plantuml-input').value;
    const format = document.getElementById('plantuml-format').value;
    const preview = document.getElementById('plantuml-preview');

    if (!input.trim()) {
        showMessage('請輸入 PlantUML 語法', 'error');
        return;
    }

    // 前端無法直接生成 PlantUML 圖，需要後端 API
    preview.innerHTML = `
        <div class="placeholder">
            <i class="fas fa-image" style="font-size: 3rem; color: #ccc; margin-bottom: 10px;"></i>
            <p>PlantUML 圖表生成需要後端 API 支援</p>
            <p>輸入的語法：</p>
            <pre style="text-align: left; background: #f8f9fa; padding: 10px; border-radius: 5px;">${input}</pre>
            <p>格式：${format.toUpperCase()}</p>
        </div>
    `;
    
    showMessage('圖表生成功能需要後端 API 支援', 'error');
}

function downloadDiagram() {
    showMessage('下載功能需要後端 API 支援', 'error');
}

// =========================
// 頁面載入完成後的初始化
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // 設置預設 JWT header
    const jwtHeader = document.getElementById('jwt-header');
    if (jwtHeader && !jwtHeader.value) {
        jwtHeader.value = JSON.stringify({
            "alg": "HS256",
            "typ": "JWT"
        }, null, 2);
    }

    // 設置預設 JWT payload
    const jwtPayload = document.getElementById('jwt-payload');
    if (jwtPayload && !jwtPayload.value) {
        jwtPayload.value = JSON.stringify({
            "sub": "user123",
            "name": "User Name",
            "iat": Math.floor(Date.now() / 1000)
        }, null, 2);
    }

    // 設置預設 PlantUML 內容
    const plantumlInput = document.getElementById('plantuml-input');
    if (plantumlInput && !plantumlInput.value) {
        plantumlInput.value = `@startuml
Alice -> Bob: Hello
Bob -> Alice: Hi there!
Alice -> Bob: How are you?
Bob -> Alice: I'm fine, thanks!
@enduml`;
    }

    console.log('VikTools 已載入完成！');
});