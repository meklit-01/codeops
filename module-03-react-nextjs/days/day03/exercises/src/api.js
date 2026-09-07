export async function getDishes(category, signal) {
// Fetch dishes from public/dishes.json
const response = await fetch("/dishes.json", {
signal,
})

// Check if the request was successful
if (!response.ok) {
throw new Error(
"Could not load the menu. Please try again."
)
}

// Convert JSON into JavaScript data
const data = await response.json()

// Return all dishes
if (category === "all") {
return data
}

// Return dishes from the selected category
return data.filter(
(dish) => dish.category === category
)
}
