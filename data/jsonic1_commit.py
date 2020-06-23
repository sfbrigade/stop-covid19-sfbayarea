"""
Grabs data from the "FAQ Content" CSV and turns it into nice JSON: a main faq object containing an array of themed Section objects, each Section Object in turn holding an array of Question objects consisting of question, answer and related link/s, as follows:
    [
        {
          "Q": "What are the symptoms of COVID-19?",
          "A": "Symptoms of COVID-19 include coughing and shortness of breath. Additionally, a person showing two or more of the following symptoms may have the virus: fever, repeated shaking with chills, muscle pain, headache, sore throat, new loss of taste or smell.",
          "link": "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
        },
        
    .
    .
    .
    ]
    etc
In addition to its array of Question objects, each Section displays a title and "last updated" date value. For the Python stage of the transition from CSV to JSON we create a hierarchy of nested dictionaries and lists equivalent to the JSON objects and arrays.
"""

import requests
import json
import csv
from io import StringIO
import datetime

# Link to "FAQ Content" CSV
link = "https://docs.google.com/spreadsheets/d/1_wBXS62S5oBQrwetGc8_-dFvDjEmNqzqHwUeP-DzkYs/export?format=csv&id=1_wBXS62S5oBQrwetGc8_-dFvDjEmNqzqHwUeP-DzkYs&gid=1318925039"

# Get the data
response = requests.get(link)
response.raise_for_status()

# Turn text from CSV stream into a file object csv.reader can read
csv_stream = StringIO(response.text)
# Create a reader to iterate over the CSV stream file object
reader = csv.reader(csv_stream)

# ISO8601 format date, to update each time the program runs
date = datetime.datetime.now().strftime("%Y-%m-%d")

# Create the main FAQ dictionary
# Create a list for our Sections
# Place the Sections list inside the main dictionary
faq_dict = {}
sections_list = []
faq_dict["faqItems"] = sections_list

# Get data from the reader object
# Arrange Sections and Questions in a JSON-friendly way
for row in reader:
    rowtype = row[0]   # CSV column delineating Section, Question, Answer or Link
    rowval = row[1]   # Values for the above
    if rowtype == "Section Head":
        section = {}   # Create a dictionary for a Section      
        sections_list.append(section)   # Add new Section to the Sections list
        section["title"] = rowval   # Give the Section its title
        section["lastUpdateAt"] = date   # a "last updated" value
        questions_list = []   # Create a list for Questions
        section["qa"] = questions_list   # add our Questions list to the Section
    if rowtype == "Q":        
        question = {}   # Create new Question object
        question["Q"] = rowval   # the Question's title
        questions_list.append(question)   #append the Question to its given Section
    elif rowtype == "A":   # Now the same for Answers & Links
        question["A"] = rowval
    elif rowtype == "link":
        question["link"] = rowval
    
# create JSON output file
# pass FAQ Content to json and store output in output file
with open ("faq.json", "w") as f:
    json.dump(faq_dict, f, indent=2)