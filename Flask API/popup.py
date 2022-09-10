# to avoid creating __pycache__ folder that chrome extension doesn't accept due to __ 
# in the beginning
import sys

sys.dont_write_bytecode = True


from bs4 import BeautifulSoup
import pickle
from pickle import load
import json
from flask import request
from flask import Flask, render_template
from flask_cors import CORS
from joblib import dump, load
import re
import pandas as pd
import nltk
from nltk import FreqDist
from preproc import Preproc
import corpora


sent_pipe = load("final-LR-pipe.joblib")
output = []


def appendResults(docs: list, preds:list, probs:list, sentimentStrings:list):
    # now with fancy text coloring (works best in dark mode)
    sentiments = []
    probsPerSentiment = []
    for comm, pred, prob in zip(docs, preds, probs):
#         print("\033[2;32mComment: \033[0;37m{0}".format(comm))
        
        if pred == 0:
#             print("\033[0;31mSentiment: \033[0;31m{0}".format(pred))
            sentiments.append("Negative")
            conf = round(prob[0] * 100)
            if(conf == 100):
                conf = 99
            probsPerSentiment.append(int(conf))
#             print("\t\033[0;35mConfidence:\033[1;35m %0.5f%%" % (prob[0] * 100))
        else:
#             print("\033[0;34mSentiment: \033[0;34m{0}".format(pred))
            sentiments.append("Positive")
            conf = round(prob[1] * 100)
            if(conf == 100):
                conf = 99
            probsPerSentiment.append(int(conf))
#             print("\t\033[0;35mConfidence:\033[1;35m %0.5f%%" % (prob[1] * 100))
        
        print()
        
    sentimentStrings.append(sentiments)
    sentimentStrings.append(probsPerSentiment)
    
#     print(sentimentStrings)
    
    
def freq_ngrams(x, terms=5, n=2):        # function to plot most frequent n-grams
    # all_words = " ".join([text for text in x])
    # all_words = all_words.split()

    fdist = FreqDist()
    for review in x:
        bgs = nltk.ngrams(review.split(), n)
        fdist.update(bgs)

    words_df = pd.DataFrame({"word":list(fdist.keys()), "count":list(fdist.values())})

    d = words_df.nlargest(columns="count", n=terms)
    
    words = d['word'].tolist()
    counts = d['count'].tolist()
    
    # print(words)
    # print(counts)
    output.append(words)
    output.append(counts)
    
        
        
app = Flask(__name__)
CORS(app)

# @app.route('/')
# def index():
#     return render_template('index.html')


@app.route('/processAndSend', methods=['POST'])
def processOrSend():
    # Gets the input which is in JSON, converts it into a python array,
    # processes the input, and returns an array saying "Positive" or 
    # "Negative" depending on the sentiment.
    input = request.get_json()
    input = json.loads(input) 
    print(input)
    
    output.clear()
    
    if(len(input) == 0):
        return json.dumps(output)
    
    preproc_comments = pd.DataFrame(input, columns=["comment", "firstName", "lastName"])
    preds = sent_pipe.predict(preproc_comments)
    probs = sent_pipe.predict_proba(preproc_comments)          # probs is a list of lists, shown below for clarity
    appendResults(input, preds, probs, output)
    
    # freq_ngrams(preproc_comments['comment'])
    preproc = sent_pipe["preprocessor"]
    temp = preproc.preproc(preproc_comments)
    freq_ngrams(temp, n=2)

    print("in regular processOrSend")
    # return 'OK', 200

    result = json.dumps(output)
    output.clear()
    return result

    
@app.route('/processAndSendTemp', methods=['POST'])
def processOrSendTemp():
    # print("here")
    
    # if(request.method == 'POST'):
    # print("Incoming")
    
    # Gets the input which is in JSON, converts it into a python array,
    # processes the input, and returns an array saying "Positive" or 
    # "Negative" depending on the sentiment.
    input = request.get_json()
    input = json.loads(input) 
    
    output.clear()
    
    if(len(input) == 0):
        return json.dumps(output)
    
    preproc_comments = pd.DataFrame(input, columns=["comment", "firstName", "lastName"])
    preds = sent_pipe.predict(preproc_comments)
    probs = sent_pipe.predict_proba(preproc_comments)          # probs is a list of lists, shown below for clarity
    appendResults(input, preds, probs, output)

    preproc = sent_pipe["preprocessor"]
    temp = preproc.preproc(preproc_comments)
 
    result = json.dumps(output)
    output.clear()
    return result

    

