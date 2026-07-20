# Day 05
# Goal: Extend the Account class using inheritance and demonstrate polymorphism.

# Parent class
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

    # Withdraw money if there is enough balance
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds.")

    # Display account information
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")


# SavingsAccount inherits from Account
class SavingsAccount(Account):
    # Initialize with an interest rate
    def __init__(self, owner, account_number, balance, rate):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    # Add interest to the account balance
    def add_interest(self):
        interest = self.get_balance() * self.rate
        self.deposit(interest)

    # Override statement() to identify account type
    def statement(self):
        print("  Savings Account ")
        super().statement()


# CurrentAccount inherits from Account
class CurrentAccount(Account):
    # Initialize with an overdraft limit
    def __init__(self, owner, account_number, balance, overdraft):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    # Override withdraw() to allow overdraft
    def withdraw(self, amount):
        if amount <= self.get_balance() + self.overdraft:
            current_balance = self.get_balance()

            if amount <= current_balance:
                super().withdraw(amount)
            else:
                super().withdraw(current_balance)
                print(f"Overdraft used: {amount - current_balance}")
        else:
            print("Overdraft limit exceeded.")

    # Override statement() to identify account type
    def statement(self):
        print(" Current Account ")
        super().statement()


# Create account objects
acc1 = SavingsAccount("Almaz", "1001", 2000, 0.05)
acc2 = CurrentAccount("Abel", "1002", 1000, 500)
acc3 = SavingsAccount("Mahi", "1003", 3000, 0.03)

# Add interest to the savings account
acc1.add_interest()

# Withdraw money using the overdraft feature
acc2.withdraw(1200)

# Store different account types in one list
accounts = [acc1, acc2, acc3]

# Demonstrate polymorphism
for account in accounts:
    account.statement()
    print()
