import {expect, Locator, Page} from "@playwright/test";
import {Task} from "../organisms/Task";

export class TodoPage {
    readonly newTaskInputField: Locator;
    readonly footer: Locator;
    readonly todoList: Locator;
    readonly tasks: Task;
    private readonly url = "https://todo-app.tallinn-learning.ee"
    private page: Page;
    readonly allButton: Locator
    readonly activeButton: Locator
    readonly completedButton: Locator
    readonly clearCompletedButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.newTaskInputField = page.getByTestId("text-input")
        this.footer = page.getByTestId("footer")
        this.todoList = page.getByTestId("todo-list")
        this.tasks = new Task(this.todoList)
        this.allButton = this.footer.locator("li", {hasText: "All"});
        this.activeButton = this.footer.locator("li", {hasText: "Active"});
        this.completedButton = this.footer.locator("li", {hasText: "Completed"});
        this.clearCompletedButton = this.footer.locator("button", {hasText: "Clear completed"});
    }

    async open(): Promise<void> {
        await this.page.goto(this.url)
    }

    async createTask(text: string): Promise<void> {
        await this.newTaskInputField.fill(text);
        await this.newTaskInputField.press("Enter")
    }

    async checkTaskCount(expected_count: number): Promise<void> {
        const count = await this.tasks.taskLocator.count();
        expect(count).toBe(expected_count)
    }
    async clickAllButton(): Promise<void> {
        await this.allButton.click()
    }
    async clickActiveButton(): Promise<void> {
        await this.activeButton.click()
    }
    async clickCompletedButton(): Promise<void> {
        await this.completedButton.click()
    }
    async clickClearCompletedButton(): Promise<void> {
        await this.clearCompletedButton.click()
    }
}