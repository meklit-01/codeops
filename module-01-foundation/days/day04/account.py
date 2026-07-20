# Day04
# Goal: Create a basic bank Account class using encapsulation.

class Account:
    # Constructor to initialize account details
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    # Return the current balance
    def get_balance(self):
        return self.__balance

    # Deposit money into the account
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            print("Invalid deposit amount.")

    # Withdraw money if there is enough balance
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds.")

    # Display account information
    def statement(self):
        print("  Account ")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")


# Test the Account class
account = Account("Almaz", "1001", 3000)

account.deposit(500)
account.withdraw(200)

account.statement()
