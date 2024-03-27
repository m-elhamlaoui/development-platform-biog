package com.example.entity;

public class Student extends User {

    private String cne;
    private String numapogee;
    private String firstName;
    private String lastName;
    private int schoolId;
    private Date birthdate;
    private String image;

    public Student(int id, String username, String email, String cne, String numapogee, String firstName, String lastName,Date birthdate, int schoolId) {
        super(id, username, email);
        this.cne = cne;
        this.numapogee = numapogee;
        this.firstName = firstName;
        this.lastName = lastName;
        this.schoolId = schoolId;
        this.birthdate=birthdate;
    }



    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getNumapogee() {
        return numapogee;
    }

    public void setNumapogee(String numapogee) {
        this.numapogee = numapogee;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }
    public void setBirthdate(Date birthdate){
        this.birthdate=birthdate;
    }

    public Date getBirthdate() {
        return birthdate;
    }
}

