import re

pattern = r"^app\.(get|put|post|delete)"

routes = {}

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

        routes.setdefault(req, []).append(url)


for req, urls in routes.items():
    print(f"{req.upper()}:")
    print("-" * 64)
    print(f"{"\n".join(urls)}\n")
