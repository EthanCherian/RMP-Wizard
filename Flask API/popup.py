# to avoid creating __pycache__ folder that chrome extension doesn't accept due to __ 
# in the beginning
from concurrent.futures import process
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
import matplotlib.pyplot as plt
from nltk import FreqDist
from sklearn.metrics import accuracy_score, f1_score
from sklearn.base import BaseEstimator, TransformerMixin
from preproc import Preproc
import corpora
import math


sent_pipe = load("final-LR-pipe.joblib")
output = []

preproc = sent_pipe["preprocessor"]
vec = sent_pipe["vectorizer"]
sel = sent_pipe["selector"]
model = sent_pipe["classifier"]

    
support = sel.get_support()

scored_words = zip(model.coef_[0], vec.get_feature_names_out()[support])

score_mapping = {}

for coef, word in scored_words:
    score_mapping.update({word: (pow(math.e, -coef), pow(math.e, coef))})       # negative, then positive


def getIndices(comms: list, all_feats: list):
    all_locs = []
    for comm, feats in zip(comms, all_feats):
        locs = []
        for feat in feats:
            loc = comm.find(feat)
            length = len(feat)
            locs.append((loc, loc+length))
        all_locs.append(locs)
    
    return all_locs


def appendResults(docs: list, probs:list, sentimentStrings:list):
    # now with fancy text coloring (works best in dark mode)
    sentiments = []
    probsPerSentiment = []
    for comm, prob in zip(docs, probs):
        print("\033[2;32mComment: \033[0;37m{0}".format(comm))
        
            # print("\033[0;31mSentiment: \033[0;31m{0}".format(pred))
        if(prob[1] > 0.5):
            sentiments.append("Positive")
        else:
            sentiments.append("Negative")
            
        conf = round(prob[1] * 100)
        if(conf == 100):
            conf = 99
        probsPerSentiment.append(int(conf))
        print("\t\033[0;35mConfidence:\033[1;35m %0.5f%%" % (prob[1] * 100))
       
        print()
        
    sentimentStrings.append(sentiments)
    sentimentStrings.append(probsPerSentiment)
    
    # print(sentimentStrings)
    
   

def combineNGrams(features: list):
    return [" ".join(feat) for feat in features]

def getImportantFeatures(docs: pd.DataFrame, n=5):      # only pass in single comment at a time
    # PREREQ: pipeline called pipe and (at least) preprocessor split from pipe and called preproc
    #         score_mapping created
    all_imp_feats = []
    all_sentiments = sent_pipe.predict(docs)             # will need comment's sentiment later
    preproc_comms = preproc.preproc(docs)           # preprocess comment, split to ensure ngrams work nicely

    for i in range(len(docs.index)):
        sentiment = all_sentiments[i]
        new_comm = preproc_comms[i].split()

        feats_uni = list(nltk.ngrams(new_comm, 1))      # obtain all unigrams, bigrams, and trigrams in comment (as list)
        feats_bi  = list(nltk.ngrams(new_comm, 2))
        feats_tri = list(nltk.ngrams(new_comm, 3))

        # combine all ngrams, then combine into a single list
        all_feats = combineNGrams(feats_uni) + combineNGrams(feats_bi) + combineNGrams(feats_tri)

        comm_scores = {}        # dictionary holding scores of all features in comment
        for feat in all_feats:
            score = score_mapping.get(feat)
            
            if score == None:                       # feature not found, default to impossible value
                score = -1
            else:
                score = score[sentiment]            # get positive score if sentiment is positive, negative if negative
            
            comm_scores[feat] = score
        
        vals = list(comm_scores.values())
        most_imp_vals = sorted(vals, reverse=True)[:n]          # get highest scores (values from dictionary)

        keys = list(comm_scores.keys())
        # most_imp_feats = []
        # for val in most_imp_vals:
        #     most_imp_feats.append(keys[vals.index(val)])        # get corresponding feature names (keys from dictionary)
        most_imp_feats = [keys[vals.index(val)] for val in most_imp_vals]
        
        all_imp_feats.append(most_imp_feats)
        
    return all_imp_feats

   
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
    # preds = sent_pipe.predict(preproc_comments)
    probs = sent_pipe.predict_proba(preproc_comments)          # probs is a list of lists, shown below for clarity
    appendResults(input, probs, output)
    
    # freq_ngrams(preproc_comments['comment'])
    processedComms = preproc.preproc(preproc_comments)
    freq_ngrams(processedComms, n=2)
    
    featuresByComment = getImportantFeatures(preproc_comments, 10)
    
    output.append(processedComms)
    output.append(featuresByComment)
    
    # getFeatureLocs = getIndices(processedComms, featuresByComment)
    # print(getFeatureLocs)

    # output.append(getFeatureLocs)
    

    print("in regular processOrSend")
    # print(output)
    # return 'OK', 200

    result = json.dumps(output)
    output.clear()
    return result

    
