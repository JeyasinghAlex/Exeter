import java.util.ArrayList;
import java.util.Scanner;

public class UserSearch {
    
    static ArrayList<Baby> babyArrayList = new ArrayList<>();
    static BabyUtil babyUtil = new BabyUtil();
    public static void main(String[] args) {
        createBabyNames();
        searchBabyNames();
    }

    public static void searchBabyNames() {
        Scanner scan = new Scanner(System.in);
        int option = 0;
        System.out.println("1) Search by Starting letter");
        System.out.println("2) Search by Gender");
        System.out.println("3) Search by No by letters");
        System.out.println("4) Add new Baby name");
        System.out.print("Enter your Option");
        try{
            option = scan.nextInt();
        }catch(Exception ex){
            System.out.println("Type of Exception = "+ex);
            System.out.println("Invalid option, Please enter the correct option");
            System.out.println();
            searchBabyNames();
        }

        switch(option)
        {
            case 1:
            {
                babyUtil.searchByFirstLetter();
                break;
            }
            case 2:
            {
                babyUtil.searchByGender();
                break;
            }
            case 3:
            {
                babyUtil.searchByTotalLetters();
                break;
            }
            case 4:
            {
                babyUtil.addBabyName();
                break;
            }
            default:
            {
                System.out.println("Invalid Option, Please Enter correct option");
                searchBabyNames();
                break;
            }
        }
    }

    public static void createBabyNames() {
            babyArrayList.add(new Baby("jeyasingh","male"));
            babyArrayList.add(new Baby("alex", "male"));
            babyArrayList.add(new Baby("selvi", "female"));
            babyArrayList.add(new Baby("sadhu", "male"));
            babyArrayList.add(new Baby("flora", "female"));
            babyArrayList.add(new Baby("rubavathi", "female"));
            babyArrayList.add(new Baby("bala", "male"));
            babyArrayList.add(new Baby("nancy", "female"));
            babyArrayList.add(new Baby("stefi", "female"));
            babyArrayList.add(new Baby("dayana", "female"));
            babyArrayList.add(new Baby("hilton", "male"));
            babyArrayList.add(new Baby("joni", "male"));
            babyArrayList.add(new Baby("saral", "female"));
            babyArrayList.add(new Baby("rebaikal", "female"));
            babyArrayList.add(new Baby("punitha", "female"));
            babyArrayList.add(new Baby("pandi", "male"));
            babyArrayList.add(new Baby("anathi", "female"));
            babyArrayList.add(new Baby("samual", "male"));
            babyArrayList.add(new Baby("salini", "female"));
            babyArrayList.add(new Baby("perci", "female"));
            babyArrayList.add(new Baby("gifta", "female"));
            babyArrayList.add(new Baby("jonies", "male"));
            babyArrayList.add(new Baby("selva", "male"));
            babyArrayList.add(new Baby("jamal", "male"));
            babyArrayList.add(new Baby("makslin", "female"));
            babyArrayList.add(new Baby("stalin", "male"));
            babyArrayList.add(new Baby("arun", "male"));
            babyArrayList.add(new Baby("srinithi", "female"));
            babyArrayList.add(new Baby("robin", "male"));
            babyArrayList.add(new Baby("charless", "male"));
            babyArrayList.add(new Baby("felix", "male"));
            babyArrayList.add(new Baby("deiva", "female"));
            babyArrayList.add(new Baby("daniel", "male"));
            babyArrayList.add(new Baby("immanual", "male"));
            babyArrayList.add(new Baby("pomma", "female"));
            babyArrayList.add(new Baby("ganakkan", "male"));
            babyArrayList.add(new Baby("asha", "female"));
            babyArrayList.add(new Baby("celin", "female"));
            babyArrayList.add(new Baby("arunya", "female"));
            babyArrayList.add(new Baby("shyni", "female"));
            babyArrayList.add(new Baby("stefin", "female"));
            babyArrayList.add(new Baby("ezra", "female"));
            babyArrayList.add(new Baby("priya", "female"));
            babyArrayList.add(new Baby("aruna", "female"));
    }

    public static void addBabyName(String name, String gender){
        babyArrayList.add(new Baby(name, gender));
        searchBabyNames();
    }
}
