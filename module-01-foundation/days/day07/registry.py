# Day 07
# Goal: Use a dictionary for O(1) account lookup and a stack
# to store transaction history with undo support.


# Alert Service
class AlertService:
    def send(self, message):
        print(f"[Alert] {message}")


# Observer
class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


# Parent Account class
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []
        self.history = []  # Stack for transaction history

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.history.append(("deposit", amount))
            self._notify(f"Deposited {amount}. Balance: {self.__balance}")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            self.history.append(("withdraw", amount))
            self._notify(f"Withdrew {amount}. Balance: {self.__balance}")
        else:
            print("Insufficient funds.")

    def undo_last(self):
        if not self.history:
            print("No transactions to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount
        elif action == "withdraw":
            self.__balance += amount

        print(f"Undid {action} of {amount}")

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")

    def subscribe(self, observer):
        self.observers.append(observer)

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


# Account Registry
class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    # Add an account
    def add(self, account):
        self.accounts[account.account_number] = account

    # O(1) lookup
    def find(self, account_number):
        return self.accounts.get(account_number)

    # Return accounts ordered by account number
    def list_all(self):
        return sorted(self.accounts.values(), key=lambda acc: acc.account_number)


# Main Program 

sms = SMSAlert()

registry = AccountRegistry()

acc1 = AccountFactory.create("savings", "Almaz", "1001", 2000, 0.05)
acc2 = AccountFactory.create("current", "Abel", "1002", 1500, 500)

acc1.subscribe(sms)
acc2.subscribe(sms)

registry.add(acc1)
registry.add(acc2)

acc1.deposit(500)
acc1.withdraw(200)
acc1.undo_last()

for account in registry.list_all():
    account.statement()
    print()