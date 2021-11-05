import js2py

js = """
function escramble_758(){
var a,b,c
a='+1 '
b='84-'
a+='425-'
b+='7450'
c='9'
document.write(a+c+b)
}
escramble_758()
""".replace("document.write", "return ")

result = js2py.eval_js(js)  # executing JavaScript and converting the result to python string 
print(result)