package deliverySystem;

public class Customer {
	// Attributes
	int orderNumber;
	String customerName;
	String contactNumber;
	String streetAddressOfCustomer;
	String suburbAddressOfCustomer;
	String cityCustomer;
	String emailCustomer;

	// Methods to declare object construction
	public Customer(int orderNumber, String customerName, String contactNumber, String streetAddressOfCustomer,
			String suburbAddressOfCustomer, String cityCustomer, String emailCustomer) {
		this.orderNumber = orderNumber;
		this.customerName = customerName;
		this.contactNumber = contactNumber;
		this.streetAddressOfCustomer = streetAddressOfCustomer;
		this.suburbAddressOfCustomer = suburbAddressOfCustomer;
		this.cityCustomer = cityCustomer;
		this.emailCustomer = emailCustomer;
	}
}
