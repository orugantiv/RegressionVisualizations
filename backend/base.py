from flask import Flask, request
api = Flask(__name__)
from werkzeug.utils import secure_filename
import csv
import os

import logging

UPLOAD_FOLDER = '.'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@api.route('/upload', methods=['POST'])
def upload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    # logger.info("welcome to upload`")
    file = request.files['file'] 

    # reader = csv.reader(file)
    # print(csv_reader)
    filename ="ssss.csv"
    destination="/".join([target, filename])
    file.save(destination)
    
    # session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response



@api.route('/profile', methods=['POST',"GET"])
def my_profile():
    return "Hello World"
    print('Loading')
    response_body ={}
    if request.method == 'POST':
        print('Loading')


        if request.files:
            uploaded_file = request.files['filename'] # This line uses the same variable and worked fine
            uploaded_file.save(os.path.join(app.config['FILE_UPLOADS'], uploaded_file.filename))
            f = request.form['filename'] # This is the line throwing the error
            with open(f) as file:
                csv_file = csv.reader(file)
                for row in csv_file:
                    data.append(row)
                    print(row)



        # # request.form.get('name')
        # file = request.form.to_dict()
        # print(file['Files'])
        # data_filename = secure_filename(file['Files'])
        # print(data_filename)
        # csvreader = csv.reader(data_filename)
        # for row in csvreader:
        #     print(row)
        # response_body = framework
        # response_body = {
        #     "name": "Anirudh",
        #     "about" :"Hello! I'm a full stack developer that loves python and javascript"
        # }


        return "ok"
        
    elif request.method == 'GET':
        response_body = {
            "name": "sss",
            "about" :"Hello! I'm a full stack developer that loves python and javascript"
        }
    return response_body

