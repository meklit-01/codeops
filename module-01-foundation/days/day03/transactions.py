totals = {}

try:
    # Read transaction.txt line by line
    with open("transactions.txt", "r") as file:
        for line in file:
            name, amount = line.strip().split(",")
            amount = float(amount)

            if name in totals:
                totals[name] += amount
            else:
                totals[name] = amount
    # mapping each customer to their total 
    for name, total in sorted(totals.items(), key=lambda item: item[1], reverse=True):
        print(name, total)
    # summery
    with open("report.txt", "w") as report:
        for name, total in sorted(totals.items(), key=lambda item: item[1], reverse=True):
            report.write(f"{name}: {total}\n")

except FileNotFoundError:
    print("transactions.txt not found.")
