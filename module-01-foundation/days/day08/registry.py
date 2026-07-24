# Day 08
# Goal: Add a balance leaderboard, binary search,
# and recursive transaction total to the AccountRegistry.


# Alert Service 
class AlertService:
    def send(self, message):
        print(f"[Alert] {message}")


# Observer 
class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


# ---------------- Account ----------------
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []
        self.history = []

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.history.append(("deposit", amount))
            self._notify(f"Deposited {amount}")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            self.history.append(("withdraw", amount))
            self._notify(f"Withdrew {amount}")
        else:
            print("Insufficient funds.")

    def undo_last(self):
        if not self.history:
            print("No transaction to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount
        else:
            self.__balance += amount

    def subscribe(self, observer):
        self.observers.append(observer)

    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def statement(self):
        print(f"{self.account_number} | {self.owner} | Balance: {self.__balance}")


#  Savings Account 
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance, rate):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.get_balance() * self.rate)


# Current Account 
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft


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


# Registry 
class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    # Add account
    def add(self, account):
        self.accounts[account.account_number] = account

    # O(1) lookup
    def find(self, account_number):
        return self.accounts.get(account_number)

    # Ordered list
    def list_all(self):
        return sorted(self.accounts.values(),
                      key=lambda acc: acc.account_number)

    # Leaderboard by balance
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda acc: acc.get_balance(),
            reverse=True
        )[:n]

    # Binary Search
    def binary_search(self, account_list, target):
        left = 0
        right = len(account_list) - 1

        while left <= right:
            mid = (left + right) // 2

            if account_list[mid].account_number == target:
                return account_list[mid]
            elif account_list[mid].account_number < target:
                left = mid + 1
            else:
                right = mid - 1

        return None

    # Find account by account number using binary search
    def find_by_number(self, account_number):
        ordered = self.list_all()
        return self.binary_search(ordered, account_number)

    # Recursive total of transaction amounts
    def total_transactions(self, history, index=0):
        if index == len(history):
            return 0

        return history[index][1] + self.total_transactions(history, index + 1)


#  Main 
sms = SMSAlert()

registry = AccountRegistry()

acc1 = AccountFactory.create("savings", "Almaz", "1001", 3000, 0.05)
acc2 = AccountFactory.create("current", "Abel", "1002", 1500, 500)
acc3 = AccountFactory.create("savings", "Mahi", "1003", 4500, 0.04)

for acc in [acc1, acc2, acc3]:
    acc.subscribe(sms)
    registry.add(acc)

acc1.deposit(500)
acc1.withdraw(200)
acc2.deposit(300)
acc3.deposit(1000)

print("Top 2 by Balance")
for acc in registry.top_by_balance(2):
    acc.statement()

print()

found = registry.find_by_number("1002")
if found:
    print("Binary Search Result:")
    found.statement()

print()

print("Total Transaction Amount:")
print(registry.total_transactions(acc1.history))