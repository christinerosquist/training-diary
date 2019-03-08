use rosquis; # Byt till eget användarnamn

drop table user; # Om det finns en tidigare databas
drop table user_info;
drop table weight_progress;
drop table muscle_mass_progress;
drop table muscle_mass_progresses;
drop table weight_progresses;


drop table workout;
drop table session;
drop table exercise;
drop table group_training;

create table user (
id varchar(36) NOT NULL,
email varchar(64),
hash longtext,
salt varchar(64)
);

insert into user values ("1",'testmail',"somehash", "somesalt");

create table user_info (
id varchar(36) NOT NULL,
user_id varchar(36),
name varchar(64),
sex varchar(64),
height int,
current_weight int
);

insert into user_info values ("1","1",'Christine','female',157, 52);

create table weight_progress (
id varchar(36) NOT NULL,
user_id varchar(36),
date date,
kg int
);

insert into weight_progress values ("1","1",'2019-05-03',60);
insert into weight_progress values ("2","1",'2019-05-25',59);

create table muscle_mass_progress (
id varchar(36) NOT NULL,
user_id varchar(36),
date date,
percentage int
);

insert into muscle_mass_progress values ("1","1",'2019-05-03',15);
insert into muscle_mass_progress values ("2","1",'2019-05-20',17);
insert into muscle_mass_progress values ("3","1",'2019-06-10',20);
insert into muscle_mass_progress values ("4","1",'2019-06-30',21);

create table workout (
id varchar(36) NOT NULL,
user_id varchar(36),
group_training_id varchar(36),
type varchar(64),
date date,
likes int
);

insert into workout values("1","1", null, 'Gym Session','2019-03-05', 3);
insert into workout values("2","1", "1", 'Group Training','2019-03-06', 10);
insert into workout values("3","1", "2", 'Group Training','2019-03-05', 4);

create table session (
id varchar(36) NOT NULL,
exercise_id varchar(36),
workout_id varchar(36),
weight int,
sets int,
reps int,
duration int
);

insert into session values ("1","1","1",10, 3, 15, 5);
insert into session values ("2","2","1",15, 3, 15, 10);
insert into session values ("3","3","1",15, 3, 15, 10);


create table exercise (
id varchar(36) NOT NULL,
name varchar(64),
define_calories_upon varchar(64),
calories int
);

insert into exercise values("1",'Bicep curl','reps',8);
insert into exercise values("2",'Squat','reps',10);
insert into exercise values("3",'Dead lifts','reps',15);


create table group_training (
id varchar(36) NOT NULL,
name varchar(64),
duration int,
calories_per_minute int
);

insert into group_training values ("1",'Step Explode',45,12);
insert into group_training values ("2",'Absolution',30,5);
insert into group_training values ("3",'Kick step',60,10);
insert into group_training values ("4",'Zumba',60,15);


SELECT * FROM user;
SELECT * FROM user_info;
SELECT * FROM weight_progress;
SELECT * FROM muscle_mass_progress;
SELECT * FROM workout;
SELECT * FROM session;
SELECT * FROM exercise;
SELECT * FROM group_training;
