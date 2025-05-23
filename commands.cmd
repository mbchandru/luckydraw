EM Inside a .bat file:
del /s /q %localappdata%\Temp\metro-cache\*"
for /d %%a in ("%localappdata%\Temp\metro-cache\*") do rmdir /s /q "%%a"


npx expo start --port=8082 --clear --reset-cache --tunnel
