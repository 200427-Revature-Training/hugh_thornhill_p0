 drop table tutors CASCADE;
 drop table students CASCADE;
 drop table appointments CASCADE;
 drop table subjects CASCADE;

create table tutors (
	id INTEGER generated always as identity primary key,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	birthdate DATE
);

select * from tutors;

create table students (
	id INTEGER generated always as identity primary key,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	birthdate DATE,
	grade VARCHAR(20)
);

select * from students;

create table subjects (
	id INTEGER generated always as identity primary key,
	subject_name VARCHAR(50)
);

create table appointments (
	id INTEGER generated always as identity primary key,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	tutor_id INTEGER references tutors(id) not NULL,
	student_id INTEGER references students(id) not NULL,
	subject_id INTEGER references subjects(id) not null,
	unique (tutor_id, start_time),
	unique (tutor_id, end_time),
	unique (student_id, start_time),
	unique (student_id, end_time)
);
select * from appointments;

show TIMEZONE;