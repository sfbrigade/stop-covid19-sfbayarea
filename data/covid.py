import json
import csv
import requests
from io import StringIO

# get data from google doc
link = "https://docs.google.com/spreadsheets/d/1_wBXS62S5oBQrwetGc8_-dFvDjEmNqzqHwUeP-DzkYs/export?format=csv&id=1_wBXS62S5oBQrwetGc8_-dFvDjEmNqzqHwUeP-DzkYs&gid=1318925039"
response = requests.get(link)

# convert from csv into python list objects
output = []
stream = StringIO(response.text)  #turned csv content into sting python can treat like a file
reader = csv.reader(stream)
Qobj = {}
for row in reader:
    rowtype = row[0]
    rowval = row[1]
    if rowtype == "Q":
        output.append(Qobj)
        Qobj = {}
        Qobj["Q"] = rowval
    elif rowtype == "A":
        Qobj["A"] = rowval
    elif rowtype == "link":
        Qobj["link"] = rowval

# convert into properly formatted json
with open ("output.json", "w") as f:
    json.dump(output, f, indent=2)

