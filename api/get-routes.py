import re

pattern = r"^app\.(get|put|post|delete)"

with open('main.js', 'r') as file:
    for line in file:
        if not re.search(pattern, line): continue
        line = line.strip()

        req = line.split('app.')[1].split('(')[0]
        url = line.split("'")[1]

        print(f"{req.upper():<7}{url}")
