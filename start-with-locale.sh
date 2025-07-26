#!/bin/bash
# 設置中文環境變數並啟動應用
export LANG=zh_TW.UTF-8
export LC_ALL=zh_TW.UTF-8
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8 -Dconsole.encoding=UTF-8"

mvn spring-boot:run