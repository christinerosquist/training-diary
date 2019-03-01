use rosquis; # Byt till eget användarnamn

drop table user; # Om det finns en tidigare databas
drop table user_info;
drop table weight_progress;
drop table muscle_mass_progress;

drop table workout;
drop table session;
drop table exercise;
drop table group_training;

create table user (
id int,
user_info_id int,
password varchar(64)
);

insert into user values (1,1,'testPassword');

create table user_info (
id int,
name varchar(64),
sex varchar(64),
height int,
current_weight int
);

insert into user_info values (1,'Christine','female',157, 52);

create table weight_progress (
id int,
user_id int,
date varchar(64),
kg int
);

insert into weight_progress values (1,1,'1 mars 2019',52);

create table muscle_mass_progress (
id int,
user_id int,
date varchar(64),
percentage int
);

insert into muscle_mass_progress values (1,1,'1 mars 2019',20);

create table workout (
id int,
user_id int,
type varchar(64),
date varchar(64),
likes int
);

insert into workout values(1,1,'Session','1 mars 2019', 3);
insert into workout values(2,1,'Group Training','2 mars 2019', 10);

create table session (
id int,
exercise_id int,
workout_id int,
weight int,
sets int,
reps int,
duration int
);

insert into session values (1,1,1,10, 3, 15, 5);

create table exercise (
id int,
name varchar(64),
define_calories_upon varchar(64),
calories int
);

insert into exercise values(1,'Bicep curl','minute',8);

create table group_training (
id int,
name varchar(64),
duration int,
workout_id int,
calories_per_minute int
);

insert into group_training values (1,'Step Explode',45,2,12);

SELECT * FROM user
SELECT * FROM user_info
SELECT * FROM weight_progress
SELECT * FROM muscle_mass_progress
SELECT * FROM workout
SELECT * FROM session
SELECT * FROM exercise
SELECT * FROM group_training