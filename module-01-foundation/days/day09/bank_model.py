# Day 09
# Goal: Model the bank's branch hierarchy as a tree,
# calculate balances recursively, and traverse transfers using BFS.

from collections import deque


# Branch Tree
class Branch:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance
        self.children = []

    # Add a child branch
    def add_branch(self, branch):
        self.children.append(branch)

    # Recursively calculate total balance
    def total_balance(self):
        total = self.balance

        for child in self.children:
            total += child.total_balance()

        return total


# Build Branch Tree -
head_office = Branch("Head Office", 100000)

north_region = Branch("North Region", 50000)
south_region = Branch("South Region", 40000)

cbe1 = Branch("CBE-1", 20000)
cbe2 = Branch("CBE-2", 15000)
cbe3 = Branch("CBE-3", 18000)
cbe4 = Branch("CBE-4", 12000)

head_office.add_branch(north_region)
head_office.add_branch(south_region)

north_region.add_branch(cbe1)
north_region.add_branch(cbe2)

south_region.add_branch(cbe3)
south_region.add_branch(cbe4)


#  Transfers Graph 
transfers = {
    "CBE-1": ["CBE-2", "CBE-3"],
    "CBE-2": ["CBE-4"],
    "CBE-3": ["CBE-4"],
    "CBE-4": []
}


# BFS 
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()

        if node not in visited:
            visited.add(node)
            order.append(node)

            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return order


# Main
print("Total Bank Balance:")
print(head_office.total_balance())

print()

print("Branches Reachable from CBE-1:")
print(bfs(transfers, "CBE-1"))