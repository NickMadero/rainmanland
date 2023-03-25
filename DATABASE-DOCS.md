Documentation for the RAINMANLAND MYSQL Database

Authors: Marcus Tangradi


Interacting with the database:
    When interacting with the database with the api (node) calls to stored procedures and functions 
    are to be used when available.

***************************************************************
**********************************************************
# Stored Procedures:

### Get Controller Brands:

The controller brands are an enum datatype in the `appointment` table.
        To get the controller brands make a call to the stored procedure:
        
        CALL `rainmanland`.`get_controller_enum`();
    
This will return a list of the possible controller brands that can be inserted into the
table.

*********************************

### Create a new Appointment

This will take the information required by the customer to set rates and to store themselves
as a customer. It also bridges all appointments associated with a specific user in the `assigned_by`
table.
    
        CALL `rainmanland`.`create_new_appointment`(<{email varchar(100)}>, <{first_name varchar(45)}>, <{last_name varchar(45)}>, <{address varchar(255)}>, <{zone_amount int}>, <{controller_brand varchar(45)}>, <{controller_is_outside TINYINT}>);

********************************************************

### Set Date of Appointment

This is used after the customer pays. This sets the date that the appointment is to take place.
It takes a customer and finds the last appointment row that is associated with the customer and
sets the date.

    CALL `rainmanland`.`set_date_of_appointment`(<{date_occur date}>, <{email varchar(100)}>, <{first_name varchar(45)}>, <{last_name varchar(45)}>);

*************************************************************
  

## Get All Appointments with Customers

This is used to get all relevant information about an appointment and the associcated
customer

    CALL `rainmanland`.`get_all_appointments_with_customer`();

*********************************

## Get All Appointments on specific day

This is used to get all the appointments that occur on the date provided. 
the format for date should be `YYYY-MM-DD`.

    CALL `rainmanland`.`get_all_appointments_on_date`(<{date_occur DATE}>);

******************************************************

## Get Settings

This will return all of the key=value pairs for settings


    CALL `rainmanland`.`get_settings`();

***************************

## Put Settings

This is for adding a new setting or changing the value of an existing setting

    CALL `rainmanland`.`put_setting`(<{key_ varchar(100)}>, <{value_ varchar(100)}>);
********************************

## Add New User

Function

This is used as a helper method to insert rows when adding either a crew_member or boss.
can be used but recomended not to be used.

    CALL `rainmanland`.`add_new_user`(<{first_name varchar(45)}>, <{last_name varchar(45)}>, <{email varchar(100)}>, <{password_hash varchar(255)}>, <{phone varchar(45)}>, <{is_working tinyint}>, <{user_type varchar(45)}>);
Returns ID of last employee

****************************************

## Add New Crew Member

This uses the add new user fuction to generate a user_id and then inserts the date
that they were hired

    CALL `rainmanland`.`add_new_crew_member`(<{date_hired_set Date}>, <{first_name varchar(45)}>, <{last_name varchar(45)}>, <{email varchar(100)}>, <{password_hash varchar(255)}>, <{phone varchar(45)}>, <{is_working tinyint}>, <{user_type varchar(45)}>);

**********************************************

    

