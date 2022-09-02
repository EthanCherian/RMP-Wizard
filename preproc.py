import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
import corpora
import re

# https://towardsdatascience.com/pipelines-custom-transformers-in-scikit-learn-the-step-by-step-guide-with-python-code-4a7d9b068156

# helper functions to convert emoticons and expand contractions using large dictionaries (defined in corpora.py)
def convert_emoticons(text):
    return corpora.EMOTICONS.get(text, text)

def expand_contraction(text):
  return corpora.CONTRACTIONS.get(text, text)

# helper functions to perform simple regex substitutions
def remove_urls(text):
    return re.sub(r'https?://\S+|www\.\S+', ' ', text)

def remove_phones(text):
    return re.sub(r'\d{3}-\d{3}-\d{4}', ' ', text)

def remove_emails(text):
    return re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', ' ', text)

def remove_html_entities(text):
    text = re.sub('&[0-9a-zA-Z#]+;', ' ', text)
    return re.sub('&#63;?', '', text)

def remove_html_tags(text):
    return re.sub('<.{1,6}?>', ' ', text)

# Preprocessing class to be added to pipeline
class Preproc(BaseEstimator, TransformerMixin):
    preproc_comments = []

    def __init__(self):
        pass

    def preproc(self, reviews: pd.DataFrame, sentiment=None):
        comments_proper = []        # final list of properly preprocessed comments
        X_ = reviews.copy()         # don't make changes to original

        for index, review in X_.iterrows():
            comment = review['comment']
            fname = review['firstName'].lower().split(' ')
            lname = review['lastName'].lower().split(' ')
            names = set(fname + lname)

            comment = remove_urls(comment)
            comment = remove_phones(comment)
            comment = remove_emails(comment)
            comment = remove_html_entities(comment)
            comment = remove_html_tags(comment)

            comment_split = comment.split(' ')
            new_comment_split = []
            for i, word in enumerate(comment_split):
                word = convert_emoticons(word)
                word = word.lower()
                word = expand_contraction(word)
                word = re.sub("[^a-zA-Z\s]+", ' ', word)    # replace characters that are not alphabetic, space, or underscore
                word = re.sub(r'(.)\1\1+', '\g<1>', word)   # replace any three character+ sequence with one
                word = re.sub('\s+', ' ', word)
                word = word.strip()                         # trailing whitespace because punctuation replaced by space
                new_comment_split.extend(word.split(' '))

            for course_name in corpora.regex_course_stopwords:
                comment = re.sub(course_name, ' ', comment)
            
            # Remove names from the comment
            for i, word in enumerate(new_comment_split):
                if word in names:
                    new_comment_split[i] = ''               # remove professor first and last name
                else:
                    new_comment_split[i] = corpora.VOCAB.get(word, word)

            comment = ' '.join(new_comment_split)
            comment = re.sub('\s+', ' ', comment)
            comment = comment.strip()

            # get rid of 1 letter words and anywords contained in stopword list
            comment = ' '.join(word for word in comment.split() if len(word) > 1 and word not in corpora.STOPWORDS)

            comments_proper.append(comment)

        self.preproc_comments = comments_proper         # assign instance variable
        return comments_proper
    
    # to be included in sklearn.pipeline.Pipeline, Preproc class must implement both fit and transform methods
    def fit(self, X, y=None):
        # no fitting is ever needed, class is non-dynamic (static?)
        # fit will still be called first before transform
        return self
    
    def transform(self, X, y=None):
        # perform preprocessing and pass onto next step
        return self.preproc(X)