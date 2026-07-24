# Day 06
# Goal: Apply SOLID principles, use a Factory to create accounts,
# and implement the Observer pattern for SMS alerts.


# Alert Service (SRP)
class AlertService:
    def send(self, message):
        print(f"[Alert] {message}")


# Observer
class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


# Parent class
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self._notify(f"{amount} deposited. Balance: {self.__balance}")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            self._notify(f"{amount} withdrawn. Balance: {self.__balance}")
        else:
            print("Insufficient funds.")

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")

    # Register an observer
    def subscribe(self, observer):
        self.observers.append(observer)

    # Notify all observers
    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)


# Savings Account
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance, rate):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.get_balance() * self.rate
        self.deposit(interest)

    def statement(self):
        print(" Savings Account ")
        super().statement()


# Current Account
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.get_balance() + self.overdraft:
            current = self.get_balance()

            if amount <= current:
                super().withdraw(amount)
            else:
                super().withdraw(current)
                print(f"Overdraft used: {amount - current}")
        else:
            print("Overdraft limit exceeded.")

    def statement(self):
        print(" Current Account ")
        super().statement()


# Factory
class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance, value):
        if kind.lower() == "savings":
            return SavingsAccount(owner, account_number, balance, value)
        elif kind.lower() == "current":
            return CurrentAccount(owner, account_number, balance, value)
        else:
            raise ValueError("Invalid account type")


# Create observer
sms = SMSAlert()

# Create accounts using the factory
acc1 = AccountFactory.create("savings", "Almaz", "1001", 2000, 0.05)
acc2 = AccountFactory.create("current", "Abel", "1002", 1000, 500)

# Attach observer
acc1.subscribe(sms)
acc2.subscribe(sms)

# Perform operations
acc1.add_interest()
acc2.withdraw(1200)

# Display account details
accounts = [acc1, acc2]

for account in accounts:
    account.statement()
    print()