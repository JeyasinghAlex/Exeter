import java.util.Scanner;
import java.util.ArrayList;
public class BabyUtil {
    static Scanner scan = new Scanner(System.in);
    public void searchByFirstLetter(){
        boolean result = false;
        System.out.println("Enter the baby first letter");
        char ch = scan.next().charAt(0);
        for(int i = 0; i < UserSearch.babyArrayList.size(); i++){
            if(ch == UserSearch.babyArrayList.get(i).name.charAt(0)){
                                System.out.println(UserSearch.babyArrayList.get(i).toString());
                result = true;
            }
        }
        if(!result){
            System.out.println("Didn't find any baby name");
            System.out.println();
            UserSearch.searchBabyNames();
        }else{
            System.out.println("Search Successfully");
            System.out.println();
            UserSearch.searchBabyNames();
        }
    }

    public void searchByGender(){
        int option;
        System.out.println("1) male");
        System.out.println("2) female");
        System.out.print("Enter your option");
        option = scan.nextInt();
        switch(option)
        {
            case 1:
            {
                String gender = "male";
                searchBabyName(gender, UserSearch.babyArrayList);
                break;
            }
            case 2:
            {
                String gender = "female";
                searchBabyName(gender, UserSearch.babyArrayList);
                break;
            }
        }
    }

    public void searchBabyName(String gender, ArrayList<Baby> babyArrayList){
        for(int i = 0; i < babyArrayList.size(); i++){
            if(babyArrayList.get(i).gender.equals(gender)){
                System.out.println(babyArrayList.get(i).toString());
            }
        }
        System.out.println();
        UserSearch.searchBabyNames();
    }

    public void searchByTotalLetters(){
        System.out.print("Enter your Number Character");
        boolean result = false;
        int ch = scan.nextInt();
        for(int i = 0; i < UserSearch.babyArrayList.size(); i++){
            if(ch == UserSearch.babyArrayList.get(i).name.length()){
                System.out.println(UserSearch.babyArrayList.get(i).toString());
                result = true;
            }
        }
        if(!result){
            System.out.println("Cann't find any baby name");
            UserSearch.createBabyNames();
        }else{
            System.out.println("Search Successfully");
            System.out.println();
            UserSearch.searchBabyNames();
        }
    }

    public void addBabyName(){
        System.out.println("Enter your Baby name");
        Scanner scanner = new Scanner(System.in);
        int option;
        String name = scanner.nextLine();
        System.out.println("1) male");
        System.out.println("2) female");
        System.out.print("Select Your option");
        option = scanner.nextInt();
        switch(option)
        {
            case 1:
            {
                String gender = "male";
                UserSearch.addBabyName(name, gender);
                break;
            }
            case 2:
            {
                String gender = "female";
                UserSearch.addBabyName(name, gender);
                break;
            }
            default:
            {
                break;
            }
        }
    }
}
