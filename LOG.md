1. Allow users to filter meals by ABC, category, and area (make a MealsList.jsx) -> DONE
2. Search bar in the filter page -> DONE
3. Convert class components to function components --> DONE
4. Allow users to search meals --> DONE
5. Add spinner to Search.jsx until fetch completes --> DONE
6. Add clickable thumbnails to filter page (will display a meal card similar to Random route when clicked)
    - Will take inspiration from https://www.allrecipes.com/recipes/149/breakfast-and-brunch/french-toast/ for the mini card design --> DONE (?)
    - Async image loading --> KINDA DONE
    - Add onClick that expands to /search/{meal_name} to display MealPage --> DONE

7. Fix up Recipe ingredients and measures display null values. Maybe figure out a fix for the instructions part counting numbers as an instruction. --> DONE
8. Possibly add YouTube video link to the Recipe if the meal has one --> SKIPPED
9. Add res.status(...) in backend and try-catch for error checking on frontend (focusing on /meals/:id route)  --> DONE
10. Add 404 page to unhandled routes --> DONE
11. Add ability to traverse history especially on search and random routes
11. Add Postgres database for users
12. Add authorization with JWT
13. Add favoriting of meals if user is logged in
14. Maybe allow filtering by most favorited by users
15. Figure out something if an error happens in try-catch
16. Render message if /meals/:id doesn't exist 
17. Add / (home) page
18. Make frontend look nicer.
19. Optimizations