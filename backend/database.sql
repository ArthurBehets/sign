DROP DATABASE IF EXISTS sign;

create database sign;

use sign;

create table grade (
grade varchar(32) NOT NULL,
rights char(3),
primary key(grade)
);

insert into grade (grade, rights) values ('admin', 'rwd'), ('user', 'rxx');

create table category(
categoryId smallint auto_increment NOT NULL,
categoryName varchar(32) NOT NULL,
primary key(categoryId)
);

create table user(
userId smallInt unsigned auto_increment,
grade varchar(32) NOT NULL,
userFirstname varchar(128) NOT NULL,
userLastname varchar(128) NOT NULL,
userEmail varchar(256) NOT NULL UNIQUE,
userPassword varchar(128) NOT NULL,
primary key(userId),
foreign key (grade)
references grade(grade)
);

create table sign(
signId smallInt unsigned auto_increment,
userId smallInt unsigned,
categoryId smallint NOT NULL,
traduction varchar(256) NOT NULL,
videoUrl varchar(128) NOT NULL,
primary key(signId),
foreign key (categoryId)
references category(categoryId),
foreign key (userId) 
references user(userId)
);

create table proposition(
propositionId smallint unsigned auto_increment,
propositionTraduction varchar(256) NOT NULL,
categoryId smallint NOT NULL,
propositionUrl varchar(256) NOT NULL, 
foreign key (categoryId)
references category(categoryId),
primary key(propositionId)
);

create table toWork(
userId smallInt unsigned NOT NULL,
signId smallInt unsigned NOT NULL,
primary key(userId, signId),
foreign key (userId) references user(userId),
foreign key (signId) references sign(signId)
);

create table known(
userId smallInt unsigned NOT NULL,
signId smallInt unsigned NOT NULL,
primary key(userId, signId),
foreign key (userId) references user(userId),
foreign key (signId) references sign(signId)
);