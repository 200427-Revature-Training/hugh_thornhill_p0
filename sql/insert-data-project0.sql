truncate tutors restart identity CASCADE;
truncate students restart identity CASCADE;
truncate subjects restart identity CASCADE;
truncate appointments restart identity CASCADE;

insert into tutors (first_name, last_name, birthdate) values
	('Bob', 'Smith', '2000-01-02' ::DATE),
	('Sherry', 'Smith', '2000-01-02' ::DATE),
	('Candice', 'Smith', '2000-01-02' ::DATE);
select * from tutors;

insert into students (first_name, last_name, birthdate, grade) values
	('Bobby', 'Hill', '2006-09-07' ::DATE, 'Freshman'),
	('Abby', 'Hill', '2006-09-07' ::DATE, 'Sophomore'),
	('Bobby', 'Savage', '2006-09-07' ::DATE, 'Senior'),
	('Lilly', 'McDonald', '2006-09-07' ::DATE, 'Freshman'),
	('Kate', 'Holmes', '2006-09-07' ::DATE, 'Freshman');
select * from students;

insert into subjects (subject_name) values
	('History'),
	('Math'),
	('English'),
	('Science'),
	('Computer Science');
select * from subjects;

insert into appointments (start_time, end_time, tutor_id, student_id, subject_id) values
	('2020-06-13 16:00', '2020-06-13 17:00', 1, 1, 1),
	('2020-06-13 16:00', '2020-06-13 17:00', 2, 3, 1),
	('2020-06-13 17:00', '2020-06-13 18:00', 1, 1, 1);

insert into appointments (start_time, end_time, tutor_id, student_id, subject_id) values
	('2020-06-13 16:00', '2020-06-13 17:00', 3, 2, 1);
	select * from appointments;

create view appointments_full_views AS
select 
appointments.id as id,
appointments.start_time,
appointments.end_time,
tutors.first_name "tutor_first_name",
tutors.last_name "tutor_last_name",
students.first_name "student_first_name",
students.last_name "student_last_name",
students.grade,
subjects.subject_name
from appointments
left join tutors on appointments.tutor_id = tutors.id
left join students on appointments.student_id = students.id
left join subjects on appointments.subject_id = subjects.id;

drop view appointments_full_views;

select * from appointments_full_views;

select * from appointments_full_views where id = 1; 