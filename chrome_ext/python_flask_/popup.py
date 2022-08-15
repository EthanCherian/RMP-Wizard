# to avoid creating __pycache__ folder that chrome extension doesn't accept due to __ 
# in the beginning
import sys

sys.dont_write_bytecode = True


from bs4 import BeautifulSoup
import pickle
import json
from flask import request
from flask import Flask, render_template
from flask_cors import CORS
from joblib import dump, load
import re
import pandas as pd
from sklearn.metrics import accuracy_score, f1_score


# import sys

# sys.dont_write_bytecode = True

model = load("NB-model.joblib")
cv = load("NB-vectorizer.joblib")
percbest = load("NB-chi2.joblib")
output = []

def basicPreproc(comments: list):
    comments_proper = []

    for review in comments:
        review = re.sub('&([a-zA-z]+|#\d+);', "", review)           # remove HTML codes
        review = re.sub('&#63;?', '', review)                       # HTML code for question mark evades erasure on occasion, handle here
        review = re.sub(r'\s*https?://\S+(\s+|$)', ' ', review)                                     # remove links
        review = re.sub("^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", ' ', review)         # remove phone numbers
        review = re.sub("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", " ", review)              # remove email addresses

        review = re.sub(r'(.)\1\1+', '\g<1>', review)               # replace any three characters in a row with one

        review = re.sub('[^a-zA-Z]+', ' ', review)                  # remove non-alphabetic characters

        review = re.sub('\s+', ' ', review)
        review = review.lower()                                     # lowercase review for uniformity

        comments_proper.append(review)

    return comments_proper


def getPreds(comments: list):
    preds = []

    for review in comments:
        pred = model.predict(percbest.transform(cv.transform([review])))
        preds.append(pred[0])       # model.predict() returns a list, so isolate individual value
    
    return preds

def appendResults(docs: list, preds:list, sentimentStrings:list):
    # now with fancy text coloring (works best in dark mode)
    for comm, pred in zip(docs, preds):
        # print("\033[2;32mComment: \033[0;37m{0}".format(comm))
        
        if pred == 0:
            # print("\033[0;31mSentiment: \033[0;31m{0}".format(pred))
            sentimentStrings.append("Negative")
        else:
            # print("\033[0;34mSentiment: \033[0;34m{0}".format(pred))
            sentimentStrings.append("Positive")
        
        print()
        
        
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/processAndSend', methods=['POST'])
def processOrSend():
    # print("here")
    
    # if(request.method == 'POST'):
    # print("Incoming")
    
    # Gets the input which is in JSON, converts it into a python array,
    # processes the input, and returns an array saying "Positive" or 
    # "Negative" depending on the sentiment.
    input = request.get_json()
    input = json.loads(input) 
    output.clear()
    
    preproc_comments = basicPreproc(input)
    preds = getPreds(preproc_comments)
    appendResults(input, preds, output)
    # print(output)
    # return 'OK', 200
    
    
    # else:
        # print("Sending")
    result = json.dumps(output)
    return result

    


