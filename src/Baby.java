public class Baby {
    String name;
    String gender;

    public Baby(String name, String gender){
        this.name = name;
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Baby{" +
                "name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
