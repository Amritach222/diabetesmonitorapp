# -*- coding: utf-8 -*-
"""Diabetes Prediction.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1nawo6RKt3fx9HZ4yCYvl4Z4bsY4iqDq-

#### Importing all the required libraries
"""

import numpy as np
import pickle
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
from mlxtend.plotting import plot_decision_regions
import missingno as msno
from pandas.plotting import scatter_matrix
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn import metrics
from sklearn.metrics import classification_report
import warnings
warnings.filterwarnings('ignore')

diabetes_df = pd.read_csv('diabetes.csv')
diabetes_df.head()

"""####EDA"""

# Checking columns available in our dataset.
diabetes_df.columns

#Information about the dataset
diabetes_df.info()

#To know more about the dataset
diabetes_df.describe()

# To know more about the dataset with transpose – here T is for the transpose
diabetes_df.describe().T

#let’s check that if our dataset have null values or not
diabetes_df.isnull().head(10)

#check the number of null values our dataset has.
diabetes_df.isnull().sum()

# For  this particular dataset all the missing values were given the 0 as a value which is not good for the authenticity of the dataset. 
#Hence we will first replace the 0 value with the NAN value then start the imputation process.
diabetes_df_copy = diabetes_df.copy(deep = True)
diabetes_df_copy[['Glucose','BloodPressure','SkinThickness','Insulin','BMI']] = diabetes_df_copy[['Glucose','BloodPressure','SkinThickness','Insulin','BMI']].replace(0,np.NaN)

# Showing the Count of NANs
print(diabetes_df_copy.isnull().sum())

"""####Data Visualization"""

#Plotting the data distribution plots before removing null values
p = diabetes_df.hist(figsize = (16,9))

#It shows the occurrence of every kind of value in the graphical structure which in turn lets us know the range of the data.
#Now we will be imputing the mean value of the column to each missing value of that particular column.
diabetes_df_copy['Glucose'].fillna(diabetes_df_copy['Glucose'].mean(), inplace = True)
diabetes_df_copy['BloodPressure'].fillna(diabetes_df_copy['BloodPressure'].mean(), inplace = True)
diabetes_df_copy['SkinThickness'].fillna(diabetes_df_copy['SkinThickness'].median(), inplace = True)
diabetes_df_copy['Insulin'].fillna(diabetes_df_copy['Insulin'].median(), inplace = True)
diabetes_df_copy['BMI'].fillna(diabetes_df_copy['BMI'].median(), inplace = True)

#Plotting the distributions after removing the NAN values.
p = diabetes_df_copy.hist(figsize = (16,9))

#In age column after removal of the null values, we can see that there is a spike at the range of 50 to 100 which is quite logical as well.
#Plotting Null Count Analysis Plot
p = msno.bar(diabetes_df)

#Inference: Now in the above graph also we can clearly see that there are no null values in the dataset.
#Now, let’s check that how well our outcome column is balanced

color_wheel = {1: "#0392cf", 2: "#7bc043"}
colors = diabetes_df["Outcome"].map(lambda x: color_wheel.get(x + 1))
print(diabetes_df.Outcome.value_counts())
p=diabetes_df.Outcome.value_counts().plot(kind="bar")

#Inference: Here from the above visualization it is clearly visible that our dataset is completely imbalanced in fact the number of patients who are diabetic is half of the patients who are non-diabetic.
plt.subplot(121), sns.distplot(diabetes_df['Insulin'])
plt.subplot(122), diabetes_df['Insulin'].plot.box(figsize=(16,5))
plt.show()

#Inference: That’s how Distplot can be helpful where one will able to see the distribution of the data as well as 
#with the help of boxplot one can see the outliers in that column and other information too which can be derived by the box and whiskers plot.
#Correlation between all the features before cleaning

plt.figure(figsize=(12,9))
# seaborn has an easy method to showcase heatmap
p = sns.heatmap(diabetes_df.corr(), annot=True,cmap ='RdYlGn')

#Before scaling down the data let’s have a look into it
diabetes_df_copy.head()

#After Standard scaling
sc_X = StandardScaler()
X =  pd.DataFrame(sc_X.fit_transform(diabetes_df_copy.drop(["Outcome"],axis = 1),), columns=['Pregnancies', 
'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
X.head()

#That’s how our dataset will be looking like when it is scaled down or we can see every value now is on the same scale which will help our ML model to give a better result.
# So now Let’s explore our target column
y = diabetes_df_copy.Outcome
y

"""#### Model Building"""

#Splitting the dataset
X = diabetes_df.drop('Outcome', axis=1)
y = diabetes_df['Outcome']

#split the data into training and testing data using the train_test_split function
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.33,random_state=7)

"""#####Random Forest"""

#Building the model using RandomForest
from sklearn.ensemble import RandomForestClassifier
rfc = RandomForestClassifier(n_estimators=200)
rfc.fit(X_train, y_train)

#Now after building the model let’s check the accuracy of the model on the training dataset.
rfc_train = rfc.predict(X_train)
from sklearn import metrics
print("Accuracy_Score =", format(metrics.accuracy_score(y_train, rfc_train)))

#o here we can see that on the training dataset our model is overfitted.
#Getting the accuracy score for Random Forest

from sklearn import metrics
predictions = rfc.predict(X_test)
print("Accuracy_Score =", format(metrics.accuracy_score(y_test, predictions)))

#Classification report and confusion matrix of random forest model
from sklearn.metrics import classification_report, confusion_matrix
print(confusion_matrix(y_test, predictions))
print(classification_report(y_test,predictions))

"""#####Decision Tree"""

#Building the model using DecisionTree

from sklearn.tree import DecisionTreeClassifier
dtree = DecisionTreeClassifier()
dtree.fit(X_train, y_train)

#Now we will be making the predictions on the testing data directly as it is of more importance.
#Getting the accuracy score for Decision Tree

from sklearn import metrics
predictions = dtree.predict(X_test)
print("Accuracy Score =", format(metrics.accuracy_score(y_test,predictions)))

#Classification report and confusion matrix of the decision tree model

from sklearn.metrics import classification_report, confusion_matrix
print(confusion_matrix(y_test, predictions))
print(classification_report(y_test,predictions))

# Creating a pickle file for the classifier
filename = 'diabetes-prediction-rfc-model.pkl'
pickle.dump(rfc, open(filename, 'wb'))

