package deliverySystem;

public class Restaurant {
	// Attributes
	int orderNumber;
	String restaurantName;
	String cityRestaurant;
	String contactNumber;
	String totalPrice;
	String specialInstruction;
	String item1;
	String item2;

	// Methods to declare object construction
	public Restaurant(int orderNumber, String restaurantName, String cityRestaurant, String contactNumber,
			String totalPrice, String specialInstruction, String item1, String item2) {
		this.orderNumber = orderNumber;
		this.restaurantName = restaurantName;
		this.cityRestaurant = cityRestaurant;
		this.contactNumber = contactNumber;
		this.totalPrice = totalPrice;
		this.specialInstruction = specialInstruction;
		this.item1 = item1;
		this.item2 = item2;
	}
}
