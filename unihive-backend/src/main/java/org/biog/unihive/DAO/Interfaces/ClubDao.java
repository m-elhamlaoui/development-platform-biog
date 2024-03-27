import java.util.List;

public interface ClubDAO {

    boolean addClub(Club club);

    boolean updateClub(Club club);

    boolean deleteClub(int clubId);

    Club getClubById(int clubId);

    List<Club> getAllClubs();

    School getSchool(int clubId);

    List<Event> getAllEventsByClub(int clubId);

    List<Student> getFollowers(int clubId);

    List<Club> getClubsBySchool(int schoolId);
    List<Club> getClubsByCategory(String category);
    List<Club> getClubsByLocation(String city);

    boolean followClub(int clubId, int userId);
    boolean unfollowClub(int clubId, int userId);
    List<Club> searchClubs(String keywords);




}
