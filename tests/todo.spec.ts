import {test} from '@playwright/test';
import {TodoPage} from "../page-objects/pages/todo-page";

test.describe("Todo App test", async () => {

    test('TL-19 common check', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.open()
        await todoPage.createTask("Task 1")
        await todoPage.createTask("Task 2")
        await todoPage.createTask("Task 3")
        await todoPage.checkTaskCount(3);
        await todoPage.tasks.removeTask("Task 1");
        await todoPage.tasks.completeTask("Task 2");
        await todoPage.tasks.checkTaskCompleted("Task 2");
    });

    test.only('TL-19-5 check filters ALL, ACTIVE, COMPLETED', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.open()
        await todoPage.createTask("Task 1")
        await todoPage.createTask("Task 2")
        await todoPage.createTask("Task 3")
        await todoPage.tasks.completeTask("Task 2");
        await todoPage.tasks.checkTaskCompleted("Task 2");
        await todoPage.clickActiveButton();
        await todoPage.checkTaskCount(2);
        await todoPage.clickAllButton();
        await todoPage.checkTaskCount(3);
        await todoPage.clickCompletedButton();
        await todoPage.checkTaskCount(1);
    });

    test.only('TL-19-6 check filters ALL, ACTIVE, COMPLETED', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.open()
        await todoPage.createTask("Task 1")
        await todoPage.createTask("Task 2")
        await todoPage.createTask("Task 3")
        await todoPage.tasks.completeTask("Task 2");
        await todoPage.clickClearCompletedButton();
        await todoPage.checkTaskCount(2);
        await todoPage.clickCompletedButton();
        await todoPage.checkTaskCount(0);
    });

})




