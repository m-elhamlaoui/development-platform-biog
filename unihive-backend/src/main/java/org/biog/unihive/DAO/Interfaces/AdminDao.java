import java.util.List;

public interface AdminDAO {
    boolean addAdmin(Admin admin);

    Admin getAdminById(int adminId);

    List<Admin> getAllAdmins();

    boolean updateAdmin(Admin admin);

    boolean deleteAdmin(int adminId);

    List<Admin> getAdminsBySchoolId(int schoolId);
}
