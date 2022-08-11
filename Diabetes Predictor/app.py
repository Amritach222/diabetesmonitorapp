# -*- coding: utf-8 -*-
"""
Created on Thu Jun 30 17:25:43 2022

@author: AweSOME
"""

# Importing essential libraries
from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

# Load the Random Forest CLassifier model
filename = 'diabetes-prediction-knn-model.pkl'
classifier = pickle.load(open(filename, 'rb'))
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
	return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        preg = int(request.form['pregnancies'])
        glucose = int(request.form['glucose'])
        bp = int(request.form['bloodpressure'])
        st = int(request.form['skinthickness'])
        insulin = int(request.form['insulin'])
        bmi = float(request.form['bmi'])
        dpf = float(request.form['dpf'])
        age = int(request.form['age'])
        
        data = np.array([[preg, glucose, bp, st, insulin, bmi, dpf, age]])
        my_prediction = classifier.predict(data)
        
        # return render_template('result.html', prediction=my_prediction)
        return str(my_prediction[0])
if __name__ == '__main__':
	app.run(debug=True)