# Fill In The Brain - General Assembly - SEI Project 2
Fill in the Brain is a web application used to create quiz material in the form of fill-in-the-blank questions from content provided by a user. The objective is to provide users with a way to quickly test their knowledge on content they are trying to learn. This application was created for General Assembly's Software Engineering Immsersive (SEI) Program.

# Technologies Used

# Getting Started

# Next Steps

# Notes on the Initital Development 
To provide insight of how the application was developed, the following sections are covered:

1. [Project Requirements](#1-project-requirements)
2. [Initial Project Proposal](#2-project-proposal)
2. [Wireframe](2-wireframe)
3. [Psuedocode](#3-pseudocode)
4. [Difficulties Faced](#4-difficulties-faced)
7. [Content of the Working Version](#5-contents-of-the-working-version)

## 1. Project Requirements

As part of General Assembly's Software Engineering Immersive Program, students are to create web CRUD application using Node, Express and MongoDB with the following requirements:
  - Have at least 2 data entities, one that represents the main functional idea for the applications and another with a 1-to-many or many-to-many relationship with the main entity.
  - Have Create, Read, Update and Delete operations with the database
  - Be styled in a way that is aligned with the web application's purpose
  - Be able to be deployed online through Heroku

This web application may optionally include the following features:
  - OAuth Authentication
  - Basic Authorization that restricts users from performing CUD operations unless they are logged in and the data is created by them. ```isLoggedIn``` middlware should be used for this feature.
  - Uses a third-party API
  - Exposes its own API where it returns data resources as JSON

## 2. Project Proposal - Fill-in the Brain
As per the project requirements above, the web application "Fill-In the Brain" is proposed. 

This will be an application that will allow users to generate a series of fill in the blank statements based on content they input into the application such that users can use to quiz themselves or to help them review the material.

The objective is two-fold, it is to:
1. Provide users with a way to engage with the content they are reading by creating what are called guided notes. The idea is that users are forced to review the material and fill in missing words from statements to have them really reivew the key concepts/facts. This is a method of learning that is generally agreed upon to increase comprehension as described in the following:
    - https://www.interventioncentral.org/academic-interventions/study-organization/guided-notes-increasing-student-engagement-during-lecture-
    - https://www.theteachertoolkit.com/index.php/tool/guided-notes
    - https://udlforteachers.com/fill-in-the-blank-note-taking/

2. Provide users with a simple/fast but more effective way of assessing their knowledge of some material than using just multiple choice questions. This is because fill in the blank questions focus more on a person recalling concepts/facts rather than recognizing answers as described in the following:
    - https://www.forbes.com/sites/rosspomeroy/2014/02/06/multiple-choice-tests-hinder-critical-thinking-should-they-be-used-in-science-classes/#59c224de5ebe
    - https://www.ispringsolutions.com/blog/8-tips-for-writing-good-fill-in-the-blank-questions-in-e-learning-courses

All quizzes created will be saved on a database for the user to access later on. Users will also be able to use other quizzes created by another user, however only the user that created the quiz will be able to delete it.
