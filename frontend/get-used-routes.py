import subprocess
import re

api_calls = subprocess.check_output([
    "ug",
    "-d",
    "recurse",
    "--format=%O%~",
    r"axios\.(get|put|post|delete)",
]).decode().strip().split('\n')

separators = ['\'', '`', '"']
pattern = '|'.join(map(re.escape, separators))

endpoints = {}
for call in api_calls:
    call = call.strip()
    req = call.split('axios.')[1].split('(')[0]

    url = re.split(pattern, call)[1]

    endpoints.setdefault(req, []).append(url)


for req, urls in endpoints.items():
    print(f"{req.upper()}:")
    print("-" * 64)
    print(f"{"\n".join(urls)}\n")



