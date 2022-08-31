import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
import re

EMOTICONS = {
    u":‑)":"emopos",
    u":-))":"emopos",
    u":-)))":"emopos",
    u":)":"emopos",
    u":))":"emopos",
    u":)))":"emopos",
    u":-]":"emopos",
    u":]":"emopos",
    u":-3":"emopos",
    u":3":"emopos",
    u":->":"emopos",
    u":>":"emopos",
    u"8-)":"emopos",
    u":-}":"emopos",
    u":}":"emopos",
    u":-)":"emopos",
    u":c)":"emopos",
    u":^)":"emopos",
    u"=]":"emopos",
    u"=)":"emopos",
    u":‑D":"emopos",
    u":D":"emopos",
    u"8‑D":"emopos",
    u"8D":"emopos",
    u"X‑D":"emopos",
    u"XD":"emopos",
    u"=D":"emopos",
    u"=3":"emopos",
    u"B^D":"emopos",
    u":-))":"emopos",
    u":-(":"emoneg",
    u":‑(":"emoneg",
    u":(":"emoneg",
    u":‑c":"emoneg",
    u":c":"emoneg",
    u":‑<":"emoneg",
    u":<":"emoneg",
    u":‑[":"emoneg",
    u":[":"emoneg",
    u":-||":"emoneg",
    u">:[":"emoneg",
    u":{":"emoneg",
    u">:(":"emoneg",
    u":'‑(":"emoneg",
    u":'(":"emoneg",
    u":'‑)":"emopos",
    u":')":"emopos",
    u"D‑':":"emoneg",
    u"D:<":"emoneg",
    u"D:":"emoneg",
    u"D8":"emoneg",
    u"D;":"emoneg",
    u"D=":"emoneg",
    u"DX":"emoneg",
    u";‑)":"emopos",
    u";)":"emopos",
    u"*-)":"emopos",
    u"*)":"emopos",
    u";‑]":"emopos",
    u";]":"emopos",
    u";^)":"emopos",
    u":‑,":"emopos",
    u";D":"emopos",
    u":‑P":"emopos",
    u":P":"emopos",
    u"X‑P":"emopos",
    u"XP":"emopos",
    u":‑Þ":"emopos",
    u":Þ":"emopos",
    u"=p":"emopos",
    u":‑/":"emoneg",
    u":/":"emoneg",
    u":-[.]":"emoneg",
    u">:[(\)]":"emoneg",
    u">:/":"emoneg",
    u":[(\)]":"emoneg",
    u"=/":"emoneg",
    u"=[(\)]":"emoneg",
    u":L":"emoneg",
    u"=L":"emoneg",
    u":‑|":"emoneg",
    u":|":"emoneg",
    u"O:‑)":"emopos",
    u"O:)":"emopos",
    u"0:‑3":"emopos",
    u"0:3":"emopos",
    u"0:‑)":"emopos",
    u"0:)":"emopos",
    u":‑b":"emopos",
    u"(>_<)":"emoneg",
    u"(>_<)>":"emoneg",
    u"^_^":"emopos",
    u"(^_^)/":"emopos",
    u"(^O^)／":"emopos",
    u"(^o^)／":"emopos",
    u"('_')":"emoneg",
    u"(/_;)":"emoneg",
    u"(T_T) (;_;)":"emoneg",
    u"(;_;":"emoneg",
    u"(;_:)":"emoneg",
    u"(;O;)":"emoneg",
    u"(:_;)":"emoneg",
    u"(ToT)":"emoneg",
    u";_;":"emoneg",
    u";-;":"emoneg",
    u";n;":"emoneg",
    u";n;":"emoneg",
    u"Q.Q":"emoneg",
    u"T.T":"emoneg",
    u"Q_Q":"emoneg",
    u"(-.-)":"emopos",
    u"(-_-)":"emopos",
    u"(；一_一)":"emopos",
    u"(=_=)":"emoneg",
    u"^m^":"emopos",
    u">^_^<":"emopos",
    u"<^!^>":"emopos",
    u"^/^":"emopos",
    u"（*^_^*）" :"emopos",
    u"(^<^) (^.^)":"emopos",
    u"(^^)":"emopos",
    u"(^.^)":"emopos",
    u"(^_^.)":"emopos",
    u"(^_^)":"emopos",
    u"(^^)":"emopos",
    u"(^J^)":"emopos",
    u"(*^.^*)":"emopos",
    u"(^—^）":"emopos",
    u"(#^.^#)":"emopos",
    u"(*^0^*)":"emopos",
    u"(*^^)v":"emopos",
    u"(^_^)v":"emopos",
    u'(-"-)':"emoneg",
    u"(ーー;)":"emoneg",
    u"(＾ｖ＾)":"emopos",
    u"(＾ｕ＾)":"emopos",
    u"(^)o(^)":"emopos",
    u"(^O^)":"emopos",
    u"(^o^)":"emopos",
    u")^o^(":"emopos",
    u":O o_O":"emoneg",
    u"o_0":"emoneg",
    u"o.O":"emoneg",
    u"(o.o)":"emoneg",
    u"(*￣m￣)": "emoneg",
}

def convert_emoticons(text):
  return EMOTICONS.get(text, text)

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

class Preproc(BaseEstimator, TransformerMixin):
    stopwords = set(["the", "an", "i", "a", "and", "more", "words", "here"])
    preproc_comments = []

    def __init__(self):
        pass

    def preproc(self, reviews: pd.DataFrame, sentiment=None):
        print("Entering preprocessing")
        comments_proper = []
        X_ = reviews.copy()

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
                word = re.sub("[^a-zA-Z\s]+", ' ', word)    # replace characters that are not alphabetic, space, or underscore
                word = re.sub(r'(.)\1\1+', '\g<1>', word)   # replace any three character+ sequence with one
                word = re.sub('\s+', ' ', word)
                word = word.strip()                         # trailing whitespace because punctuation replaced by space
                new_comment_split.extend(word.split(' '))

            # Remove names from the comment
            for i, word in enumerate(new_comment_split):
                if word in names:
                    new_comment_split[i] = ''               # remove professor first and last name

            comment = ' '.join(new_comment_split)
            comment = re.sub('\s+', ' ', comment)
            comment = comment.strip()

            comment = ' '.join(word for word in comment.split() if len(word) > 1 and word not in self.stopwords)

            comments_proper.append(comment)

        self.preproc_comments = comments_proper
        return comments_proper
    
    # below methods are used to ensure that preproc class can be used as a step in sklearn.pipeline.Pipeline
    # unsure which methods it actually uses, will have to check it out
    def fit(self, X, y=None):
        return self
    
    def transform(self, X, y=None):
        return self.preproc(X)
    
    # def fit_transform(self, reviews: pd.DataFrame, sentiment=None):
    #     return self.preproc(reviews)