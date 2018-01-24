# Rhythmic Learning Tool - Web Application 

### This is the repository used to create the web application for our Senior Design Project. 

Our Senior Design Project consists of a tool designed to teach rhythm concepts. Currently, methods of teaching rhythmic structure face a tradeoff of cost of implementation versus how effective the method is to each individual student. Our design addresses the need for an inexpensive education tool to provide teachers with individual student performance data and students with an engaging, tactile instrument for learning rhythmic structure. The teacher will create or choose rhythmic patterns from the web application to be projected to the classroom and followed along by the students on their digital instruments. The performance of the students will be recorded and evaluated to provide the teacher with a summary of student performance. 

Our design focused on a hardware interface for students to perform rhythmic patterns and a web interface for the teacher to view student performance data and create lessons.

For the teacher web interface, we created a web application that allows the teacher to create lessons, edit lessons, display the lessons created to the students, and visualize student performance data. The web interface interacts with a database to store and retrieve information. The lessons created by the teacher are stored in the database, so they can be accessed anytime and modified if needed. The web application obtains the student performance data from the hardware controller through the database.



##### testapp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

##### Build & development

Run `grunt` for building and `grunt serve` for preview.

##### Testing

Running `grunt test` will run the unit tests with karma.
