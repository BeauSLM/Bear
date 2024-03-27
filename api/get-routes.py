import re

pattern = r"^app\.(get|put|post|delete)"

with open('main.js', 'r') as file:
    lines = file.readlines()
    for ix, line in enumerate(lines):
        if not re.search(pattern, line): continue
        line = line.strip()

        req = line.split('app.')[1].split('(')[0]

        if line.find("\"") == -1:
            target = lines[ix + 1].strip()
        else:
            target = line

        url = target.split("\"")[1]

        print(f"{req.upper():<7}{url}")
