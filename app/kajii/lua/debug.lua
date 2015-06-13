f = loadfile("hello.lua")
local flag, ret = pcall(f)
if not flag then
print("HTTP/1.1 500 Internal Server Error\n\n")
print("<pre>")
print("!!! Lua error detected.!!!\n")
print("------------\n")
print(ret)
print("\n------------\n")
print("</pre>")
else
print("<!-- OK -->")
end