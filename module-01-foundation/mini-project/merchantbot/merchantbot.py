# Automated Merchant Bot

# 1. Inventory (for loop)
items = [
    ("Coffee Beans", 500),
    ("Honey", 800),
    ("Spices", 300)
]

print("Welcome to the Merchant Shop =====")

# Display available items
print("Available Items:")

for item, price in items:
    print(item, "-", price, "ETB")


# 2. Selection & Setup (input and variables)

item_name = input("\nEnter the item you want to buy: ")

base_price = 0

# Find the selected item's price
for item, price in items:
    if item.lower() == item_name.lower():
        base_price = price


if base_price == 0:
    print("Sorry, this item is not available.")

else:
    user_offer = float(input("Enter your first offer (ETB): "))


    # 3. Merchant Logic (function)

    def evaluate_offer(base_price, user_offer):

        # If offer is equal to or higher than base price
        if user_offer >= base_price:
            print("Merchant: Great! I accept your offer.")
            return True

        # If offer is within 15% of the base price
        elif user_offer >= base_price * 0.85:
            print("Merchant: Fair enough! Deal accepted.")
            return True

        # If offer is too low
        else:
            counter_offer = base_price * 0.90
            print("Merchant: Too low!")
            print("Merchant: My counter-offer is", counter_offer, "ETB")
            return False


    # Check the first offer
    accepted = evaluate_offer(base_price, user_offer)


    #Negotiation

    while accepted == False:

        new_offer = input("\nEnter a new offer or type 'exit' to leave: ")

        if new_offer.lower() == "exit":
            print("Merchant: Maybe next time!")
            break

        user_offer = float(new_offer)

        accepted = evaluate_offer(base_price, user_offer)


    if accepted:
        print("Thank you for your purchase!")