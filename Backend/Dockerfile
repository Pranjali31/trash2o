# The first instruction is what image we want to base our container on
# We use an official Python runtime as a parent image
FROM python:3.6

# The environment variable ensures that the python output is set straight
# to the terminal with out buffering it first

ENV PYTHONNUNBUFFERED 1

# create a root direcotry for our project in the container
RUN mkdir /group4_ase

# Set the working directory to /hr_leave_grant_project
WORKDIR /group4_ase

# Copy the current directory contents into the container

ADD . /group4_ase/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
