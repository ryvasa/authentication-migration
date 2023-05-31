sequelize model:create --name User --attributes name:string,email:string,password:string,phone_number:string,role:integer
sequelize model:create --name Role --attributes name:string
sequelize model:create --name Bus --attributes name:string,capacity:integer
sequelize model:create --name Route --attributes name:string,origin:string,destination:string,distance:integer
sequelize model:create --name Schedule --attributes RouteId:integer,BusId:integer,DriverId:integer,travel_date:DATEONLY,departure_time:TIME,arrival_time:TIME
sequelize model:create --name Booking --attributes UserId:integer,ScheduleId:integer,price:integer
