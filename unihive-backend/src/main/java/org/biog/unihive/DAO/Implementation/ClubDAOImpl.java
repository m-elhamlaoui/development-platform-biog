import org.supabase.*;
import supabase from "./config/supabaseClient.js"
import ClubDao "../Interfaces/ClubDao.java"


public class ClubDAOImpl implements ClubDAO {
//    //private final SupabaseClient client;
//   //     public ClubDAOImpl() {
//   //        this.client = supabase.build();
//   //    }
//
//   //    public ClubDAOImpl(SupabaseClient client) {
//  //        this.client = client;
//  //    }
//    private List<Club> clubs;
//
//    public ClubDAOImpl() {
//        this.clubs = new ArrayList<>();
//    }
//
//    @Override
//    public boolean addClub(Club club) {
//        return clubs.add(club);
//    }
//
//    @Override
//    public boolean updateClub(Club club) {
//        for (Club c : clubs) {
//            if (c.getId() == club.getId()) {
//                c.setName(club.getName());
//                c.setl
//                        (club.getLocation());
//                c.setDescription(club.getDescription());
//                return true;
//            }
//        }