# Ngo-Ngo: Your silliest to-do list application
In the world rapidly advanced in AI, this might be one of the very first application from your silly neighbor.

## How to use it
### Download and open an app
For the complete beginners on Github, you could download this app from 'Code' button, then choose 'Download ZIP'.

After you download the file, you could move the zip file anywhere, but .html and .js file must be in the same directory.

Then you could access the app by opening .html file right from your browser. That's it.

### Add new task
You could add your tasks in the 'What's your task' input box, Enter your due date, set your task's priority, then click 'Add' button to add your task onto pending list.

### Complete the task
Once you complete your task, you could tick on the check box to mark those task as done. Then you could click 'Clear' button to remove those completed tasks.

\
Sound pretty simple, right?

## How it works
When you add the new tasks, all task will be automatically sorted by due date and priority. The earliest due date comes first, then the highest priority. This could help you order what you should do during your day-to-day task.

The added tasks will be stored into your machine's localStorage, which means your data will be there until you manually remove it using 'Clear'. And it's not sent with every HTTP request, so it's secure and efficient option for client-side storage.

Their only downside is that the localStorage could handle only by the size of 5MB in your local machine, but this is enough to handle thousands of your saved tasks.