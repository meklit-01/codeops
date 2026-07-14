storeBillTotal = 1000  # ETB
numberOfPeople = ["Abebe", "Marti", "Hilina"]
numPeople = len(numberOfPeople)

# computes the per-person amount, tip included.


def splitBill():

    total = (storeBillTotal/numPeople)
    tipRate = total*(0.1)
    perPersonAmount = total + tipRate
    return perPersonAmount


# print each person share.
for person in numberOfPeople:
    print(f"{person} should pay {splitBill()} ETB"
          )
