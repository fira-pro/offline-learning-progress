DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (Id TEXT PRIMARY KEY, Name TEXT, CreatedAt TEXT);
INSERT INTO Users (Id, Name, CreatedAt) VALUES ('1', 'Fira', '2025-10-23T16:06:32.887Z'), ('4', 'Abel', '2025-10-23T16:26:32.887Z'), ('11', 'Addis', '2025-10-23T16:06:32.887Z');

DROP TABLE IF EXISTS Progress;
CREATE TABLE IF NOT EXISTS Progress (Id INTEGER, UserId TEXT, LessonId INTEGER, Type TEXT, Score INTEGER, Total INTEGER,  Timestamp TEXT, Synced INTEGER);
INSERT INTO Progress (Id, UserId, Type, Timestamp, Synced) VALUES (1, '1', 'lesson', '2025-10-23T19:22:27.223Z', 1);
INSERT INTO Progress (Id, UserId, Type, Score, Total, Timestamp, Synced) VALUES (2, '4', 'quiz', 2, 3, '2025-10-23T19:25:27.223Z', 1);