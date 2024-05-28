#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const Persons = new Person();

const programStart = async (persons: Person) => {
    console.log(chalk.blue("\nWelcome to the Interactive Program!\n")); // Welcome message loop ke bahar rakhein
    while (true) {
        const { select } = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact with?",
            choices: ["Staff", "Student", "Exit"]
        });

        if (select === "Staff") {
            console.log(chalk.yellow("\nYou approach the staff room. Please feel free to ask any questions.\n"));
            const { question } = await inquirer.prompt({
                name: "question",
                type: "input",
                message: "What would you like to ask the staff?"
            });
            console.log(chalk.green(`\nYour question: "${question}" has been submitted to the staff. They will get back to you shortly.\n`));
        } else if (select === "Student") {
            const { studentName } = await inquirer.prompt({
                name: "studentName",
                type: "input",
                message: "Enter the student's name you wish to engage with:"
            });
            const student = persons.students.find(val => val.name === studentName);
            if (!student) {
                const newStudent = new Student(studentName);
                persons.addStudent(newStudent);
                console.log(chalk.green(`\nHello, I am ${newStudent.name}. Nice to meet you!\n`));
                console.log(chalk.green("A new student has been added.\n"));
            } else {
                console.log(chalk.green(`\nHello, I am ${student.name}. Nice to see you again!\n`));
            }
            console.log(chalk.blue("Current student list:"));
            console.log(chalk.magenta(persons.students.map(s => s.name).join(', ')) + '\n');
        } else if (select === "Exit") {
            console.log(chalk.red("\nThank you for using the Interactive Program. Goodbye!\n"));
            break;
        }
    }
}

programStart(Persons);
