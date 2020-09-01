#!/usr/bin/python3
import os

html = "../2019F1season.html"

pdf = "../pdfs/2019F1season.pdf"

os.system(" xvfb-run wkhtmltopdf %s %s" %(html,pdf))