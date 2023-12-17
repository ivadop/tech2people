# Tech2people

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Notes and remarks

This is a very simple app that alows user to create a ToDo list.

Todo has properties:
```
id: string;
title: string
deadline: Date
completed: boolean
```

There are custom validators for title and deadline.

User can **delete, update (both title and deadline) and mark completed** each ToDo. There is a toggle to hide/show completed ToDos from the view. User can cancel create/update and it will reset the form.

If deadline of a created ToDo moves in the past as time goes by, date in the list is in red color.

State is handled using NgRx liberary.
(Initial state has two mocked up ToDos in the list. It demonstrates cases of ToDos with deadlines that have already passed.)

At some point, I realized my application lacked routing functionality, so I added a component named ```OtherComponent```. Its primary purpose is to demonstrate routing, though it currently serves no specific functional role in the application.