package com.example.entity;

public class Club {
    private int id;
    private String name;
    private String description;
    private float rating;
    private String logo;
    private String banner;
    private List<Students> followers;
    private float Rating ;
    private int SchoolID;

    public Club(int id, String name, String description, float rating, String logo) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.logo = logo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getBanner() {
        return Banner;
    }

    public void setBanner(String Banner) {
        this.Banner = Banner;
    }

    @Override
    public String toString() {
        return "Club{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", rating=" + rating +
                ", logo='" + logo + '\'' +
                '}';
    }
}
