public interface UserDao {

    public User findSpecificUser(User user) throws SQLException;
    public Long insertUser(User user) throws SQLException;
    public boolean deleteUser(User user) throws SQLException;

}