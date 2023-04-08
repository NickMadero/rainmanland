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

    CALL `rainmanland`.`create_new_appointment`(<{email varchar(100)}>, <{first_name varchar(45)}>, <{last_name varchar(45)}>, <{address varchar(255)}>, <{zone_amount int}>, <{controller_brand varchar(45)}>, <{controller_is_outside TINYINT}>, <{zip_code char(5)}>, <{phone_number varchar(45)}>);


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

## Appointment add Zip Code

This is used to add a new zip code (default not an active zip code) to keep track of where appointments
are for scheduling and servicing.
This will use a function to parse the address and retrieve the last numbers (zip code)


    CALL `rainmanland`.`appointment_put_zip_code`(<{appointment_id int}>, <{zip_code varchar(5)}>);


*****************************

## Get Password Hash from email

This will return the password hash from a given email of a user

    CALL `rainmanland`.`get_password_hash`(<{email varchar(100)}>);

***********************************

## Get all user info

Returns all the information about a user given their email

    CALL `rainmanland`.`get_user_info`(<{email varchar(100)}>);

***********************************

## Get all Crews and Users

This will return all the crews and the crew members

    CALL `rainmanland`.`get_all_crews_and_members`();

*********************************

## Get all members on a crew

Takes a crew name and return all of information and users placed on the crew

    CALL `rainmanland`.`get_all_crews_and_members`();

***************************************

## Appointment put zip code

This is used by create new appointment. This upserts a zipcode to the zip_code table
and associates an appointment with that zipcode

    CALL `rainmanland`.`appointment_put_zip_code`(<{appointment_id int}>, <{zip_code char(5)}>);

***********************************************

## Remove User from Crew

This is used to take an employee off of a crew.
This can be used for switching to another crew or to stop working

    CALL `rainmanland`.`remove_user_from_crew`(<{email varchar(100)}>, <{crew_name varchar(45)}>);
*****************************************

## Put User on a Crew

This is used when you want to add a user to an existing crew

    CALL `rainmanland`.`put_user_on_crew`(<{email varchar(100)}>, <{crew_name varchar(45)}>);

**************************

## Get all appointments serviced by a specific crew

This will return all appointments that a crew is responsible for

    CALL `rainmanland`.`get_all_appointments_serviced_by_crew`(<{crew_name varchar(45)}>);

***********************************
## Add a zip code to a specific crew

This allows the user to add a zip code to a crew's serviceable area

    CALL `rainmanland`.`add_zip_to_crew`(<{crew_name varchar(45)}>, <{zip_code varchar(5)}>);

****************************************
## Add zip code to list

This will add an existing zip code. Decide if its available or not

    CALL `rainmanland`.`add_zip_code`(<{zip_codee varchar(5)}>, <{is_availablee tinyint}>);

************************************************
## Remove a zip from a crew

This removed a given zip code from the servie area of a crew

    CALL `rainmanland`.`remove_zip_from_crew`(<{zip_code char(5)}>, <{crew_name varchar(45)}>);
************************************

## Get all half days on a date and crew

This will return all of the half days that a crew is responsible for on a half day
This does not return the appointments on the given half days

    CALL `rainmanland`.`get_half_day_by_crew_name_and_date`(<{crew_name varchar(45)}>, <{date_occur date}>);

********************************************

## Get all appointments occuring on day by date and crew name

This will return all the appointment information and crew name that is
responsible for a crew on a given date

    CALL `rainmanland`.`get_appointments_on_half_day_from_date_crew`(<{crew_name varchar(45)}>, <{date_occur date}>);

**********************************************************
## Put appointment on a half day

this is used when confirmation that the apppointment is set
This takes an appointment and associated it with a halfday which is associated with a specific crew
this also sets the date the appointment is to occur

    CALL `rainmanland`.`put_appointment_on_half_day`(<{crew_name varchar(45)}>, <{date_occuring date}>, <{which_half enum('first', 'second')}>, <{email varchar(100)}>, <{first_name varchar(45)}>, <{last_name varchar(45)}>, <{appointment_id int}>);

********************************************************
## Add new crew

This adds a new crew given a unique name and starting location

    CALL `rainmanland`.`add_new_crew`(<{crew_name varchar(45)}>, <{starting_location varchar(255)}>);

**************************************************
## Remove crew

This will remove a crew given a unique crew name

    CALL `rainmanland`.`remove_crew`(<{crew_name varchar(45)}>);

***************************************************

## Get all zip codes associated with a crew
This will return all zip codes that a crew services

    CALL `rainmanland-test`.`get_all_zip_codes_serviced_by_crew`(<{crew_name varchar(45)}>);

*******************************************************

## Get all crew names

This will return a list of only the crew names

    CALL `rainmanland`.`get_all_crew_names`();

******************************************************

## Get all appointments

This will return all of the appointments that are created
    
    CALL `rainmanland`.`get_all_appointments`();

******************************************************

## Get  half days for a given crew from a date

this will return all the half days that a crew is responsible for
this will return only from the current day and ordering by the date

    CALL `rainmanland`.`get_all_half_days_by_crew`(<{crew_name varchar(45)}>);

*******************************************************

## get appointments on half day by which half and crew

this returns all appointments that only take place during a half day given which half 

    CALL `rainmanland`.`get_appointments_on_half_day_from_date_crew_by_which_half`(<{crew_name varchar(45)}>, <{date_occur date}>, <{which_half enum('first', 'second')}>);

********************************************