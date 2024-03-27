import java.util.Date;
import java.util.List;

public interface EventDAO {
    boolean addEvent(Event event);
    boolean updateEvent(Event event);
    boolean deleteEvent(int eventId);
    Event getEventById(int eventId);
    List<Event> getAllEventsByClub(int clubId);
    List<Event> getEventsByLocation(String location);
    List<Event> getEventsByCategory(String category);
    List<Club> getEventsByDate(Date startTime, Date endTime);
    List<Club> searchClubs(String keywords);
}
