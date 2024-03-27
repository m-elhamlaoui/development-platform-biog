import java.util.List;

public interface SchoolDAO {

    boolean addSchool(School school);

    boolean updateSchool(School school);

    boolean deleteSchool(int SchoolId);

    School getSchoolById(int SchoolId);



}

