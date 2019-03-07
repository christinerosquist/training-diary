use rosquis; # Byt till eget användarnamn

drop table user; # Om det finns en tidigare databas
drop table user_info;
drop table weight_progress;
drop table muscle_mass_progress;

drop table workout;
drop table session;
drop table exercise;
drop table group_training;
drop table session_workout;

create table user (
id varchar(36) NOT NULL,
email varchar(64),
hash longtext,
salt varchar(64)
);

insert into user values ("1",'testmail',"some", "some");

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
date varchar(64),
kg int
);

insert into weight_progress values ("1","1",'1 mars 2019',52);

create table muscle_mass_progress (
id varchar(36) NOT NULL,
user_id varchar(36),
date varchar(64),
percentage int
);

insert into muscle_mass_progress values ("1","1",'1 mars 2019',20);

create table workout (
id varchar(36) NOT NULL,
user_id varchar(36),
group_training_id varchar(36),
type varchar(64),
date varchar(64),
likes int
);

insert into workout values("1","1", null, 'Session','1 mars 2019', 3);
insert into workout values("2","1", "1", 'Group Training','2 mars 2019', 10);

create table session (
id varchar(36) NOT NULL,
exercise_id varchar(36),
-- workout_id varchar(36),
weight int,
sets int,
reps int,
duration int
);

insert into session values ("1","1",10, 3, 15, 5);

create table exercise (
id varchar(36) NOT NULL,
name varchar(64),
define_calories_upon varchar(64),
calories int
);

insert into exercise values("1",'Bicep curl','minute',8);

create table group_training (
id varchar(36) NOT NULL,
name varchar(64),
duration int,
calories_per_minute int
);

insert into group_training values ("1",'Step Explode',45,12);

-- tables for many to many relations

-- -- connects a user with a workout
-- create table personal_workout (
-- name varchar(64),
-- user_id varchar(36),
-- workout_id varchar(36)
-- );
--
-- insert into personal_workout values ("good","1","1");
-- insert into personal_workout values ("good","1","2");

-- connects a session with a workout
create table session_workout (
name varchar(64),
session_id varchar(36),
workout_id varchar(36)
);

insert into session_workout values ("good","1","1");

SELECT * FROM user;
SELECT * FROM user_info;
SELECT * FROM weight_progress;
SELECT * FROM muscle_mass_progress;
SELECT * FROM workout;
SELECT * FROM session;
SELECT * FROM exercise;
SELECT * FROM group_training;
