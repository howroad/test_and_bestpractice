@echo off
Setlocal enabledelayedexpansion
:N
::用户录入正确的目录后，跳转到处理过程
set svnPath=D:\TortoiseSVN\bin
set exeName=TortoiseProc.exe
set projectPath=%~dp0
goto Y
:Y
echo 数据处理中
::使用for循环从 dir 获取到字符串中获取文件夹名字
:: dir /ad-s/b 表示只取目录，并且不是系统文件夹，使用空格模式显示
for /f "delims=" %%i in ('"dir /ad-s/b "') do (
echo 正在查询文件【%%i】是否包含svn信息
::判断是否是svn文件夹
if exist "%~dp0%%i\.svn\" (
echo 正在更新项目 %%i
::调用更新命令
cd %projectPath%\%%i
svn upgrade
svn update)
)
echo 更新完成
pause

