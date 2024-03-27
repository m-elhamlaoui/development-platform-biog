package com.example.entity;

public class School {

    private int id;
    private String schoolname;
    private String schoolcity;
    private String schooladresse;


    public School(int id, String schoolname, String schoolcity, String schooladresse) {

        this.id = id;
        this.schoolname = schoolname;
        this.schoolcity = schoolcity;
        this.schooladresse = schooladresse;

    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSchoolname() {
        return schoolname;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname;
    }

    public String getSchooladresse() {
        return schooladresse;
    }

    public void setSchooladresse(String schooladresse) {
        this.schooladresse = schooladresse;
    }

    public String getSchoolcity() {
        return schoolcity;
    }

    public void setSchoolcity(String schoolcity) {
        this.schoolcity = schoolcity;
    }

}

