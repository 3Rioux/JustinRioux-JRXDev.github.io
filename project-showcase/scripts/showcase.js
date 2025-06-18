// This file contains the JavaScript code for the project showcase page. 
// It handles dynamic functionalities such as filtering projects by category, 
// displaying project details, and managing the display of skills, roles, 
// and team member counts.

const projects = [
    {
        name: "Project A",
        description: "A web application for managing tasks.",
        categories: ["Webpages", "Website features"],
        skills: ["HTML", "CSS", "JavaScript"],
        role: "Developer",
        teamMembers: 3
    },
    {
        name: "Project B",
        description: "A 2D platformer game built with JavaScript.",
        categories: ["2D Games"],
        skills: ["JavaScript", "Canvas API"],
        role: "Game Designer",
        teamMembers: 2
    },
    {
        name: "Project C",
        description: "A multiplayer online game using WebSockets.",
        categories: ["Multiplayer Games"],
        skills: ["JavaScript", "Node.js", "WebSockets"],
        role: "Full Stack Developer",
        teamMembers: 4
    },
    {
        name: "Project D",
        description: "An Arduino-based home automation system.",
        categories: ["Arduino"],
        skills: ["C++", "Arduino IDE"],
        role: "Hardware Engineer",
        teamMembers: 1
    }
];

function displayProjects() {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const categories = project.categories.join(', ');
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Categories:</strong> ${categories}</p>
            <p><strong>Skills Used:</strong> ${project.skills.join(', ')}</p>
            <p><strong>My Role:</strong> ${project.role}</p>
            <p><strong>Team Members:</strong> ${project.teamMembers}</p>
        `;

        projectContainer.appendChild(projectDiv);
    });
}

function filterProjects(category) {
    const filteredProjects = projects.filter(project => project.categories.includes(category));
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    filteredProjects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const categories = project.categories.join(', ');
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Categories:</strong> ${categories}</p>
            <p><strong>Skills Used:</strong> ${project.skills.join(', ')}</p>
            <p><strong>My Role:</strong> ${project.role}</p>
            <p><strong>Team Members:</strong> ${project.teamMembers}</p>
        `;

        projectContainer.appendChild(projectDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProjects();

    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterProjects(category);
        });
    });
});