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
                //System.out.println(UserSearch.babyArrayList.get(i).name+" -> "+UserSearch.babyArrayList.get(i).gender);
                System.out.println(UserSearch.babyArrayList.get(i).toString());
                result = true;
            }
        }
        if(!result){
            System.out.println("Didn't find any baby name");
            System.out.println();
            UserSearch.searchBaby();
        }else{
            System.out.println("Search Successfully");
            System.out.println();
            UserSearch.searchBaby();
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
                searchBaby(gender, UserSearch.babyArrayList);
                break;
            }
            case 2:
            {
                String gender = "female";
                searchBaby(gender, UserSearch.babyArrayList);
                break;
            }
        }
    }

    public void searchBaby(String gender, ArrayList<Baby> babyArrayList){
        for(int i = 0; i < babyArrayList.size(); i++){
            if(babyArrayList.get(i).gender.equals(gender)){
                System.out.println(babyArrayList.get(i).toString());
            }
        }
        System.out.println();
        UserSearch.searchBaby();
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
            UserSearch.creatBaby();
        }else{
            System.out.println("Search Successfully");
            System.out.println();
            UserSearch.searchBaby();
        }
    }

    public void addBaby(){
        System.out.println("Enter your Baby name");
        //String s = scan.nextLine();
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
                UserSearch.addBaby(name, gender);
                break;
            }
            case 2:
            {
                String gender = "female";
                UserSearch.addBaby(name, gender);
                break;
            }
            default:
            {
                break;
            }
        }
    }
}
